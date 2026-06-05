const DEFAULT_CONTENT = {
  heroTitle: 'Church of St. John Marie Vianney',
  heroLocation: 'Tampin, Negeri Sembilan',
  heroButtonText: 'View Mass Times',
  aboutTitle: 'Welcome to Our Parish',
  aboutSubtitle: 'A spiritual home for the Catholic community of Tampin',
  aboutParagraph1: 'The Church of St. John Marie Vianney in Tampin has been a beacon of faith and hope for the Catholic community in this historic town.',
  aboutParagraph2: 'Our parish welcomes all who seek spiritual nourishment, community, and the love of Christ.',
  aboutQuote: '"The priesthood is the love of the heart of Jesus."',
  aboutQuoteAttribution: '- St. John Marie Vianney',
  aboutParagraph3: 'Join us in our journey of faith as we worship together, support one another, and strive to live out the Gospel in our daily lives.',
  priestEyebrow: 'Message from our Parish Priest',
  priestParagraph1: 'Dear brothers and sisters in Christ, welcome to the Church of St. John Marie Vianney, Tampin.\nIt is my joy and privilege to serve as your parish priest, and I invite each one of you to make this house of God your spiritual home.',
  priestParagraph2: 'Our patron, St. John Vianney, taught us that the priesthood is the love of the heart of Jesus.\nIn this parish, we strive to live that love through prayer, worship, and service to one another.\nWhether you are a lifelong Catholic or someone seeking to know Christ more deeply, you are welcome here.',
  priestParagraph3: 'May the peace of Christ dwell in your hearts, and may our Blessed Mother Mary guide your steps.\nI look forward to meeting you at Mass and walking together in faith.',
  priestName: 'Rev. Fr. Albet Arockiasamy',
  priestTitle: 'Parish Priest',
  massTitle: 'Holy Mass Schedule',
  massSubtitle: 'Join us in celebration of the Eucharist',
  massSundayTime: '8:00 AM',
  massSundayLanguage: 'English',
  massSundayNote: 'Main Sunday Mass',
  massMondayTime: '6:30 PM',
  massMondayLanguage: 'English',
  massMondayNote: 'Weekday Mass',
  massTuesdayTime: '6:30 PM',
  massTuesdayLanguage: 'English',
  massTuesdayNote: 'Weekday Mass',
  massWednesdayTime: '6:30 PM',
  massWednesdayLanguage: 'English',
  massWednesdayNote: 'Weekday Mass',
  massThursdayTime: '6:30 PM',
  massThursdayLanguage: 'English',
  massThursdayNote: 'Weekday Mass',
  massFridayTime: '6:30 PM',
  massFridayLanguage: 'English',
  massFridayNote: 'Weekday Mass',
  massSaturdayTime: '6:00 PM',
  massSaturdayLanguage: 'English',
  massSaturdayNote: 'Anticipated Sunday Mass',
  visitTitle: 'Visit Us',
  visitSubtitle: 'We look forward to welcoming you',
  contactTitle: 'Contact',
  contactPhone: '+60 6-441 1234',
  contactTiming: 'Mon - Fri, 9:00 AM - 4:00 PM',
  contactEmail: 'stjohnvianney.tampin@gmail.com',
  contactText: 'Jalan Besar, Tampin, 73000\nPhone: +60 6-441 1234\nEmail: stjohnvianney.tampin@gmail.com\nMon - Fri, 9:00 AM - 4:00 PM',
  outstationTitle: 'Outstation Chapels & Centre',
  outstationSubtitle: 'Serving the wider parish family beyond Tampin',
  outstationGemasName: 'Chapel of St Christopher',
  outstationGemasDistrict: 'Gemas, Tampin District',
  outstationGemasImage: '/gemas.png',
  outstationGemasMapQuery: 'Chapel of St Christopher Gemas',
  outstationGemasMapUrl: 'https://www.google.com/maps/search/?api=1&query=Catholic%20Church%20Gemas',
  outstationGemasPicName: '',
  outstationGemasPicPhone: '',
  outstationKualaPilahName: 'Chapel of St Joseph',
  outstationKualaPilahDistrict: 'Kuala Pilah District',
  outstationKualaPilahImage: '/kuala-pilah.png',
  outstationKualaPilahMapQuery: 'Chapel of St Joseph Kuala Pilah',
  outstationKualaPilahMapUrl: 'https://www.google.com/maps/search/?api=1&query=Catholic%20Church%20Kuala%20Pilah',
  outstationKualaPilahPicName: '',
  outstationKualaPilahPicPhone: '',
  outstationGemenchehName: 'St Dominic Catholic Mass Centre',
  outstationGemenchehDistrict: 'Gemencheh, Tampin District',
  outstationGemenchehImage: '/gemencheh.png',
  outstationGemenchehMapQuery: 'St Dominic Catholic Mass Centre Gemencheh',
  outstationGemenchehMapUrl: 'https://www.google.com/maps/search/?api=1&query=Catholic%20Church%20Gemencheh',
  outstationGemenchehPicName: '',
  outstationGemenchehPicPhone: '',
  outstationBahauName: 'Chapel Mary Mother of God',
  outstationBahauDistrict: 'Bahau, Jempol District',
  outstationBahauImage: '/bahau.png',
  outstationBahauMapQuery: 'Chapel Mary Mother of God Bahau',
  outstationBahauMapUrl: 'https://maps.app.goo.gl/bv7C6xau25YEsM979',
  outstationBahauPicName: '',
  outstationBahauPicPhone: '',
};

export async function getLandingContent() {
  const csvUrl = process.env.LANDING_CONTENT_CSV_URL;
  if (!csvUrl) return DEFAULT_CONTENT;

  try {
    const response = await fetch(csvUrl, { cache: 'no-store' });
    if (!response.ok) return DEFAULT_CONTENT;

    const rows = parseCsv(await response.text());
    const content = { ...DEFAULT_CONTENT };

    const contentRows = isHeaderRow(rows[0]) ? rows.slice(1) : rows;

    contentRows.forEach((row) => {
      const key = row[0]?.trim();
      const value = row[1]?.trim();
      if (key && (value || key.startsWith('mass'))) content[key] = value || '';
    });

    return content;
  } catch {
    return DEFAULT_CONTENT;
  }
}

function isHeaderRow(row = []) {
  const firstCell = row[0]?.trim().toLowerCase();
  const secondCell = row[1]?.trim().toLowerCase();
  return ['key', 'field', 'name'].includes(firstCell) && ['value', 'content', 'text'].includes(secondCell);
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
