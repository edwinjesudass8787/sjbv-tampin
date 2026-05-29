const defaultCsvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR9rwfwigwqZkOeWvSAWJ7wk5xUREysbJ7OSoWS-7ENV2zrzM78pcYi7u6hf6w8THzZCm4xVza5NPW_/pub?gid=613316319&single=true&output=csv';

export async function getGalleryItems() {
  const csvUrl = process.env.GALLERY_CSV_URL || defaultCsvUrl;

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
        fileId: extractDriveFileId(getImageSource(item)),
        title: item.title || 'Parish photo',
        caption: item.caption || '',
        groupName: item.group_name || 'Gallery',
        order: Number(item.order) || 9999,
        thumbnailUrl: toImageUrl(getImageSource(item), 1400),
        imageUrl: toImageUrl(getImageSource(item), 2400),
      }))
      .sort((a, b) => a.groupName.localeCompare(b.groupName) || a.order - b.order || a.title.localeCompare(b.title));
  } catch {
    return [];
  }
}

function normalizeHeader(header) {
  return header.trim().toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
}

function getImageSource(item) {
  return item.image || item.image_url || item.file_id || item.fileid || item.fileId || '';
}

function toImageUrl(value, width) {
  const fileId = extractDriveFileId(value);
  if (fileId) return `https://lh3.googleusercontent.com/d/${fileId}=w${width}`;
  return value;
}

function extractDriveFileId(value = '') {
  const patterns = [
    /drive\.google\.com\/file\/d\/([^/]+)/,
    /drive\.google\.com\/open\?id=([^&]+)/,
    /drive\.google\.com\/uc\?[^\s]*id=([^&]+)/,
    /^[a-zA-Z0-9_-]{20,}$/,
  ];

  for (const pattern of patterns) {
    const match = value.match(pattern);
    if (match) return match[1] || match[0];
  }

  return '';
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
