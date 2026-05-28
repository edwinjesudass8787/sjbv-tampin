# Google Drive Gallery

The gallery page reads image rows from a published Google Sheet. A Google Apps Script can automatically keep the sheet in sync with a public Google Drive folder while preserving the caption you type for each image.

## Sheet Columns

Create a new Google Sheet with one tab named `Gallery` and these headers in row 1:

| fileId | title | caption | group_name | order | thumbnailUrl | imageUrl | updatedAt |
|---|---|---|---|---|---|---|---|

The website requires `fileId`. It displays `title` and `caption`. The `group_name` column groups photos under headings, and the `order` column controls sorting within each group.

## Apps Script

1. In the Google Sheet, go to `Extensions` > `Apps Script`.
2. Paste this script.
3. Replace `PASTE_FOLDER_ID_HERE` with your Google Drive folder ID.
4. Run `syncGalleryFromDrive` once and approve permissions.
5. Optional: add a time trigger to run it every 5 or 15 minutes.

```javascript
const FOLDER_ID = 'PASTE_FOLDER_ID_HERE';
const SHEET_NAME = 'Gallery';
const HEADERS = ['fileId', 'title', 'caption', 'group_name', 'order', 'thumbnailUrl', 'imageUrl', 'updatedAt'];

function syncGalleryFromDrive() {
  const sheet = getGallerySheet_();
  const existing = getExistingRows_(sheet);
  const files = DriveApp.getFolderById(FOLDER_ID).getFiles();
  const rows = [];
  let nextOrder = getNextOrder_(existing);

  while (files.hasNext()) {
    const file = files.next();
    if (!file.getMimeType().startsWith('image/')) continue;

    const fileId = file.getId();
    const current = existing[fileId] || {};
    const order = current.order || nextOrder++;

    rows.push({
      fileId,
      title: current.title || file.getName().replace(/\.[^.]+$/, ''),
      caption: current.caption || '',
      group_name: current.group_name || 'Gallery',
      order,
      thumbnailUrl: `https://lh3.googleusercontent.com/d/${fileId}=w1400`,
      imageUrl: `https://lh3.googleusercontent.com/d/${fileId}=w2400`,
      updatedAt: new Date().toISOString(),
    });
  }

  rows.sort((a, b) => Number(a.order) - Number(b.order) || a.title.localeCompare(b.title));
  sheet.clearContents();
  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);

  if (rows.length > 0) {
    sheet.getRange(2, 1, rows.length, HEADERS.length).setValues(
      rows.map((row) => HEADERS.map((header) => row[header]))
    );
  }

  sheet.autoResizeColumns(1, HEADERS.length);
}

function getGallerySheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);
  const firstRow = sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0];

  if (firstRow.join('') === '') {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  }

  return sheet;
}

function getExistingRows_(sheet) {
  const values = sheet.getDataRange().getValues();
  const headers = values.shift() || [];
  const fileIdIndex = headers.indexOf('fileId');
  const records = {};

  values.forEach((row) => {
    const fileId = row[fileIdIndex];
    if (!fileId) return;

    records[fileId] = headers.reduce((record, header, index) => {
      record[header] = row[index];
      return record;
    }, {});
  });

  return records;
}

function getNextOrder_(existing) {
  const orders = Object.values(existing).map((row) => Number(row.order) || 0);
  return Math.max(0, ...orders) + 1;
}
```

## Publish The Sheet

1. In Google Sheets, choose `File` > `Share` > `Publish to web`.
2. Select the `Gallery` tab.
3. Choose `Comma-separated values (.csv)`.
4. Publish and copy the CSV URL.
5. Add it to `.env.local` and Vercel:

```bash
GALLERY_CSV_URL="your-published-gallery-csv-url"
```

## Drive Folder Permissions

The Drive folder or each image must be publicly viewable. In Google Drive, set sharing to `Anyone with the link can view`.

## Caption Workflow

- Upload images into the Drive folder.
- Run the script manually or wait for the trigger.
- Type a group name in the `group_name` column, such as `Feast Day 2026` or `Church Building`.
- Type captions in the `caption` column.
- The next sync keeps those captions and group names as long as the image file remains in the folder.
- To hide/remove an image from the website, remove it from the Drive folder and run the sync.
