const defaultCsvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTLx5KP5qLZqS-uPiIEsUtfyQv27blXXAVuLmOBDGVKwBvtBO0-VrOG685T2cdlwuXINYjX4M9mK6aL/pub?gid=968566230&single=true&output=csv';

export async function getAnnouncements() {
  const csvUrl = process.env.ANNOUNCEMENTS_CSV_URL || defaultCsvUrl;

  try {
    const response = await fetch(csvUrl, { cache: 'no-store' });
    if (!response.ok) return [];

    const rows = parseCsv(await response.text());
    const headers = rows[0]?.map((header) => normalizeHeader(header)) || [];

    return rows
      .slice(1)
      .map((row) => toRecord(headers, row))
      .filter((announcement) => getAnnouncementText(announcement) || getImageSource(announcement))
      .map((announcement, index) => ({
        id: `${announcement.timestamp || index}-${getAnnouncementText(announcement).slice(0, 24)}`,
        timestamp: announcement.timestamp || '',
        text: getAnnouncementText(announcement),
        imageUrl: toImageUrl(getImageSource(announcement), 1600),
        order: Number(announcement.order) || 9999,
      }))
      .sort((a, b) => a.order - b.order || b.timestamp.localeCompare(a.timestamp));
  } catch {
    return [];
  }
}

function normalizeHeader(header) {
  return header.trim().toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
}

function toRecord(headers, row) {
  return headers.reduce((record, header, index) => {
    record[header] = row[index]?.trim() || '';
    return record;
  }, {});
}

function getAnnouncementText(announcement) {
  return announcement.anouncement || announcement.announcement || announcement.message || announcement.title || '';
}

function getImageSource(announcement) {
  return firstValue(announcement.image || announcement.image_url || announcement.photo || announcement.picture || '');
}

function firstValue(value = '') {
  return value.split(',').map((item) => item.trim()).filter(Boolean)[0] || '';
}

function toImageUrl(value, width) {
  if (!value) return '';
  const fileId = extractDriveFileId(value);
  if (fileId) return `https://lh3.googleusercontent.com/d/${fileId}=w${width}`;
  return value;
}

function extractDriveFileId(value) {
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
