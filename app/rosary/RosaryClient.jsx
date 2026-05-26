'use client';

import { useMemo, useState } from 'react';

const mysteries = {
  joyful: {
    label: 'Joyful Mysteries',
    days: 'Monday and Saturday',
    items: ['The Annunciation', 'The Visitation', 'The Nativity', 'The Presentation', 'The Finding of Jesus in the Temple'],
  },
  luminous: {
    label: 'Luminous Mysteries',
    days: 'Thursday',
    items: ['The Baptism of Jesus', 'The Wedding at Cana', 'The Proclamation of the Kingdom', 'The Transfiguration', 'The Institution of the Eucharist'],
  },
  sorrowful: {
    label: 'Sorrowful Mysteries',
    days: 'Tuesday and Friday',
    items: ['The Agony in the Garden', 'The Scourging at the Pillar', 'The Crowning with Thorns', 'The Carrying of the Cross', 'The Crucifixion'],
  },
  glorious: {
    label: 'Glorious Mysteries',
    days: 'Wednesday and Sunday',
    items: ['The Resurrection', 'The Ascension', 'The Descent of the Holy Spirit', 'The Assumption of Mary', 'The Coronation of Mary'],
  },
};

const prayers = {
  cross: {
    title: 'The Sign of the Cross',
    text: 'In the name of the Father, and of the Son, and of the Holy Spirit. Amen.',
  },
  creed: {
    title: 'The Apostles Creed',
    text: 'I believe in God, the Father almighty, Creator of heaven and earth, and in Jesus Christ, his only Son, our Lord...',
  },
  ourFather: {
    title: 'Our Father',
    text: 'Our Father, who art in heaven, hallowed be thy name; thy kingdom come; thy will be done on earth as it is in heaven...',
  },
  hailMary: {
    title: 'Hail Mary',
    text: 'Hail Mary, full of grace, the Lord is with thee. Blessed art thou among women, and blessed is the fruit of thy womb, Jesus...',
  },
  gloryBe: {
    title: 'Glory Be',
    text: 'Glory be to the Father, and to the Son, and to the Holy Spirit, as it was in the beginning, is now, and ever shall be...',
  },
  fatima: {
    title: 'Fatima Prayer',
    text: 'O my Jesus, forgive us our sins, save us from the fires of hell, lead all souls to Heaven, especially those in most need of Thy mercy.',
  },
  hailHolyQueen: {
    title: 'Hail Holy Queen',
    text: 'Hail, holy Queen, Mother of mercy, our life, our sweetness and our hope. To thee do we cry, poor banished children of Eve...',
  },
};

function buildBeads(mysteryKey) {
  const selected = mysteries[mysteryKey];
  const beads = [
    { type: 'cross', label: 'Cross', prayer: prayers.cross, section: 'Opening' },
    { type: 'large', label: 'Creed', prayer: prayers.creed, section: 'Opening' },
    { type: 'large', label: 'Our Father', prayer: prayers.ourFather, section: 'Opening' },
    { type: 'small', label: 'Faith', prayer: prayers.hailMary, section: 'Opening' },
    { type: 'small', label: 'Hope', prayer: prayers.hailMary, section: 'Opening' },
    { type: 'small', label: 'Charity', prayer: prayers.hailMary, section: 'Opening' },
    { type: 'large', label: 'Glory Be', prayer: prayers.gloryBe, section: 'Opening' },
  ];

  selected.items.forEach((mystery, mysteryIndex) => {
    beads.push({ type: 'large', label: `Mystery ${mysteryIndex + 1}`, prayer: prayers.ourFather, mystery, section: mystery });
    for (let hailMary = 1; hailMary <= 10; hailMary += 1) {
      beads.push({ type: 'small', label: `Hail Mary ${hailMary}`, prayer: prayers.hailMary, mystery, section: mystery });
    }
    beads.push({ type: 'large', label: 'Glory Be', prayer: prayers.gloryBe, mystery, section: mystery });
    beads.push({ type: 'large', label: 'Fatima Prayer', prayer: prayers.fatima, mystery, section: mystery });
  });

  beads.push({ type: 'large', label: 'Closing', prayer: prayers.hailHolyQueen, section: 'Closing' });
  return beads;
}

export default function RosaryClient() {
  const [mysteryKey, setMysteryKey] = useState('joyful');
  const [current, setCurrent] = useState(0);
  const beads = useMemo(() => buildBeads(mysteryKey), [mysteryKey]);
  const selectedMystery = mysteries[mysteryKey];
  const currentBead = beads[current];
  const progress = Math.round(((current + 1) / beads.length) * 100);

  const getBeadStyle = (index) => {
    const angle = (index / beads.length) * Math.PI * 2 - Math.PI / 2;
    const radius = 41;

    return {
      left: `${50 + Math.cos(angle) * radius}%`,
      top: `${50 + Math.sin(angle) * radius}%`,
    };
  };

  const chooseMystery = (key) => {
    setMysteryKey(key);
    setCurrent(0);
  };

  return (
    <div className="rosary-shell">
      <div className="mystery-tabs" aria-label="Choose rosary mysteries">
        {Object.entries(mysteries).map(([key, mystery]) => (
          <button key={key} type="button" className={key === mysteryKey ? 'active' : ''} onClick={() => chooseMystery(key)}>
            <span>{mystery.label}</span>
            <small>{mystery.days}</small>
          </button>
        ))}
      </div>

      <div className="rosary-grid">
        <section className="rosary-visual" aria-label="Digital rosary beads">
          <div className="rosary-loop">
            {beads.map((bead, index) => (
              <button
                key={`${bead.label}-${index}`}
                type="button"
                className={`bead ${bead.type} ${index === current ? 'current' : ''} ${index < current ? 'complete' : ''}`}
                style={getBeadStyle(index)}
                onClick={() => setCurrent(index)}
                aria-label={`${bead.section}: ${bead.label}`}
              />
            ))}
          </div>
          <div className="progress-card">
            <span>{progress}% complete</span>
            <div className="progress-bar"><div style={{ width: `${progress}%` }} /></div>
          </div>
        </section>

        <section className="prayer-panel">
          <div className="eyebrow">{selectedMystery.label}</div>
          <h2>{currentBead.prayer.title}</h2>
          {currentBead.mystery && <h3>{currentBead.mystery}</h3>}
          <p className="bead-label">{currentBead.label}</p>
          <p className="prayer-text">{currentBead.prayer.text}</p>
          <div className="rosary-controls">
            <button type="button" onClick={() => setCurrent(Math.max(0, current - 1))} disabled={current === 0}>Previous</button>
            <button type="button" onClick={() => setCurrent(Math.min(beads.length - 1, current + 1))} disabled={current === beads.length - 1}>Next Prayer</button>
            <button type="button" onClick={() => setCurrent(0)}>Reset</button>
          </div>
        </section>
      </div>
    </div>
  );
}
