import Nav from './components/Nav';
import Footer from './components/Footer';
import { getLandingContent } from './lib/landingContent';

const massDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const outstationKeys = ['Gemas', 'KualaPilah', 'Gemencheh', 'Bahau'];
const bulletinUrl = 'https://drive.google.com/drive/folders/1HRojZr3m8KbAkJCk75-qytI2-3uoFWQF?usp=sharing';

export default async function HomePage() {
  const content = await getLandingContent();
  const masses = massDays
    .map((day) => ({
      day,
      time: content[`mass${day}Time`],
      language: content[`mass${day}Language`],
      note: content[`mass${day}Note`],
    }))
    .filter((mass) => mass.time);
  const outstations = outstationKeys
    .map((key) => ({
      name: content[`outstation${key}Name`],
      district: content[`outstation${key}District`],
      image: content[`outstation${key}Image`],
      mapQuery: content[`outstation${key}MapQuery`],
      mapUrl: content[`outstation${key}MapUrl`],
      picName: content[`outstation${key}PicName`],
      picPhone: content[`outstation${key}PicPhone`],
      links: toOutstationLinks(content[`outstation${key}Url`]),
    }))
    .filter((outstation) => outstation.name);

  return (
    <>
      <Nav active="home" />
      <section className="home-hero" id="home">
        <div className="hero-content">
          <h1>{content.heroTitle}</h1>
          <div className="hero-divider" />
          <p className="location">{content.heroLocation}</p>
          <a href="#mass-times" className="outline-button">{content.heroButtonText}</a>
        </div>
      </section>

      <section className="section about" id="about">
        <SectionHeader title={content.aboutTitle} subtitle={content.aboutSubtitle} />
        <div className="about-content">
          <ContentParagraph text={content.aboutParagraph1} />
          <ContentParagraph text={content.aboutParagraph2} />
          <div className="quote">{content.aboutQuote}<span>{content.aboutQuoteAttribution}</span></div>
          <ContentParagraph text={content.aboutParagraph3} />
        </div>
      </section>

      <section className="section priest-message" id="priest-message">
        <div className="priest-container">
          <div className="priest-image-wrap">
            <img src="/fr-albet.png" alt="Rev. Fr. Albet Arockiasamy" className="priest-photo" />
            <div className="priest-frame" />
          </div>
          <div className="priest-content">
            <div className="eyebrow">{content.priestEyebrow}</div>
            <div className="priest-text">
              <ContentParagraph text={content.priestParagraph1} />
              <ContentParagraph text={content.priestParagraph2} />
              <ContentParagraph text={content.priestParagraph3} />
            </div>
            <div className="priest-signature">
              <span className="priest-name">{content.priestName}</span>
              <span className="priest-title">{content.priestTitle}</span>
          </div>
        </div>
        </div>
      </section>

      <section className="section mass-times" id="mass-times">
        <SectionHeader title={content.massTitle} subtitle={content.massSubtitle} />
        <div className="mass-cards">
          {masses.map((mass) => (
            <MassCard key={`${mass.day}-${mass.time}`} {...mass} />
          ))}
        </div>
        <div className="bulletin-board">
          <a 
            href={bulletinUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bulletin-button"
          >
            <span className="bulletin-icon">📰</span>
            Bulletin Board
          </a>
        </div>
      </section>

      <section className="section contact" id="contact">
        <SectionHeader title={content.visitTitle} subtitle={content.visitSubtitle} />
        <div className="contact-grid">
          <ContactItem
            title={content.contactTitle}
            phone={content.contactPhone}
            timing={content.contactTiming}
            email={content.contactEmail}
            text={content.contactText}
          />
          <div className="map-card">
          <iframe
            src="https://www.google.com/maps?q=Church%20Of%20St%20John%20Marie%20Vianney%20(1935)%2C%20Tampin&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Map to Church of St. John Marie Vianney, Tampin"
          />
          <div className="map-actions">
            <a href="https://www.google.com/maps/place/Church+Of+St+John+Marie+Vianney+(1935)/data=!4m2!3m1!1s0x0:0x313df931fd6d22ea?sa=X&ved=1t:2428&ictx=111&cshid=1779770849381800" target="_blank" rel="noopener noreferrer">Open in Google Maps</a>
          </div>
        </div>
        </div>
      </section>

      <section className="section outstations" id="outstations">
        <SectionHeader title={content.outstationTitle} subtitle={content.outstationSubtitle} />
        <div className="outstation-grid">
          {outstations.map((outstation) => (
            <OutstationCard key={outstation.name} {...outstation} />
          ))}
        </div>
        <div className="outstation-actions">
          <a href={bulletinUrl} target="_blank" rel="noopener noreferrer" className="bulletin-button">
            View Bulletin
          </a>
        </div>
      </section>
      <Footer />
    </>
  );
}

function SectionHeader({ title, subtitle }) {
  return <div className="section-header"><h2>{title}</h2><div className="gold-line" /><p>{subtitle}</p></div>;
}

function MassCard({ day, time, language, note }) {
  return <div className="mass-card"><div className="day">{day}</div><div className="time">{time}</div><div className="language">{language}</div><div className="note">{note}</div></div>;
}

function ContactItem({ title, phone, timing, email, text }) {
  const hasStructuredContact = phone || timing || email;

  return (
    <div className="contact-item">
      <div className="contact-icon">✦</div>
      <h3>{title}</h3>
      {hasStructuredContact ? (
        <div className="contact-lines">
          {phone && <a href={`tel:${toPhoneHref(phone)}`}>Phone: {phone}</a>}
          {email && <a href={`mailto:${email}`}>Email: {email}</a>}
          {timing && <span>{timing}</span>}
        </div>
      ) : (
        <ContentParagraph text={text} />
      )}
    </div>
  );
}

function OutstationCard({ name, district, image, mapQuery, mapUrl, picName, picPhone, links }) {
  const query = encodeURIComponent(mapQuery || name);

  return (
    <article className="outstation-card">
      {image ? (
        <div className="outstation-image">
          <img src={image} alt={name} />
        </div>
      ) : (
        <div className="outstation-map">
          <iframe
            src={`https://www.google.com/maps?q=${query}&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`Map to ${name} outstation church`}
          />
        </div>
      )}
      <div className="outstation-body">
        <span>Outstation Church</span>
        <h3>{name}</h3>
        {district && <p className="outstation-district">{district}</p>}
        <div className="outstation-contact">
          <small>Person-in-Charge</small>
          <strong>{picName || 'To be confirmed'}</strong>
          {picPhone ? <a href={`tel:${toPhoneHref(picPhone)}`}>{picPhone}</a> : <em>Phone number to be confirmed</em>}
        </div>
        <a className="outstation-link" href={mapUrl || `https://www.google.com/maps/search/?api=1&query=${query}`} target="_blank" rel="noopener noreferrer">
          Open in Google Maps
        </a>
        {links.length > 0 && (
          <div className="outstation-custom-links">
            {links.map((link, index) => (
              <a href={link.url} key={`${link.url}-${index}`} target="_blank" rel="noopener noreferrer">
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

function toOutstationLinks(value = '') {
  return value
    .split(',')
    .map((url) => url.trim())
    .filter(Boolean)
    .map((url, index) => ({ url, label: `Link ${index + 1}` }));
}

function toPhoneHref(phone) {
  return phone.replace(/[^+\d]/g, '');
}

function ContentParagraph({ text }) {
  return <p>{text.split('\n').map((line, index) => <span key={`${line}-${index}`}>{line}<br /></span>)}</p>;
}
