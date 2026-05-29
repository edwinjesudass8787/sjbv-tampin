import Nav from '../components/Nav';
import Footer from '../components/Footer';
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
        <section className="ministries-grid" aria-label="Parish ministries">
          {ministries.map((group) => (
            <article className="ministry-card" key={group.category}>
              <h2>{group.category}</h2>
              {group.ministries.length > 0 ? (
                <ul>
                  {group.ministries.map((ministry) => (
                    <li key={ministry}>{ministry}</li>
                  ))}
                </ul>
              ) : (
                <p>Details coming soon.</p>
              )}
            </article>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
