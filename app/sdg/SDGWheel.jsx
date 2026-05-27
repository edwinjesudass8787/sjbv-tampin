'use client';

import { useState } from 'react';

const sdgs = [
  { num: 1, title: 'No Poverty', color: '#e5243b', catholic: 'Option for the Poor', desc: 'The Church has always placed the poor at the centre of its mission, recognising that every person has inherent dignity and a right to basic needs.', icon: 'people' },
  { num: 2, title: 'Zero Hunger', color: '#dda63a', catholic: 'Right to Life & Bread for the World', desc: 'Feeding the hungry is a Gospel imperative. Catholic organisations worldwide run food banks, soup kitchens, and agricultural programmes.', icon: 'bowl' },
  { num: 3, title: 'Good Health & Well-Being', color: '#4c9f38', catholic: 'Health as a Human Right', desc: 'The Church operates thousands of hospitals, clinics, and health programmes, seeing healthcare as a fundamental expression of charity.', icon: 'heart' },
  { num: 4, title: 'Quality Education', color: '#c5192d', catholic: 'Catholic Education Tradition', desc: "The Church is one of the world's largest educators, running schools and universities that serve millions regardless of faith or income.", icon: 'book' },
  { num: 5, title: 'Gender Equality', color: '#ff3a21', catholic: 'Dignity of Women', desc: 'The Church upholds the equal dignity of men and women, rooted in the belief that all are made in the image and likeness of God.', icon: 'equal' },
  { num: 6, title: 'Clean Water & Sanitation', color: '#26bde2', catholic: 'Water as a Gift', desc: 'Access to clean water is a basic human right. Catholic Relief Services and Caritas work globally to provide safe water and sanitation.', icon: 'drop' },
  { num: 7, title: 'Affordable & Clean Energy', color: '#fcc30b', catholic: 'Stewardship of Resources', desc: 'The Church supports sustainable energy access for all, ensuring that development does not come at the cost of the poor or the planet.', icon: 'sun' },
  { num: 8, title: 'Decent Work & Economic Growth', color: '#a21942', catholic: 'Dignity of Work', desc: 'Labour has dignity because the worker has dignity. The Church champions just wages, safe conditions, and the rights of workers.', icon: 'chart' },
  { num: 9, title: 'Industry, Innovation & Infrastructure', color: '#fd6925', catholic: 'Progress at the Service of People', desc: 'Technology and infrastructure must serve the common good and protect the vulnerable, not merely advance profit.', icon: 'cubes' },
  { num: 10, title: 'Reduced Inequalities', color: '#dd1367', catholic: 'Preferential Option for the Poor', desc: 'The Church calls for societies that uplift the marginalised and ensure that economic growth reaches those left behind.', icon: 'equal' },
  { num: 11, title: 'Sustainable Cities & Communities', color: '#fd9d24', catholic: 'Solidarity in Community', desc: 'Urban development must foster community, protect the vulnerable, and preserve the human and natural environments.', icon: 'city' },
  { num: 12, title: 'Responsible Consumption & Production', color: '#bf8b2e', catholic: 'Simplicity & Sobriety', desc: 'The Church invites all to live simply, resist consumerism, and care for creation as a shared home entrusted by God.', icon: 'loop' },
  { num: 13, title: 'Climate Action', color: '#3f7e44', catholic: 'Care for Our Common Home', desc: "Pope Francis' Laudato Si' calls the entire Church to ecological conversion and urgent action on climate change.", icon: 'eye' },
  { num: 14, title: 'Life Below Water', color: '#0a97d9', catholic: 'Integrity of Creation', desc: "Oceans and marine life are part of God's creation. The Church supports conservation and sustainable use of marine resources.", icon: 'fish' },
  { num: 15, title: 'Life on Land', color: '#56c02b', catholic: 'Integral Ecology', desc: 'Protecting forests, biodiversity, and soil is essential for human life and a moral duty to future generations.', icon: 'tree' },
  { num: 16, title: 'Peace, Justice & Strong Institutions', color: '#00689d', catholic: 'Promotion of Peace', desc: 'The Church is a constant voice for peace, justice, reconciliation, and the rule of law in a world scarred by conflict.', icon: 'dove' },
  { num: 17, title: 'Partnerships for the Goals', color: '#19486a', catholic: 'Universal Solidarity', desc: 'No nation or institution can achieve the Goals alone. The Church fosters global solidarity and cooperation across borders.', icon: 'rings' },
];

export default function SDGWheel() {
  const [selected, setSelected] = useState(sdgs[0]);

  return (
    <section className="sdg-wheel-section" aria-label="Interactive Sustainable Development Goals">
      <div className="sdg-wheel" aria-live="polite">
        <div className="sdg-wheel-center">
          <span>Sustainable</span>
          <span>Development</span>
          <strong>Goals</strong>
          <small>Click a goal</small>
        </div>
        {sdgs.map((sdg, index) => {
          const angle = index * (360 / sdgs.length) - 90;
          return (
            <button
              className={`sdg-wheel-item ${selected.num === sdg.num ? 'active' : ''}`}
              key={sdg.num}
              onClick={() => setSelected(sdg)}
              style={{ '--angle': `${angle}deg`, '--counter-angle': `${-angle}deg`, '--sdg-color': sdg.color }}
              type="button"
              aria-pressed={selected.num === sdg.num}
            >
              <span className="sdg-wheel-number">{sdg.num}</span>
              <span className="sdg-wheel-icon"><GoalIcon name={sdg.icon} /></span>
              <span className="sdg-wheel-title">{sdg.title}</span>
            </button>
          );
        })}
      </div>

      <article className="sdg-detail" style={{ '--sdg-color': selected.color }}>
        <div className="sdg-detail-number">Goal {String(selected.num).padStart(2, '0')}</div>
        <h2>{selected.title}</h2>
        <span>{selected.catholic}</span>
        <p>{selected.desc}</p>
      </article>

      <div className="sdg-mobile-list">
        {sdgs.map((sdg) => (
          <button
            className={`sdg-mobile-item ${selected.num === sdg.num ? 'active' : ''}`}
            key={sdg.num}
            onClick={() => setSelected(sdg)}
            style={{ '--sdg-color': sdg.color }}
            type="button"
          >
            <span>{String(sdg.num).padStart(2, '0')}</span>
            <GoalIcon name={sdg.icon} />
            <strong>{sdg.title}</strong>
          </button>
        ))}
      </div>
    </section>
  );
}

function GoalIcon({ name }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const icons = {
    people: <><circle cx="17" cy="18" r="5" /><circle cx="31" cy="18" r="5" /><path d="M9 38c1-8 6-12 15-12s14 4 15 12" /></>,
    bowl: <><path d="M10 24h28c-1 9-7 14-14 14s-13-5-14-14z" /><path d="M16 16c0-4 3-6 8-6s8 2 8 6" /></>,
    heart: <><path d="M24 39S8 29 8 17c0-5 4-9 9-9 3 0 6 2 7 5 1-3 4-5 7-5 5 0 9 4 9 9 0 12-16 22-16 22z" /><path d="M16 24h5l3-6 4 10 3-5h5" /></>,
    book: <><path d="M10 12h12c4 0 6 2 6 6v20c0-4-2-6-6-6H10z" /><path d="M38 12H28c-4 0-6 2-6 6v20c0-4 2-6 6-6h10z" /></>,
    equal: <><path d="M14 19h20M14 29h20" /><circle cx="24" cy="24" r="17" /></>,
    drop: <><path d="M24 6c-7 10-12 16-12 24a12 12 0 0 0 24 0c0-8-5-14-12-24z" /></>,
    sun: <><circle cx="24" cy="24" r="8" /><path d="M24 5v6M24 37v6M5 24h6M37 24h6M10 10l4 4M34 34l4 4M10 38l4-4M34 14l4-4" /></>,
    chart: <><path d="M10 38h28" /><path d="M14 34l8-9 6 5 8-16" /><path d="M31 14h5v5" /></>,
    cubes: <><path d="M24 8l9 5-9 5-9-5zM15 23l9 5-9 5-9-5zM33 23l9 5-9 5-9-5z" /></>,
    city: <><path d="M8 40V18h10v22M18 40V10h12v30M30 40V22h10v18" /><path d="M12 24h2M22 16h4M34 28h2" /></>,
    loop: <><path d="M17 18c-5 0-8 3-8 6s3 6 8 6c8 0 9-12 18-12 5 0 8 3 8 6s-3 6-8 6c-8 0-9-12-18-12z" /></>,
    eye: <><path d="M4 24s7-12 20-12 20 12 20 12-7 12-20 12S4 24 4 24z" /><circle cx="24" cy="24" r="5" /></>,
    fish: <><path d="M8 24c7-8 17-10 28-5l6-5v20l-6-5c-11 5-21 3-28-5z" /><circle cx="31" cy="22" r="1" /></>,
    tree: <><path d="M24 40V20" /><path d="M24 20c7-9 15-10 15-10s-1 10-15 10zM24 25C15 16 8 17 8 17s2 10 16 8z" /></>,
    dove: <><path d="M11 25c10 2 18-5 23-14 0 8-2 14-9 19" /><path d="M25 30c-6 6-14 7-20 2 7-1 10-4 12-9" /><path d="M34 11l7-3-3 7" /></>,
    rings: <><circle cx="18" cy="24" r="9" /><circle cx="30" cy="24" r="9" /><path d="M23 24h2" /></>,
  };

  return <svg viewBox="0 0 48 48" aria-hidden="true" {...common}>{icons[name]}</svg>;
}
