export const dynamic = 'force-dynamic';

const FEED_URL = 'https://www.vaticannews.va/en.rss.xml';

export async function GET() {
  const response = await fetch(FEED_URL, { next: { revalidate: 1800 } });

  if (!response.ok) {
    return Response.json({ error: 'Unable to fetch Catholic news.' }, { status: 502 });
  }

  const rss = await response.text();
  const items = [...rss.matchAll(/<item>[\s\S]*?<\/item>/g)].slice(0, 12).map(([item]) => ({
    title: decodeXml(stripCdata(extract(item, 'title'))),
    link: decodeXml(stripCdata(extract(item, 'link'))),
    pubDate: formatDate(decodeXml(stripCdata(extract(item, 'pubDate')))),
    description: excerpt(stripHtml(decodeXml(stripCdata(extract(item, 'description'))))),
    image: extractImage(item),
  }));

  return Response.json({
    source: 'Vatican News - English',
    sourceUrl: 'https://www.vaticannews.va/en.html',
    items,
  });
}

function extract(xml, tag) {
  return xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`))?.[1]?.trim() || '';
}

function extractImage(item) {
  return item.match(/<media:content[^>]*url="([^"]+)"/i)?.[1] || '';
}

function stripCdata(value) {
  return value.replace(/^<!\[CDATA\[/, '').replace(/\]\]>$/, '').trim();
}

function stripHtml(value) {
  return value
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function decodeXml(value) {
  return value
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#039;', "'")
    .replaceAll('&nbsp;', ' ');
}

function excerpt(value) {
  if (value.length <= 220) return value;
  return `${value.slice(0, 217).trim()}...`;
}

function formatDate(value) {
  if (!value) return 'Latest Catholic news';
  return new Date(value).toLocaleDateString('en-MY', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
