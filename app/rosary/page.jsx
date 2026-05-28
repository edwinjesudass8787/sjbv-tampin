import Nav from '../components/Nav';
import Footer from '../components/Footer';
import RosaryClient from './RosaryClient';

export const metadata = {
  title: 'Digital Rosary | SJBV Tampin',
};

export default function RosaryPage() {
  return (
    <>
      <Nav active="rosary" />
      <section className="rosary-hero">
        <div className="hero-content">
          <div className="eyebrow">Pray With Us</div>
          <h1>Digital Rosary</h1>
          <p>A guided rosary for personal prayer, reflection, and devotion wherever you are.</p>
        </div>
      </section>
      <main className="rosary-main rosary-main-companion">
        <RosaryClient />
      </main>
      <Footer />
    </>
  );
}
