const SOURCE_BASE = 'https://www.catholic.org/prayers/prayeroftheday/';

export async function getDailyPrayer(date) {
  const selectedDate = normalizeDate(date) || getTodayIsoDate();
  const source = `${SOURCE_BASE}?select_date=${selectedDate}`;

  try {
    const response = await fetch(source, {
      headers: { 'user-agent': 'SJBV-Tampin/1.0' },
      next: { revalidate: 3600 },
    });

    if (!response.ok) return fallbackPrayer(selectedDate, source);

    const html = await response.text();
    const block = extractById(html, 'prayersPofd');
    const title = decodeHtml(stripTags(block.match(/<h3[^>]*>([\s\S]*?)<\/h3>/i)?.[1] || 'Prayer of the Day'));
    const body = block.match(/<h3[^>]*>[\s\S]*?<\/h3>\s*<p[^>]*>([\s\S]*?)<\/p>/i)?.[1] || '';

    return {
      title,
      date: selectedDate,
      source,
      html: sanitizePrayer(body),
    };
  } catch {
    return fallbackPrayer(selectedDate, source);
  }
}

function fallbackPrayer(date, source) {
  return {
    title: 'Prayer of the Day',
    date,
    source,
    html: '<p>The daily prayer could not be loaded right now. Please open the source link below.</p>',
  };
}

function extractById(html, id) {
  const start = html.indexOf(`<div id="${id}"`);
  if (start === -1) return '';

  const end = html.indexOf('<div class="clearfix spacer"', start);
  if (end === -1) return html.slice(start);

  return html.slice(start, end);
}

function sanitizePrayer(value) {
  return value
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<a\b[^>]*>([\s\S]*?)<\/a>/gi, '$1')
    .replace(/<(?!\/?(?:p|br)\b)[^>]+>/gi, '')
    .replace(/<br\s*\/?\s*>/gi, '<br />')
    .trim();
}

function stripTags(value) {
  return value.replace(/<[^>]+>/g, '').trim();
}

function decodeHtml(value) {
  return value
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([\da-f]+);/gi, (_, code) => String.fromCharCode(parseInt(code, 16)))
    .replaceAll('&nbsp;', ' ')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#039;', "'");
}

function normalizeDate(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value || '') ? value : '';
}

function getTodayIsoDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
