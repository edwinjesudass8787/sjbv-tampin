export const dynamic = 'force-dynamic';

const SOURCE_BASE = 'https://www.catholicgallery.org/mass-reading';
const LANGUAGES = {
  en: { label: 'English', code: 'en' },
  ms: { label: 'Bahasa Malaysia', code: 'ms' },
  zh: { label: 'Mandarin', code: 'zh-CN', direct: 'chinese' },
  ta: { label: 'Tamil', code: 'ta', direct: 'tamil' },
};

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const requestedLang = searchParams.get('lang') || 'en';
  const language = LANGUAGES[requestedLang] || LANGUAGES.en;
  const selectedDate = parseLocalDate(searchParams.get('date')) || new Date();
  selectedDate.setHours(12, 0, 0, 0);

  const date = formatIsoDate(selectedDate);
  const link = getSourceLink(language, selectedDate);
  const response = await fetch(link, {
    headers: { 'user-agent': 'SJBV-Tampin/1.0' },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    return Response.json({ error: 'Unable to fetch readings.' }, { status: 502 });
  }

  const html = language.direct === 'chinese'
    ? new TextDecoder('big5').decode(await response.arrayBuffer())
    : await response.text();
  const title = decodeHtml(stripTags(
    language.direct === 'tamil'
      ? extractByClass(html, 'dayTitle') || extractTitle(html) || 'Tamil Mass Readings'
      : language.direct === 'chinese'
        ? extractChineseTitle(html) || 'Chinese Daily Readings'
      : extractById(html, 'cgdaydesc') || extractTitle(html) || 'Daily Mass Readings'
  ));
  const sourceDescription = language.direct === 'tamil'
    ? extractTamilReadings(html)
    : language.direct === 'chinese'
      ? extractChineseReadings(html)
      : extractReadings(html);

  if (!sourceDescription) {
    return Response.json({ error: 'No readings found.' }, { status: 404 });
  }

  const description = language.code === 'en' || language.direct
    ? sourceDescription
    : await translateHtml(sourceDescription, language.code);

  return Response.json({
    title,
    link,
    pubDate: formatDisplayDate(selectedDate),
    date,
    description,
    language: language.label,
    languageNote: language.code === 'en' || language.direct ? null : `${language.label} is provided as an automatic translation from the English source.`,
    prevDate: shiftIsoDate(selectedDate, -1),
    nextDate: shiftIsoDate(selectedDate, 1),
  });
}

function getSourceLink(language, date) {
  if (language.direct === 'tamil') {
    return `https://bible.catholicgallery.org/tamil-mass-reading/tr-${formatCatholicGalleryDate(date)}/`;
  }

  if (language.direct === 'chinese') {
    return `http://catholic-dlc.org.hk/${getChineseCyclePrefix(date)}${formatChineseDate(date)}.htm`;
  }

  return `${SOURCE_BASE}/${formatCatholicGalleryDate(date)}/`;
}

function extractTamilReadings(html) {
  const start = html.indexOf('<h2 class="dayTitle');
  const end = html.indexOf('<div id="tmassrdgfoot"', start);

  if (start === -1 || end === -1) return '';

  return sanitize(html.slice(start, end))
    .replace(/<div class=['"]Bible[\s\S]*?<div class="readings"/gi, '<div class="readings"')
    .trim();
}

function extractChineseReadings(html) {
  const start = html.indexOf('<body');
  const bodyStart = start === -1 ? html.indexOf('<div class=Section1') : html.indexOf('>', start) + 1;
  const end = html.lastIndexOf('</body>');

  if (bodyStart === -1 || end === -1) return '';

  return sanitize(html.slice(bodyStart, end))
    .replace(/<!--\[if !supportEmptyParas\]>[\s\S]*?<!\[endif\]-->/gi, '&nbsp;')
    .replace(/<!\[if !supportEmptyParas\]>[\s\S]*?<!\[endif\]>/gi, '&nbsp;')
    .replace(/<\/?o:p[^>]*>/gi, '')
    .replace(/<\/?span[^>]*>/gi, '')
    .replace(/<\/?font[^>]*>/gi, '')
    .replace(/<\/?div[^>]*>/gi, '')
    .replace(/\sclass=("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    .replace(/\sstyle=("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    .replace(/\slang=("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    .replace(/\salign=("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    .replace(/<p[^>]*>\s*&nbsp;\s*<\/p>/gi, '')
    .trim();
}

function extractChineseTitle(html) {
  const bodyText = decodeHtml(stripTags(extractChineseReadings(html)))
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  return bodyText.slice(0, 2).join(' - ');
}

function extractReadings(html) {
  const start = html.indexOf('<div class="cgRdgsCard">');
  const end = html.indexOf('The readings on this page are taken', start);

  if (start === -1 || end === -1) return '';

  return sanitize(html.slice(start, end))
    .replace(/<p class="cgPa2"[\s\S]*?<\/p>/gi, '')
    .replace(/<div class=['"]Bible[\s\S]*?<h2/gi, '<h2')
    .replace(/<div class=['"]Bible[\s\S]*?fallback-ct[\s\S]*?<\/div>\s*<\/div>/gi, '')
    .trim();
}

function extractTitle(html) {
  return html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1]?.trim() || '';
}

function extractById(html, id) {
  const match = html.match(new RegExp(`<[^>]+id=["']${id}["'][^>]*>([\\s\\S]*?)<\\/[^>]+>`));
  return match?.[1]?.trim() || '';
}

function extractByClass(html, className) {
  const match = html.match(new RegExp(`<[^>]+class=["'][^"']*${className}[^"']*["'][^>]*>([\\s\\S]*?)<\\/[^>]+>`));
  return match?.[1]?.trim() || '';
}

function stripTags(value) {
  return value.replace(/<[^>]+>/g, '');
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

function sanitize(value) {
  return value
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<iframe[\s\S]*?<\/iframe>/gi, '')
    .replace(/<hr[^>]*>/gi, '')
    .replace(/\s(on\w+)="[^"]*"/gi, '')
    .replace(/href="javascript:[^"]*"/gi, 'href="#"');
}

async function translateHtml(html, targetLanguage) {
  const tokens = html.split(/(<[^>]+>)/g);
  const translated = [...tokens];
  const textTokenIndexes = tokens
    .map((token, index) => ({ token, index }))
    .filter(({ token }) => token.trim() && !token.startsWith('<'));

  for (let i = 0; i < textTokenIndexes.length; i += 6) {
    const batch = textTokenIndexes.slice(i, i + 6);
    const results = await Promise.all(batch.map(({ token }) => translateText(decodeHtml(token), targetLanguage)));

    results.forEach((result, resultIndex) => {
      translated[batch[resultIndex].index] = result;
    });
  }

  return translated.join('');
}

async function translateText(text, targetLanguage) {
  const params = new URLSearchParams({
    client: 'gtx',
    sl: 'en',
    tl: targetLanguage,
    dt: 't',
    q: text,
  });

  const response = await fetch(`https://translate.googleapis.com/translate_a/single?${params.toString()}`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) return text;

  const payload = await response.json();
  return payload?.[0]?.map((part) => part?.[0] || '').join('') || text;
}

function parseLocalDate(value) {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day, 12, 0, 0, 0);
}

function formatDisplayDate(date) {
  return date.toLocaleDateString('en-MY', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function formatIsoDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatCatholicGalleryDate(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2);
  return `${day}${month}${year}`;
}

function formatChineseDate(date) {
  const year = String(date.getFullYear()).slice(-2);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}${month}${day}`;
}

function getChineseCyclePrefix(date) {
  const cycle = date.getFullYear() % 3;
  if (cycle === 0) return 'lk';
  if (cycle === 1) return 'mt';
  return 'mk';
}

function shiftIsoDate(date, amount) {
  const next = new Date(date);
  next.setDate(next.getDate() + amount);
  return formatIsoDate(next);
}
