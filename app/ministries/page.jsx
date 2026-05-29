import Nav from '../components/Nav';
import Footer from '../components/Footer';
import MinistriesClient from './MinistriesClient';
import { getMinistries } from '../lib/ministriesContent';

export const metadata = {
  title: 'Ministries | Church of St. John Marie Vianney, Tampin',
  description: 'Parish ministries and apostolates at Church of St. John Marie Vianney, Tampin.',
};

export const dynamic = 'force-dynamic';

export default async function MinistriesPage() {
  const ministries = await getMinistries();

  return (
    <>
      <Nav active="ministries" />
      <section className="ministries-hero">
        <div className="hero-content">
          <div className="eyebrow">Serve With Love</div>
          <h1>Ministries</h1>
          <p>Discover the parish ministries, apostolates, and service groups that build up our church community.</p>
        </div>
      </section>
      <main className="ministries-main">
        <section className="ministries-intro">
          <span>Called To Serve</span>
          <h2>Every ministry is a way of serving Christ and His Church.</h2>
          <p>
            Find a place to offer your gifts, grow in faith, and serve the parish community through worship,
            formation, outreach, communication, and fellowship.
          </p>
        </section>
        <MinistriesClient ministries={ministries} />
        <section className="ministries-cta">
          <span>Interested in joining?</span>
          <h2>Speak to the Parish Priest or contact the parish office after Mass.</h2>
          <p>We would be glad to help you discern where your gifts can serve the community best.</p>
        </section>
      </main>
      <Footer />
    </>
  );
}
