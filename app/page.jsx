import Nav from './components/Nav';
import Footer from './components/Footer';

export default function HomePage() {
  return (
    <>
      <Nav active="home" />
      <section className="home-hero" id="home">
        <div className="hero-content">
          <h1>Church of St. John Marie Vianney</h1>
          <div className="hero-divider" />
          <p className="location">Tampin, Negeri Sembilan</p>
          <a href="#mass-times" className="outline-button">View Mass Times</a>
        </div>
      </section>

      <section className="section about" id="about">
        <SectionHeader title="Welcome to Our Parish" subtitle="A spiritual home for the Catholic community of Tampin" />
        <div className="about-content">
          <p>The Church of St. John Marie Vianney in Tampin has been a beacon of faith and hope for the Catholic community in this historic town.</p>
          <p>Our parish welcomes all who seek spiritual nourishment, community, and the love of Christ.</p>
          <div className="quote">"The priesthood is the love of the heart of Jesus."<span>— St. John Marie Vianney</span></div>
          <p>Join us in our journey of faith as we worship together, support one another, and strive to live out the Gospel in our daily lives.</p>
        </div>
      </section>

      <section className="section priest-message" id="priest-message">
        <div className="priest-container">
          <div className="priest-image-wrap">
            <img src="/fr-albet.png" alt="Rev. Fr. Albet Arockiasamy" className="priest-photo" />
            <div className="priest-frame" />
          </div>
          <div className="priest-content">
            <div className="eyebrow">Message from our Parish Priest</div>
            <div className="priest-text">
              <p>
                Dear brothers and sisters in Christ, welcome to the Church of St. John Marie Vianney, Tampin.
                It is my joy and privilege to serve as your parish priest, and I invite each one of you to make this house of God your spiritual home.
              </p>
              <p>
                Our patron, St. John Vianney, taught us that the priesthood is the love of the heart of Jesus.
                In this parish, we strive to live that love through prayer, worship, and service to one another.
                Whether you are a lifelong Catholic or someone seeking to know Christ more deeply, you are welcome here.
              </p>
              <p>
                May the peace of Christ dwell in your hearts, and may our Blessed Mother Mary guide your steps.
                I look forward to meeting you at Mass and walking together in faith.
              </p>
            </div>
            <div className="priest-signature">
              <span className="priest-name">Rev. Fr. Albet Arockiasamy</span>
              <span className="priest-title">Parish Priest</span>
          </div>
        </div>
        </div>
      </section>

      <section className="section mass-times" id="mass-times">
        <SectionHeader title="Holy Mass Schedule" subtitle="Join us in celebration of the Eucharist" />
        <div className="mass-cards">
          <MassCard day="Sunday" time="8:00 AM" note="Main Sunday Mass" />
          <MassCard day="Saturday" time="6:00 PM" note="Anticipated Sunday Mass" />
          <MassCard day="Weekdays" time="6:30 PM" note="Monday - Friday" />
        </div>
      </section>

      <section className="section contact" id="contact">
        <SectionHeader title="Visit Us" subtitle="We look forward to welcoming you" />
        <div className="contact-grid">
          <ContactItem title="Contact" text={<>Jalan Besar, Tampin, 73000<br />Phone: +60 6-441 1234<br />Email: stjohnvianney.tampin@gmail.com<br />Mon - Fri, 9:00 AM - 4:00 PM</>} />
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

function MassCard({ day, time, note }) {
  return <div className="mass-card"><div className="day">{day}</div><div className="time">{time}</div><div className="language">English</div><div className="note">{note}</div></div>;
}

function ContactItem({ title, text }) {
  return <div className="contact-item"><div className="contact-icon">✦</div><h3>{title}</h3><p>{text}</p></div>;
}
