import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { getGalleryItems } from '../lib/galleryContent';

export const metadata = {
  title: 'Gallery | Church of St. John Marie Vianney, Tampin',
};

export const dynamic = 'force-dynamic';

export default async function GalleryPage() {
  const items = await getGalleryItems();

  return (
    <>
      <Nav active="gallery" />
      <section className="gallery-hero">
        <div className="hero-content">
          <div className="eyebrow">Parish Life</div>
          <h1>Gallery</h1>
          <p>Photos and moments from our church community.</p>
        </div>
      </section>
      <main className="gallery-main">
        {items.length > 0 ? (
          <div className="gallery-grid">
            {items.map((item) => (
              <figure className="gallery-card" key={item.fileId}>
                <a href={item.imageUrl} target="_blank" rel="noopener noreferrer" aria-label={`Open ${item.title}`}>
                  <img src={item.thumbnailUrl} alt={item.caption || item.title} loading="lazy" />
                </a>
                <figcaption>
                  <h2>{item.title}</h2>
                  {item.caption && <p>{item.caption}</p>}
                </figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <div className="gallery-empty">
            <h2>Gallery Coming Soon</h2>
            <p>Add public Google Drive images to the gallery sheet to display them here.</p>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
