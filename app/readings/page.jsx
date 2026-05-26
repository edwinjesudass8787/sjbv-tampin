import Nav from '../components/Nav';
import Footer from '../components/Footer';
import ReadingsClient from './ReadingsClient';

export const metadata = {
  title: 'Daily Readings | SJBV Tampin',
};

export default function ReadingsPage() {
  return (
    <>
      <Nav active="readings" />
      <section className="readings-hero">
        <div className="hero-content">
          <div className="eyebrow">Scripture for Prayer</div>
          <h1>Readings of the Day</h1>
          <p>Daily Catholic readings from the USCCB RSS feed, offered for reflection and prayer.</p>
        </div>
      </section>
      <main className="readings-main">
        <ReadingsClient />
      </main>
      <Footer />
    </>
  );
}
