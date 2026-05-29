const becCsvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT7zvgurSlXPXK_1y-CBErZodx-DnTJ06-caLtx-dHDMwuyMDMc0aLMBPk1t7Ku1Q9WroqcTWowPaRb/pub?gid=1583464412&single=true&output=csv';

const fallbackBecs = [];

export async function getBecs() {
  const csvUrl = process.env.BEC_CSV_URL || becCsvUrl;

  try {
    const response = await fetch(csvUrl, { cache: 'no-store' });
    if (!response.ok) return fallbackBecs;

    const rows = parseCsv(await response.text());
    const headers = rows[0]?.map((header) => normalizeHeader(header)) || [];
    const records = rows.slice(1).map((row) => toRecord(headers, row));

    return records
      .map((record, index) => ({
        name: record.bec_name || record.name || record.bec || '',
        coverageArea: record.coverage_area || record.area || '',
        chairpersonName: record.chairperson_name || record.chairperson || record.pic_name || '',
        chairpersonPhone: record.chairperson_phone || record.phone || record.contact_number || '',
        order: Number(record.order) || index + 1,
      }))
      .filter((bec) => bec.name || bec.coverageArea || bec.chairpersonName || bec.chairpersonPhone)
      .sort((a, b) => a.order - b.order || a.name.localeCompare(b.name))
      .map(({ order, ...bec }) => bec);
  } catch {
    return fallbackBecs;
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
