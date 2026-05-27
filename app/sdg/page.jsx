import Nav from '../components/Nav';
import Footer from '../components/Footer';
import SDGWheel from './SDGWheel';

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
        <SDGWheel />
      </main>
      <Footer />
    </>
  );
}
