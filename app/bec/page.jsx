import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { getBecs } from '../lib/becContent';

export const metadata = {
  title: 'BEC | Church of St. John Marie Vianney, Tampin',
  description: 'Basic Ecclesial Communities at Church of St. John Marie Vianney, Tampin.',
};

export const dynamic = 'force-dynamic';

export default async function BecPage() {
  const becs = await getBecs();

  return (
    <>
      <Nav active="bec" />
      <section className="bec-hero">
        <div className="hero-content">
          <div className="eyebrow">Basic Ecclesial Communities</div>
          <h1>BEC</h1>
          <p>Small parish communities where families gather, pray, share faith, and care for one another.</p>
        </div>
      </section>
      <main className="bec-main">
        <section className="bec-intro">
          <span>Faith In Neighbourhoods</span>
          <h2>Basic Ecclesial Communities bring the parish closer to every home.</h2>
          <p>
            BECs help parishioners live as a community of disciples through prayer, fellowship, Scripture sharing,
            pastoral care, and neighbourhood-level support.
          </p>
        </section>

        {becs.length > 0 ? (
          <section className="bec-grid" aria-label="Basic Ecclesial Communities">
            {becs.map((bec) => (
              <article className="bec-card" key={`${bec.name}-${bec.chairpersonName}`}>
                <div className="bec-card-top">
                  <span>BEC</span>
                  <h2>{bec.name || 'Unnamed BEC'}</h2>
                </div>
                {bec.coverageArea && (
                  <div className="bec-detail">
                    <small>Coverage Area</small>
                    <p>{bec.coverageArea}</p>
                  </div>
                )}
                {(bec.chairpersonName || bec.chairpersonPhone) && (
                  <div className="bec-contact">
                    <small>Chairperson</small>
                    {bec.chairpersonName && <strong>{bec.chairpersonName}</strong>}
                    {bec.chairpersonPhone && <a href={`tel:${toPhoneHref(bec.chairpersonPhone)}`}>{bec.chairpersonPhone}</a>}
                  </div>
                )}
              </article>
            ))}
          </section>
        ) : (
          <section className="bec-empty">
            <h2>BEC details will be available soon.</h2>
            <p>Please check again later or contact the parish office for current BEC information.</p>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}

function toPhoneHref(phone) {
  return phone.replace(/[^+\d]/g, '');
}
