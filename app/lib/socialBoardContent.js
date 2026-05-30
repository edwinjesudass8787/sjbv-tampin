export async function getSocialBoardPosts() {
  const csvUrl = process.env.SOCIAL_BOARD_CSV_URL;
  if (!csvUrl) return [];

  try {
    const response = await fetch(csvUrl, { cache: 'no-store' });
    if (!response.ok) return [];

    const rows = parseCsv(await response.text());
    const headers = rows[0]?.map((header) => normalizeHeader(header)) || [];

    return rows
      .slice(1)
      .map((row) => toRecord(headers, row))
      .filter((post) => isPublished(post))
      .filter((post) => hasConsent(post))
      .filter((post) => isApproved(post))
      .filter((post) => getMessage(post) || getImageSource(post))
      .map((post, index) => {
        const imageSource = getImageSource(post);
        const avatarSource = firstValue(post.avatar_url || post.avatar || post.profile_image);
        const name = getName(post);

        return {
          id: `${name}-${post.submitted_at || post.timestamp || index}`,
          name,
          location: post.location || post.parish || '',
          message: getMessage(post),
          imageUrl: toImageUrl(imageSource, 1400),
          avatarUrl: toImageUrl(avatarSource, 200),
          submittedAt: post.submitted_at || post.timestamp || post.date || '',
          order: Number(post.order) || 9999,
        };
      })
      .sort((a, b) => a.order - b.order || b.submittedAt.localeCompare(a.submittedAt));
  } catch {
    return [];
  }
}

function getName(post) {
  return post.name || post.your_name || post.display_name || 'Parish Friend';
}

function getMessage(post) {
  return post.message || post.your_message || post.testimony || post.caption || '';
}

function getImageSource(post) {
  return firstValue(post.image_url || post.upload_photo || post.photo_url || post.photo || post.picture || post.image);
}

function hasConsent(post) {
  const consentKey = Object.keys(post).find((key) => key.includes('give_permission'));
  if (!consentKey) return true;

  return /yes|agree|permission|true/i.test(post[consentKey]);
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

function isApproved(post) {
  if (!post.approved && !post.status) return true;
  const value = (post.approved || post.status).toLowerCase();
  return ['yes', 'y', 'true', 'approved', 'publish', 'published'].includes(value);
}

function isPublished(post) {
  if (!Object.prototype.hasOwnProperty.call(post, 'publish')) return true;
  return ['yes', 'y', 'true'].includes(post.publish.toLowerCase());
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
