import Nav from '../components/Nav';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Gallery | Church of St. John Marie Vianney, Tampin',
};

export default function GalleryPage() {
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
        <div className="gallery-embed-shell">
          <div className="gallery-facebook">
            <iframe
              src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fpeople%2FChurch-of-St-John-Marie-VianneyTampin%2F100084148242641%2F&tabs=timeline&width=500&height=800&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true"
              width="500"
              height="800"
              style={{ border: 'none', overflow: 'hidden' }}
              scrolling="no"
              frameBorder="0"
              allowFullScreen={true}
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              title="Church of St John Marie Vianney Facebook"
            />
          </div>
          <div className="gallery-fallback">
            <p>If the Facebook feed doesn't load, you can also visit our page directly:</p>
            <a
              className="outline-button"
              href="https://www.facebook.com/people/Church-of-St-John-Marie-VianneyTampin/100084148242641/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open Facebook Page
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
