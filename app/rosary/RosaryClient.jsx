'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

const mysteries = {
  joyful: {
    label: 'Joyful',
    days: 'Mon & Sat',
    items: [
      {
        title: 'The Annunciation',
        description: 'The angel Gabriel announces that Mary will conceive by the Holy Spirit, and Mary gives her faithful yes to God.',
        fruit: 'Humility',
      },
      {
        title: 'The Visitation',
        description: 'Mary visits Elizabeth, bringing Christ hidden within her and serving her cousin with joyful love.',
        fruit: 'Love of Neighbor',
      },
      {
        title: 'The Nativity',
        description: 'Jesus is born in Bethlehem and laid in a manger, revealing the tenderness and poverty of God made man.',
        fruit: 'Poverty of Spirit',
      },
      {
        title: 'The Presentation',
        description: 'Mary and Joseph present Jesus in the Temple, offering Him to the Father in obedience to the Law.',
        fruit: 'Obedience',
      },
      {
        title: 'The Finding of Jesus in the Temple',
        description: 'After three days of searching, Mary and Joseph find Jesus in the Temple, about His Father\'s work.',
        fruit: 'Joy in Finding Jesus',
      },
    ],
  },
  luminous: {
    label: 'Luminous',
    days: 'Thursday',
    items: [
      {
        title: 'The Baptism of Jesus',
        description: 'Jesus is baptized in the Jordan, the heavens open, and the Father reveals Him as His beloved Son.',
        fruit: 'Openness to the Holy Spirit',
      },
      {
        title: 'The Wedding at Cana',
        description: 'At Mary\'s request, Jesus changes water into wine, revealing His glory and inviting trust in Him.',
        fruit: 'Trust in Mary\'s Intercession',
      },
      {
        title: 'The Proclamation of the Kingdom',
        description: 'Jesus announces the Kingdom of God, calling all people to repentance, conversion, and faith.',
        fruit: 'Conversion of Heart',
      },
      {
        title: 'The Transfiguration',
        description: 'Jesus is transfigured in glory before Peter, James, and John, strengthening them for the Cross.',
        fruit: 'Desire for Holiness',
      },
      {
        title: 'The Institution of the Eucharist',
        description: 'At the Last Supper, Jesus gives His Body and Blood as the lasting gift of His presence and sacrifice.',
        fruit: 'Love of the Eucharist',
      },
    ],
  },
  sorrowful: {
    label: 'Sorrowful',
    days: 'Tue & Fri',
    items: [
      {
        title: 'The Agony in the Garden',
        description: 'Jesus prays in Gethsemane, accepting the Father\'s will as He enters into His Passion for our salvation.',
        fruit: 'Sorrow for Sin',
      },
      {
        title: 'The Scourging at the Pillar',
        description: 'Jesus is cruelly scourged, bearing the wounds of sin with silent love and mercy.',
        fruit: 'Purity',
      },
      {
        title: 'The Crowning with Thorns',
        description: 'Jesus is mocked as king and crowned with thorns, revealing a kingship of humility and suffering love.',
        fruit: 'Moral Courage',
      },
      {
        title: 'The Carrying of the Cross',
        description: 'Jesus carries the Cross to Calvary, inviting us to follow Him with patience and trust.',
        fruit: 'Patience',
      },
      {
        title: 'The Crucifixion',
        description: 'Jesus dies on the Cross, forgiving sinners and giving His life completely for the salvation of the world.',
        fruit: 'Perseverance',
      },
    ],
  },
  glorious: {
    label: 'Glorious',
    days: 'Wed & Sun',
    items: [
      {
        title: 'The Resurrection',
        description: 'Jesus rises from the dead, conquering sin and death and opening the way to new life.',
        fruit: 'Faith',
      },
      {
        title: 'The Ascension',
        description: 'Jesus ascends to the Father, promising to remain with His Church and prepare a place for us.',
        fruit: 'Hope',
      },
      {
        title: 'The Descent of the Holy Spirit',
        description: 'The Holy Spirit descends upon Mary and the Apostles, giving courage to proclaim the Gospel.',
        fruit: 'Wisdom and Zeal',
      },
      {
        title: 'The Assumption of Mary',
        description: 'Mary is taken body and soul into heaven, a sign of the glory promised to those who belong to Christ.',
        fruit: 'Grace of a Happy Death',
      },
      {
        title: 'The Coronation of Mary',
        description: 'Mary is crowned Queen of Heaven and Earth, interceding for her children with motherly love.',
        fruit: 'Trust in Mary\'s Care',
      },
    ],
  },
};

const prayers = {
  cross: {
    title: 'The Sign of the Cross',
    text: 'In the name of the Father, and of the Son, and of the Holy Spirit. Amen.',
  },
  creed: {
    title: 'The Apostles\' Creed',
    text: 'I believe in God, the Father almighty, Creator of heaven and earth, and in Jesus Christ, his only Son, our Lord, who was conceived by the Holy Spirit, born of the Virgin Mary, suffered under Pontius Pilate, was crucified, died and was buried; he descended into hell; on the third day he rose again from the dead; he ascended into heaven, and is seated at the right hand of God the Father almighty; from there he will come to judge the living and the dead. I believe in the Holy Spirit, the holy catholic Church, the communion of saints, the forgiveness of sins, the resurrection of the body, and life everlasting. Amen.',
  },
  ourFather: {
    title: 'Our Father',
    text: 'Our Father, who art in heaven, hallowed be thy name; thy kingdom come; thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen.',
  },
  hailMary: {
    title: 'Hail Mary',
    text: 'Hail Mary, full of grace, the Lord is with thee. Blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.',
  },
  gloryBe: {
    title: 'Glory Be',
    text: 'Glory be to the Father, and to the Son, and to the Holy Spirit, as it was in the beginning, is now, and ever shall be, world without end. Amen.',
  },
  fatima: {
    title: 'Fatima Prayer',
    text: 'O my Jesus, forgive us our sins, save us from the fires of hell, lead all souls to Heaven, especially those in most need of Thy mercy.',
  },
  hailHolyQueen: {
    title: 'Hail Holy Queen',
    text: 'Hail, holy Queen, Mother of mercy, our life, our sweetness and our hope. To thee do we cry, poor banished children of Eve. To thee do we send up our sighs, mourning and weeping in this valley of tears. Turn then, most gracious advocate, thine eyes of mercy toward us, and after this our exile, show unto us the blessed fruit of thy womb, Jesus. O clement, O loving, O sweet Virgin Mary. Pray for us, O holy Mother of God, that we may be made worthy of the promises of Christ. Amen.',
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
    beads.push({ type: 'large', label: `Mystery ${mysteryIndex + 1}`, prayer: prayers.ourFather, mystery, section: mystery.title });
    for (let hailMary = 1; hailMary <= 10; hailMary += 1) {
      beads.push({ type: 'small', label: `Hail Mary ${hailMary}`, prayer: prayers.hailMary, mystery, section: mystery.title });
    }
    beads.push({ type: 'large', label: 'Glory Be', prayer: prayers.gloryBe, mystery, section: mystery.title });
    beads.push({ type: 'large', label: 'Fatima Prayer', prayer: prayers.fatima, mystery, section: mystery.title });
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

  const goNext = () => setCurrent(Math.min(beads.length - 1, current + 1));
  const goPrev = () => setCurrent(Math.max(0, current - 1));

  const beadStripRef = useRef(null);

  useEffect(() => {
    if (!beadStripRef.current) return;
    const active = beadStripRef.current.querySelector('.companion-bead.current');
    if (active) {
      active.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [current]);

  return (
    <div className="rosary-shell">
      {/* Progress bar — always visible */}
      <div className="rosary-progress-top">
        <div className="progress-bar"><div style={{ width: `${progress}%` }} /></div>
        <span>{current + 1} / {beads.length}</span>
      </div>

      {/* Mystery tabs — compact on mobile */}
      <div className="mystery-tabs" aria-label="Choose rosary mysteries">
        {Object.entries(mysteries).map(([key, mystery]) => (
          <button key={key} type="button" className={key === mysteryKey ? 'active' : ''} onClick={() => chooseMystery(key)}>
            <span>{mystery.label}</span>
            <small>{mystery.days}</small>
          </button>
        ))}
      </div>

      {/* Desktop: side-by-side grid */}
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
          <div className="prayer-panel-scroll">
            <div className="eyebrow">{selectedMystery.label} Mysteries</div>
            <h2>{currentBead.prayer.title}</h2>
            {currentBead.mystery && <h3>{currentBead.mystery.title}</h3>}
            {currentBead.mystery && (
              <div className="mystery-reflection">
                <p>{currentBead.mystery.description}</p>
                <span>Fruit of the Mystery: {currentBead.mystery.fruit}</span>
              </div>
            )}
            <p className="bead-label">{currentBead.label} — {currentBead.section}</p>
            <p className="prayer-text">{currentBead.prayer.text}</p>
          </div>
          <div className="rosary-controls">
            <button type="button" onClick={goPrev} disabled={current === 0}>Previous</button>
            <button type="button" onClick={goNext} disabled={current === beads.length - 1}>Next Prayer</button>
            <button type="button" onClick={() => setCurrent(0)}>Reset</button>
          </div>
        </section>
      </div>

      {/* Mobile companion — only visible on small screens */}
      <div className="rosary-companion">
        <div className="companion-header">
          <span className="companion-mystery">{selectedMystery.label}</span>
          {currentBead.mystery && <span className="companion-decade">{currentBead.mystery.title}</span>}
        </div>
        <h2 className="companion-title">{currentBead.prayer.title}</h2>
        <p className="companion-bead-label">{currentBead.label} — {currentBead.section}</p>
        <div className="companion-text">
          {currentBead.mystery && (
            <div className="companion-reflection">
              <p>{currentBead.mystery.description}</p>
              <span>Fruit: {currentBead.mystery.fruit}</span>
            </div>
          )}
          <p>{currentBead.prayer.text}</p>
        </div>
        <div className="companion-beads" ref={beadStripRef}>
          {beads.map((bead, index) => (
            <button
              key={`mb-${index}`}
              type="button"
              className={`companion-bead ${bead.type} ${index === current ? 'current' : ''} ${index < current ? 'complete' : ''}`}
              onClick={() => setCurrent(index)}
              aria-label={`${bead.section}: ${bead.label}`}
            />
          ))}
        </div>
        <div className="companion-controls">
          <button type="button" className="companion-prev" onClick={goPrev} disabled={current === 0} aria-label="Previous prayer">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
            Prev
          </button>
          <button type="button" className="companion-reset" onClick={() => setCurrent(0)} aria-label="Reset rosary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
            Reset
          </button>
          <button type="button" className="companion-next" onClick={goNext} disabled={current === beads.length - 1} aria-label="Next prayer">
            Next
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
