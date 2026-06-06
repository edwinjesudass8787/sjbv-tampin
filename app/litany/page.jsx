import Nav from '../components/Nav';
import Footer from '../components/Footer';

export const metadata = {
  title: 'The Litany of St. John Vianney | Church of St. John Marie Vianney, Tampin',
  description: 'The Litany of St. John Vianney, the Cure of Ars.',
};

const litanyLines = [
  'Lord, have mercy on us,',
  'Lord, have mercy on us.',
  'Christ, have mercy on us,',
  'Christ, have mercy on us.',
  'Lord, have mercy on us,',
  'Lord, have mercy on us.',
  'Christ, hear us,',
  'Christ, graciously hear us.',
  'God the Father of Heaven,',
  'Have mercy on us.',
  'God the Son, Redeemer of the world,',
  'Have mercy on us.',
  'God, the Holy Spirit,',
  'Have mercy on us.',
  'Holy Trinity, One God,',
  'Have mercy on us.',
  '',
  'Holy Mary, Mother of God,',
  'Pray for us.',
  'Saint John-Mary Vianney,',
  'Pray for us.',
  'St. John Vianney, endowed with grace from thine infancy, etc.',
  'St. John Vianney, model of filial piety,',
  'St. John Vianney, devoted servant of the Immaculate Heart of Mary,',
  'St. John Vianney, spotless lily of purity,',
  'St. John Vianney, faithful imitator of the sufferings of Christ,',
  'St. John Vianney, abyss of humility,',
  'St. John Vianney, seraph of prayer,',
  'St. John Vianney, faithful adorer of the Most Blessed Sacrament,',
  'St. John Vianney, ardent lover of holy poverty,',
  'St. John Vianney, true son of St. Francis of Assisi,',
  'St. John Vianney, exemplary Franciscan tertiary,',
  'St. John Vianney, tender friend of the poor,',
  "St. John Vianney, penetrated with the fear of God's judgment,",
  'St. John Vianney, fortified by divine visions,',
  'St. John Vianney, who was tormented by the evil spirit,',
  'St. John Vianney, perfect model of sacerdotal virtue,',
  'St. John Vianney, firm and prudent pastor,',
  'St. John Vianney, inflamed with zeal,',
  'St. John Vianney, faithful attendant on the sick,',
  'St. John Vianney, indefatigable catechist,',
  'St. John Vianney, who didst preach in words of fire,',
  'St. John Vianney, wise director of souls,',
  'St. John Vianney, specially gifted with the spirit of counsel,',
  'St. John Vianney, enlightened by light from Heaven,',
  'St. John Vianney, formidable to Satan,',
  'St. John Vianney, compassionate with every misery,',
  'St. John Vianney, providence of the orphans,',
  'St. John Vianney, favored with the gift of miracles,',
  'St. John Vianney, who didst reconcile so many sinners to God,',
  'St. John Vianney, who didst confirm so many of the just in the way of virtue,',
  'St. John Vianney, who didst taste the sweetness of death,',
  'St. John Vianney, who dost now rejoice in the glory of Heaven,',
  'St. John Vianney, who givest joy to those who invoke thee,',
  'St. John Vianney, heavenly patron of parish priests,',
  'St. John Vianney, model and patron of directors of souls,',
  '',
  'Lamb of God, Who takest away the sins of the world,',
  'Spare us, O Lord.',
  'Lamb of God, Who takest away the sins of the world,',
  'Hear us, O Lord.',
  'Lamb of God, Who takes away the sins of the world,',
  'Have mercy on us.',
  '',
  'Christ, hear us.',
  'Christ, graciously hear us.',
  '',
  'V. Pray for us, blessed Jean-Marie Vianney,',
  'R. That we may be made worthy of the promises of Christ.',
  '',
  'Let Us Pray.',
  '',
  'Almighty and merciful God, Who didst bestow upon blessed',
  'John Mary Vianney wonderful pastoral zeal and a great fervor for',
  'prayer and penance, grant, we beseech Thee, that by his example and',
  'intercession we may be able to gain the souls of our brethren for',
  'Christ, and with them attain to everlasting glory, through the same',
  'Lord Jesus Christ Thy Son, Who liveth and reigneth with Thee',
  'and the Holy Ghost, one God,',
  'world without end. R. Amen.',
];

export default function LitanyPage() {
  return (
    <>
      <Nav active="litany" />
      <section className="litany-hero">
        <div className="hero-content">
          <div className="eyebrow">Prayer to Our Patron</div>
          <h1>The Litany of St. John Vianney</h1>
          <p>The Cure of Ars</p>
        </div>
      </section>
      <main className="litany-main">
        <article className="litany-card">
          <h2>The Litany of St. John Vianney, the Cure of Ars</h2>
          <div className="litany-prayer">
            {litanyLines.map((line, index) => (
              line ? <p key={`${line}-${index}`}>{line}</p> : <div className="litany-break" key={`break-${index}`} />
            ))}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
