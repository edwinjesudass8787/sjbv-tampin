# Parish Archive

The archive page reads historical items from a published Google Sheet. Each row represents a historical photo, event, or document from the parish.

## Sheet Columns

Create a new Google Sheet with these headers in row 1:

| date | title | description | category | imageUrl | order |
|---|---|---|---|---|---|

Required columns:
- `imageUrl` — direct image URL (Google Drive `lh3.googleusercontent.com` URL recommended)
- `title` — display title

Optional columns:
- `date` — display date (e.g., "1950", "25 December 1960")
- `description` — longer text description
- `category` — grouping label (e.g., "Events", "Building", "Clergy")
- `order` — sort order (lower numbers appear first)

## Google Drive Images

To use Google Drive images:

1. Upload images to a public Google Drive folder
2. Get the file ID from the share URL
3. Use this format in the `imageUrl` column:

```
https://lh3.googleusercontent.com/d/FILE_ID=w1600
```

The site also auto-converts `https://drive.google.com/uc?export=view&id=FILE_ID` URLs to direct image URLs, but using `lh3.googleusercontent.com` directly is more reliable.

## Publish The Sheet

1. In Google Sheets, choose `File` > `Share` > `Publish to web`
2. Select the sheet tab with your archive data
3. Choose `Comma-separated values (.csv)`
4. Publish and copy the CSV URL
5. Add it to `.env.local` and Vercel:

```bash
ARCHIVE_CSV_URL="your-published-archive-csv-url"
```

## Example Rows

| date | title | description | category | imageUrl | order |
|---|---|---|---|---|---|
| 1935 | Church Founded | The Church of St. John Marie Vianney was established in Tampin. | History | https://lh3.googleusercontent.com/d/ABC123=w1600 | 1 |
| 1960 | First Parish Priest | Rev. Fr. John Doe served as the first parish priest. | Clergy | https://lh3.googleusercontent.com/d/DEF456=w1600 | 2 |
| 2020 | Church Renovation | Major renovation of the church building completed. | Building | https://lh3.googleusercontent.com/d/GHI789=w1600 | 3 |
