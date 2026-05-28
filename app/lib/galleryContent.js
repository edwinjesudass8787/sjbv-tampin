export async function getGalleryItems() {
  const csvUrl = process.env.GALLERY_CSV_URL;
  if (!csvUrl) return [];

  try {
    const response = await fetch(csvUrl, { cache: 'no-store' });
    if (!response.ok) return [];

    const rows = parseCsv(await response.text());
    const headers = rows[0]?.map((header) => header.trim()) || [];

    return rows
      .slice(1)
      .map((row) => toRecord(headers, row))
      .filter((item) => item.fileId)
      .map((item) => ({
        fileId: item.fileId,
        title: item.title || 'Parish photo',
        caption: item.caption || '',
        order: Number(item.order) || 9999,
        thumbnailUrl: item.thumbnailUrl || `https://drive.google.com/thumbnail?id=${item.fileId}&sz=w1400`,
        imageUrl: item.imageUrl || `https://drive.google.com/uc?export=view&id=${item.fileId}`,
      }))
      .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
  } catch {
    return [];
  }
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
