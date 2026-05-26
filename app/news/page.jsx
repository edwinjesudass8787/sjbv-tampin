import Nav from '../components/Nav';
import Footer from '../components/Footer';
import NewsClient from './NewsClient';

export const metadata = {
  title: 'Catholic News | SJBV Tampin',
};

export default function NewsPage() {
  return (
    <>
      <Nav active="news" />
      <section className="news-hero">
        <div className="hero-content">
          <div className="eyebrow">Catholic Community</div>
          <h1>News From the Church</h1>
          <p>Latest Catholic news and stories from the wider Church community.</p>
        </div>
      </section>
      <main className="news-main">
        <NewsClient />
      </main>
      <Footer />
    </>
  );
}
