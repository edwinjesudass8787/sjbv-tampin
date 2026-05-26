export const dynamic = 'force-dynamic';

const FEED_URL = 'https://bible.usccb.org/readings.rss';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const requestedDate = searchParams.get('date');

  const response = await fetch(FEED_URL, { next: { revalidate: 3600 } });

  if (!response.ok) {
    return Response.json({ error: 'Unable to fetch readings.' }, { status: 502 });
  }

  const rss = await response.text();
  const items = [...rss.matchAll(/<item>[\s\S]*?<\/item>/g)].map(([match]) => match);

  if (items.length === 0) {
    return Response.json({ error: 'No readings found.' }, { status: 404 });
  }

  let selectedItem;
  let selectedIndex = 0;

  if (requestedDate) {
    const targetDate = new Date(requestedDate);
    targetDate.setHours(0, 0, 0, 0);

    for (let i = 0; i < items.length; i++) {
      const pubDateStr = extract(items[i], 'pubDate');
      const itemDate = new Date(pubDateStr);
      itemDate.setHours(0, 0, 0, 0);

      if (itemDate.getTime() === targetDate.getTime()) {
        selectedItem = items[i];
        selectedIndex = i;
        break;
      }
    }
  }

  if (!selectedItem) {
    selectedItem = items[0];
    selectedIndex = 0;
  }

  const prevDate = items[selectedIndex + 1]
    ? formatIsoDate(extract(items[selectedIndex + 1], 'pubDate'))
    : null;
  const nextDate = items[selectedIndex - 1]
    ? formatIsoDate(extract(items[selectedIndex - 1], 'pubDate'))
    : null;

  return Response.json({
    title: extract(selectedItem, 'title'),
    link: extract(selectedItem, 'link'),
    pubDate: formatDate(extract(selectedItem, 'pubDate')),
    date: formatIsoDate(extract(selectedItem, 'pubDate')),
    description: sanitize(decodeXml(extract(selectedItem, 'description'))),
    prevDate,
    nextDate,
  });
}

function extract(xml, tag) {
  return xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`))?.[1]?.trim() || '';
}

function decodeXml(value) {
  return value
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#039;', "'");
}

function sanitize(value) {
  return value
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<iframe[\s\S]*?<\/iframe>/gi, '')
    .replace(/\s(on\w+)="[^"]*"/gi, '')
    .replace(/href="javascript:[^"]*"/gi, 'href="#"');
}

function formatDate(value) {
  if (!value) return 'Latest daily readings';
  return new Date(value).toLocaleDateString('en-MY', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function formatIsoDate(value) {
  if (!value) return '';
  const d = new Date(value);
  return d.toISOString().split('T')[0];
}
