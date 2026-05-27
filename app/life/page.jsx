import Nav from '../components/Nav';
import Footer from '../components/Footer';

const chapters = [
  ['A Child of Faith', 'John Marie Vianney was born on May 8, 1786, in Dardilly, France, into a farming family known for generosity and devotion. From childhood, he learned to love prayer, simplicity, and the presence of God in ordinary life.'],
  ['Faith During Revolution', 'During the French Revolution, public worship was restricted and many priests were persecuted. Young John witnessed courageous priests celebrating Mass in secret, which deepened his reverence for the Eucharist and the priesthood.'],
  ['A Difficult Path to Priesthood', 'John longed to become a priest, but his studies were difficult, especially Latin. With patience, perseverance, and the support of holy mentors, he continued forward despite repeated academic struggles.'],
  ['Ordained for the People of God', 'He was ordained a priest in 1815. Though considered academically weak, he possessed a profound pastoral heart and a burning desire to bring people back to God through prayer, preaching, and the sacraments.'],
  ['Sent to Ars', 'In 1818, Father Vianney was assigned to the small village of Ars. The parish was spiritually neglected, but he began with quiet fidelity, visiting families, teaching the faith, and praying intensely for his people.'],
  ['The Cure of Ars', 'Known as the Cure of Ars, he lived a life of deep poverty, penance, and charity. His sermons were simple but powerful, calling people to conversion, Sunday worship, and a sincere love for Christ.'],
  ['Apostle of Confession', 'People from across France came to Ars to confess their sins and seek guidance. Father Vianney spent many hours each day in the confessional, offering mercy, wisdom, and hope to countless souls.'],
  ['A Heart for the Poor', 'His love for God was expressed through charity. He cared for the poor, supported orphans, and founded La Providence, a home and school for girls in need of protection and formation.'],
  ['Perseverance in Trial', 'Father Vianney endured exhaustion, misunderstanding, and spiritual attacks, yet remained faithful. His strength came from the Eucharist, prayer, sacrifice, and complete trust in the mercy of God.'],
  ['A Saint for Parish Life', 'He died on August 4, 1859, and was later canonized by Pope Pius XI in 1925. Today he is honored as the patron saint of parish priests and a model of pastoral love for the whole Church.'],
];

export const metadata = {
  title: 'Life of St. John Marie Vianney | SJBV Tampin',
};

export default function LifePage() {
  return (
    <>
      <Nav active="life" />
      <section className="life-hero">
        <div className="hero-content">
          <div className="eyebrow">Patron Saint of Parish Priests</div>
          <h1>The Life of St. John Marie Vianney</h1>
          <p>A humble priest whose prayer, sacrifice, and love for souls transformed the village of Ars and inspired the Church throughout the world.</p>
        </div>
      </section>
      <main className="life-main">
        <div className="timeline">
          {chapters.map(([title, description], index) => (
            <article className="life-card" key={title}>
              <div className="image-wrap">
                <img src={`/life/${index + 1}.png`} alt={title} className="life-image" />
              </div>
              <div className="card-content">
                <div className="card-number">Chapter {String(index + 1).padStart(2, '0')}</div>
                <h2>{title}</h2>
                <p>{description}</p>
              </div>
            </article>
          ))}
        </div>
        <section className="life-closing-image" aria-label="St. John Marie Vianney and church artwork">
          <img src="/life/finale.png" alt="St. John Marie Vianney with Church of St. John Marie Vianney" />
        </section>
      </main>
      <Footer />
    </>
  );
}
