import Nav from '../components/Nav';
import Footer from '../components/Footer';

const searchUrl = 'https://www.google.com/maps/search/St+John+Marie+Vianney+Catholic+Church';

const markers = [
  { label: 'Tampin, Malaysia', lat: 2.47, lon: 102.23 },
  { label: 'Ars-sur-Formans, France', lat: 45.99, lon: 4.82 },
  { label: 'New York, USA', lat: 40.85, lon: -73.88 },
  { label: 'Chicago, USA', lat: 41.88, lon: -87.63 },
  { label: 'Sydney, Australia', lat: -33.87, lon: 151.21 },
  { label: 'Bangalore, India', lat: 12.97, lon: 77.59 },
  { label: 'Lagos, Nigeria', lat: 6.52, lon: 3.38 },
  { label: 'Manila, Philippines', lat: 14.6, lon: 120.98 },
];

const globeMarkers = markers.flatMap((marker) => {
  const left = ((marker.lon + 180) / 360) * 50;
  const top = ((90 - marker.lat) / 180) * 100;

  return [0, 50].map((offset) => ({
    ...marker,
    key: `${marker.label}-${offset}`,
    top: `${top}%`,
    left: `${left + offset}%`,
  }));
});

export const metadata = {
  title: 'One Patron, Many Altars | Church of St. John Marie Vianney',
  description: 'Explore Catholic churches around the world dedicated to St. John Marie Vianney.',
};

export default function VianneyMapPage() {
  return (
    <>
      <Nav active="vianney-map" />
      <section className="vianney-map-hero">
        <div className="vianney-map-hero-content">
          <div className="eyebrow">A Global Family Of Faith</div>
          <h1>One Patron, Many Altars</h1>
          <p>
            A living map of Catholic communities across the world that carry the name and spirit of
            St. John Marie Vianney, the humble Curé of Ars.
          </p>
        </div>
      </section>

      <main className="vianney-map-main">
        <section className="vianney-map-shell" aria-label="Map of St. John Marie Vianney Catholic churches">
          <div className="vianney-map-copy">
            <span>Explore The Devotion</span>
            <h2>From parish to parish, his witness still guides souls to Christ.</h2>
            <p>
              This globe is an inspirational, stylized view rather than a precise directory. Its
              glowing points represent the worldwide devotion to St. John Marie Vianney, with the
              full Google Maps search available for real-world exploration.
            </p>
            <a href={searchUrl} target="_blank" rel="noopener noreferrer" className="outline-button">
              Open Full Map
            </a>
          </div>

          <div className="vianney-globe-stage" aria-label="Stylized rotating globe of St. John Marie Vianney churches">
            <div className="vianney-orbit vianney-orbit-one" />
            <div className="vianney-orbit vianney-orbit-two" />
            <div className="vianney-globe">
              <div className="vianney-globe-texture">
                {globeMarkers.map((marker) => (
                  <span
                    className="vianney-marker"
                    key={marker.key}
                    style={{ top: marker.top, left: marker.left }}
                  >
                    <span>{marker.label}</span>
                  </span>
                ))}
              </div>
            </div>
            <div className="vianney-globe-caption">
              <span>Representative points of devotion</span>
              <strong>Rotating in one shared mission</strong>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
