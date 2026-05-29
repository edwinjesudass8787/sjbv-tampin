const fallbackMinistries = [
  { category: 'Catechetics', ministries: toMinistryItems(['Catechism', 'RCIA']) },
  { category: 'Language Apostolates', ministries: toMinistryItems(['Tamil Apostolate', 'Chinese Apostolate']) },
  { category: 'Liturgy', ministries: toMinistryItems(['Hospitality Ministers', 'Altar Servers', 'Altar Ladies', 'Sacristan', 'Extraordinary Minister of Holy Communion (EMHC)', 'Choirs']) },
  { category: 'Integrated Human Development (PIHD)', ministries: toMinistryItems(['Society of St Vincent de Paul (SSVP)']) },
  { category: 'Spiritual & Renewal', ministries: toMinistryItems(['Legion of Mary', 'Praise and Worship']) },
  { category: 'Youth', ministries: [] },
  { category: 'Social Communication', ministries: [] },
  { category: 'Family Life', ministries: [] },
  { category: 'Cemetery', ministries: [] },
];

export async function getMinistries() {
  const csvUrl = process.env.MINISTRIES_CSV_URL;
  if (!csvUrl) return fallbackMinistries;

  try {
    const response = await fetch(csvUrl, { cache: 'no-store' });
    if (!response.ok) return fallbackMinistries;

    const rows = parseCsv(await response.text());
    const headers = rows[0]?.map((header) => normalizeHeader(header)) || [];
    const records = rows.slice(1).map((row) => toRecord(headers, row));
    const grouped = new Map();

    records.forEach((record) => {
      const category = record.category || record.section || record.ministry_category || '';
      const ministry = record.ministry || record.name || record.ministry_name || '';
      const picName = record.pic_name || record.person_in_charge || record.contact_name || '';
      const picImageUrl = toImageUrl(record.pic_image_url || record.pic_image || record.contact_image || '');
      const order = Number(record.order) || 9999;

      if (!category) return;
      if (!grouped.has(category)) grouped.set(category, { category, ministries: [], picName: '', picImageUrl: '', order });

      const group = grouped.get(category);
      if (ministry) {
        group.ministries.push({ name: ministry, picName, picImageUrl, order });
      } else if (picName || picImageUrl) {
        group.picName = picName;
        group.picImageUrl = picImageUrl;
      }
    });

    const ministries = [...grouped.values()]
      .sort((a, b) => a.order - b.order || a.category.localeCompare(b.category))
      .map((group) => ({
        category: group.category,
        picName: group.picName,
        picImageUrl: group.picImageUrl,
        ministries: group.ministries
          .sort((a, b) => a.order - b.order || a.name.localeCompare(b.name))
          .map(({ order, ...ministry }) => ministry),
      }));

    return ministries.length > 0 ? ministries : fallbackMinistries;
  } catch {
    return fallbackMinistries;
  }
}

function toMinistryItems(names) {
  return names.map((name) => ({ name, picName: '', picImageUrl: '' }));
}

function toImageUrl(value) {
  if (!value) return '';
  const fileId = extractDriveFileId(value);
  if (fileId) return `https://lh3.googleusercontent.com/d/${fileId}=w400`;
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

function normalizeHeader(header) {
  return header.trim().toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
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
