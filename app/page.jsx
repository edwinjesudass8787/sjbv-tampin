import Nav from './components/Nav';
import Footer from './components/Footer';
import { getLandingContent } from './lib/landingContent';

export default async function HomePage() {
  const content = await getLandingContent();
  const masses = [1, 2, 3]
    .map((number) => ({
      day: content[`mass${number}Day`],
      time: content[`mass${number}Time`],
      language: content[`mass${number}Language`],
      note: content[`mass${number}Note`],
    }))
    .filter((mass) => mass.day || mass.time || mass.note);

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
      </section>

      <section className="section contact" id="contact">
        <SectionHeader title={content.visitTitle} subtitle={content.visitSubtitle} />
        <div className="contact-grid">
          <ContactItem title={content.contactTitle} text={content.contactText} />
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

function ContactItem({ title, text }) {
  return <div className="contact-item"><div className="contact-icon">✦</div><h3>{title}</h3><ContentParagraph text={text} /></div>;
}

function ContentParagraph({ text }) {
  return <p>{text.split('\n').map((line, index) => <span key={`${line}-${index}`}>{line}<br /></span>)}</p>;
}
