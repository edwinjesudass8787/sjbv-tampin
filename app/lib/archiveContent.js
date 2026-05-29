const defaultCsvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT8u0d3eAj0ZGQD7rJgnjMvQmWNqF6FnKf902ZSLQuhs6kPQMhFXyHmJOt7LJe0g80m2CNSD-b47uJA/pub?gid=825165765&single=true&output=csv';

export async function getArchiveItems() {
  const csvUrl = process.env.ARCHIVE_CSV_URL || defaultCsvUrl;

  try {
    const response = await fetch(csvUrl, { cache: 'no-store' });
    if (!response.ok) return [];

    const rows = parseCsv(await response.text());
    const headers = rows[0]?.map((header) => normalizeHeader(header)) || [];

    return rows
      .slice(1)
      .map((row) => toRecord(headers, row))
      .filter((item) => getImageSource(item))
      .map((item) => ({
        date: item.date || item.timestamp || '',
        year: normalizeYear(item.year),
        title: item.title || 'Archive item',
        description: item.description || item.caption || '',
        category: item.category || 'General',
        imageUrl: toDirectImageUrl(getImageSource(item)),
        order: Number(item.order) || 9999,
      }))
      .sort((a, b) => a.order - b.order || a.year - b.year || a.title.localeCompare(b.title));
  } catch {
    return [];
  }
}

function normalizeYear(value) {
  const year = Number.parseInt(value, 10);
  return Number.isFinite(year) ? year : 0;
}

function normalizeHeader(header) {
  return header.trim().toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
}

function getImageSource(item) {
  return item.image || item.image_url || item.imageurl || item.photo || item.picture || '';
}

function toRecord(headers, row) {
  return headers.reduce((record, header, index) => {
    record[header] = row[index]?.trim() || '';
    return record;
  }, {});
}

function parseCsv(csv) {
  const rows = [];
  let row = [];
  let field = '';
  let quoted = false;

  for (let i = 0; i < csv.length; i += 1) {
    const char = csv[i];
    const next = csv[i + 1];

    if (char === '"' && quoted && next === '"') {
      field += '"';
      i += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === ',' && !quoted) {
      row.push(field);
      field = '';
    } else if ((char === '\n' || char === '\r') && !quoted) {
      if (char === '\r' && next === '\n') i += 1;
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
    } else {
      field += char;
    }
  }

  if (field || row.length) {
    row.push(field);
    rows.push(row);
  }

  return rows;
}

function toDirectImageUrl(url = '') {
  if (!url) return url;
  const patterns = [
    /drive\.google\.com\/file\/d\/([^/]+)/,
    /drive\.google\.com\/open\?id=([^&]+)/,
    /drive\.google\.com\/uc\?[^\s]*id=([^&]+)/,
    /^[a-zA-Z0-9_-]{20,}$/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return `https://lh3.googleusercontent.com/d/${match[1] || match[0]}=w1600`;
  }

  return url;
}
