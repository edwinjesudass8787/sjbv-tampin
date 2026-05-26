import Nav from '../components/Nav';
import Footer from '../components/Footer';

const sdgs = [
  { num: 1, title: 'No Poverty', color: '#e5243b', catholic: 'Option for the Poor', desc: 'The Church has always placed the poor at the centre of its mission, recognising that every person has inherent dignity and a right to basic needs.', icon: <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M24 8c-6 0-10 4-10 10v4h20v-4c0-6-4-10-10-10z"/><path d="M14 22v6c0 6 4 10 10 10s10-4 10-10v-6"/><path d="M20 38v4M28 38v4"/></svg> },
  { num: 2, title: 'Zero Hunger', color: '#dda63a', catholic: 'Right to Life & Bread for the World', desc: 'Feeding the hungry is a Gospel imperative. Catholic organisations worldwide run food banks, soup kitchens, and agricultural programmes.', icon: <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M24 10c-8 0-14 6-14 14v10h28v-10c0-8-6-14-14-14z"/><path d="M24 10v-4M16 34v4M32 34v4"/><path d="M10 34h28"/></svg> },
  { num: 3, title: 'Good Health & Well-Being', color: '#4c9f38', catholic: 'Health as a Human Right', desc: 'The Church operates thousands of hospitals, clinics, and health programmes, seeing healthcare as a fundamental expression of charity.', icon: <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M24 44c11 0 20-9 20-20S35 4 24 4 4 13 4 24s9 20 20 20z"/><path d="M16 24h16M24 16v16"/></svg> },
  { num: 4, title: 'Quality Education', color: '#c5192d', catholic: 'Catholic Education Tradition', desc: 'The Church is one of the world\'s largest educators, running schools and universities that serve millions regardless of faith or income.', icon: <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M24 8L4 18l20 10 20-10-20-10z"/><path d="M8 22v14l16 8 16-8V22"/><path d="M24 26v14"/></svg> },
  { num: 5, title: 'Gender Equality', color: '#ff3a21', catholic: 'Dignity of Women', desc: 'The Church upholds the equal dignity of men and women, rooted in the belief that all are made in the image and likeness of God.', icon: <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="16" cy="24" r="8"/><circle cx="32" cy="24" r="8"/><path d="M16 16v-4M32 16v-4M24 24v16M20 36h8"/></svg> },
  { num: 6, title: 'Clean Water & Sanitation', color: '#26bde2', catholic: 'Water as a Gift', desc: 'Access to clean water is a basic human right. Catholic Relief Services and Caritas work globally to provide safe water and sanitation.', icon: <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M24 4c-6 10-14 16-14 24 0 8 6 14 14 14s14-6 14-14c0-8-8-14-14-24z"/><path d="M24 34v-8"/></svg> },
  { num: 7, title: 'Affordable & Clean Energy', color: '#fcc30b', catholic: 'Stewardship of Resources', desc: 'The Church supports sustainable energy access for all, ensuring that development does not come at the cost of the poor or the planet.', icon: <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="24" cy="24" r="14"/><path d="M24 10v4M24 34v4M10 24h4M34 24h4M14 14l3 3M31 31l3 3M14 34l3-3M31 17l3-3"/></svg> },
  { num: 8, title: 'Decent Work & Economic Growth', color: '#a21942', catholic: 'Dignity of Work', desc: 'Labour has dignity because the worker has dignity. The Church champions just wages, safe conditions, and the rights of workers.', icon: <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 20h32v20H8z"/><path d="M14 20V14h20v6"/><path d="M20 28h8"/></svg> },
  { num: 9, title: 'Industry, Innovation & Infrastructure', color: '#fd6925', catholic: 'Progress at the Service of People', desc: 'Technology and infrastructure must serve the common good and protect the vulnerable, not merely advance profit.', icon: <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 40h40"/><path d="M8 40V20h8v20M20 40V12h8v28M32 40V24h8v16"/></svg> },
  { num: 10, title: 'Reduced Inequalities', color: '#dd1367', catholic: 'Preferential Option for the Poor', desc: 'The Church calls for societies that uplift the marginalised and ensure that economic growth reaches those left behind.', icon: <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 40l18-32 18 32"/><path d="M24 8v4M14 28h20M10 36h28"/></svg> },
  { num: 11, title: 'Sustainable Cities & Communities', color: '#fd9d24', catholic: 'Solidarity in Community', desc: 'Urban development must foster community, protect the vulnerable, and preserve the human and natural environments.', icon: <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 40V18l16-10 16 10v22"/><path d="M18 40V28h12v12"/></svg> },
  { num: 12, title: 'Responsible Consumption & Production', color: '#bf8b2e', catholic: 'Simplicity & Sobriety', desc: 'The Church invites all to live simply, resist consumerism, and care for creation as a shared home entrusted by God.', icon: <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 40c0-10 6-16 12-22 6 6 12 12 12 22"/><path d="M24 18v-8M20 12h8"/></svg> },
  { num: 13, title: 'Climate Action', color: '#3f7e44', catholic: 'Care for Our Common Home', desc: 'Pope Francis\' Laudato Si\' calls the entire Church to ecological conversion and urgent action on climate change.', icon: <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M24 4c-4 8-12 12-12 22 0 8 5 14 12 14s12-6 12-14c0-10-8-14-12-22z"/><path d="M20 30c2 4 6 4 8 0"/></svg> },
  { num: 14, title: 'Life Below Water', color: '#0a97d9', catholic: 'Integrity of Creation', desc: 'Oceans and marine life are part of God\'s creation. The Church supports conservation and sustainable use of marine resources.', icon: <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 24c4-6 12-10 20-8M10 24c4 6 12 10 20 8"/><path d="M14 20c8-2 16 2 20 8M14 28c8 2 16-2 20-8"/><path d="M30 14c4 2 6 6 6 10s-2 8-6 10"/></svg> },
  { num: 15, title: 'Life on Land', color: '#56c02b', catholic: 'Integral Ecology', desc: 'Protecting forests, biodiversity, and soil is essential for human life and a moral duty to future generations.', icon: <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M24 4v36M24 20c6-8 16-10 16-10M24 20c-6-8-16-10-16-10M24 28c4-6 12-8 12-8M24 28c-4-6-12-8-12-8"/></svg> },
  { num: 16, title: 'Peace, Justice & Strong Institutions', color: '#00689d', catholic: 'Promotion of Peace', desc: 'The Church is a constant voice for peace, justice, reconciliation, and the rule of law in a world scarred by conflict.', icon: <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M24 4v8M8 16l16-8 16 8v20l-16 8-16-8V16z"/><path d="M16 20l8 8 8-8"/></svg> },
  { num: 17, title: 'Partnerships for the Goals', color: '#19486a', catholic: 'Universal Solidarity', desc: 'No nation or institution can achieve the Goals alone. The Church fosters global solidarity and cooperation across borders.', icon: <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="16" cy="24" r="8"/><circle cx="32" cy="24" r="8"/><path d="M22 24h4"/></svg> },
];

export const metadata = {
  title: 'SDGs & Catholic Social Teaching | SJBV Tampin',
};

export default function SDGPage() {
  return (
    <>
      <Nav active="sdg" />
      <section className="sdg-hero">
        <div className="hero-content">
          <div className="eyebrow">Integral Human Development</div>
          <h1>Sustainable Development Goals</h1>
          <p>The Church's timeless social teaching speaks directly to the 17 UN Sustainable Development Goals.</p>
        </div>
      </section>
      <main className="sdg-main">
        <div className="sdg-intro">
          <p>
            In 2015, world leaders adopted the 2030 Agenda for Sustainable Development. The Catholic Church was present at the founding
            and remains an active partner in pursuing these goals—not as a new invention, but as a continuation of Gospel values expressed
            through Catholic Social Teaching for centuries.
          </p>
          <p>
            From the preferential option for the poor to care for creation, from the dignity of work to the pursuit of peace,
            the Church's doctrine already embodies the spirit of every SDG.
          </p>
        </div>
        <div className="sdg-grid">
          {sdgs.map((sdg) => (
            <article className="sdg-card" key={sdg.num}>
              <div className="sdg-header" style={{ background: sdg.color }}>
                <span className="sdg-num">{String(sdg.num).padStart(2, '0')}</span>
                <div className="sdg-icon">{sdg.icon}</div>
                <h3>{sdg.title}</h3>
              </div>
              <div className="sdg-body">
                <span className="sdg-catholic">{sdg.catholic}</span>
                <p>{sdg.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
