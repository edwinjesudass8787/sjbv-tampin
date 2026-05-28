# Google Sheets Landing Page Content

The landing page can be edited from a published Google Sheet. The site reads a two-column CSV with `key` and `value` columns.

## Sheet Setup

1. Create a Google Sheet.
2. Add these headers in row 1:

```csv
key,value
```

3. Add one content key per row using the template below.
4. In Google Sheets, choose `File` > `Share` > `Publish to web`.
5. Select the first sheet/tab and choose `Comma-separated values (.csv)`.
6. Click `Publish` and copy the generated CSV URL.
7. Add the URL to `.env.local` locally or to Vercel environment variables:

```bash
LANDING_CONTENT_CSV_URL="your-published-csv-url"
```

8. Restart the dev server after changing `.env.local`.

## Sheet Template

Copy these rows into your Google Sheet:

```csv
key,value
heroTitle,"Church of St. John Marie Vianney"
heroLocation,"Tampin, Negeri Sembilan"
heroButtonText,"View Mass Times"
aboutTitle,"Welcome to Our Parish"
aboutSubtitle,"A spiritual home for the Catholic community of Tampin"
aboutParagraph1,"The Church of St. John Marie Vianney in Tampin has been a beacon of faith and hope for the Catholic community in this historic town."
aboutParagraph2,"Our parish welcomes all who seek spiritual nourishment, community, and the love of Christ."
aboutQuote,"""The priesthood is the love of the heart of Jesus."""
aboutQuoteAttribution,"- St. John Marie Vianney"
aboutParagraph3,"Join us in our journey of faith as we worship together, support one another, and strive to live out the Gospel in our daily lives."
priestEyebrow,"Message from our Parish Priest"
priestParagraph1,"Dear brothers and sisters in Christ, welcome to the Church of St. John Marie Vianney, Tampin.
It is my joy and privilege to serve as your parish priest, and I invite each one of you to make this house of God your spiritual home."
priestParagraph2,"Our patron, St. John Vianney, taught us that the priesthood is the love of the heart of Jesus.
In this parish, we strive to live that love through prayer, worship, and service to one another.
Whether you are a lifelong Catholic or someone seeking to know Christ more deeply, you are welcome here."
priestParagraph3,"May the peace of Christ dwell in your hearts, and may our Blessed Mother Mary guide your steps.
I look forward to meeting you at Mass and walking together in faith."
priestName,"Rev. Fr. Albet Arockiasamy"
priestTitle,"Parish Priest"
massTitle,"Holy Mass Schedule"
massSubtitle,"Join us in celebration of the Eucharist"
mass1Day,"Sunday"
mass1Time,"8:00 AM"
mass1Language,"English"
mass1Note,"Main Sunday Mass"
mass2Day,"Saturday"
mass2Time,"6:00 PM"
mass2Language,"English"
mass2Note,"Anticipated Sunday Mass"
mass3Day,"Weekdays"
mass3Time,"6:30 PM"
mass3Language,"English"
mass3Note,"Monday - Friday"
visitTitle,"Visit Us"
visitSubtitle,"We look forward to welcoming you"
contactTitle,"Contact"
contactText,"Jalan Besar, Tampin, 73000
Phone: +60 6-441 1234
Email: stjohnvianney.tampin@gmail.com
Mon - Fri, 9:00 AM - 4:00 PM"
```

## Notes

- Updates are refreshed by the site every 5 minutes.
- If the sheet URL is missing or unavailable, the site uses the built-in fallback content.
- Leave a value blank to keep the built-in fallback for that key.
- For multi-line text, press `Option + Enter` on Mac inside a Google Sheets cell.
