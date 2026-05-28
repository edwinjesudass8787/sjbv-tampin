import Nav from '../components/Nav';
import Footer from '../components/Footer';
import ArchiveClient from './ArchiveClient';
import { getArchiveItems } from '../lib/archiveContent';

export const metadata = {
  title: 'Archive | Church of St. John Marie Vianney, Tampin',
};

export const dynamic = 'force-dynamic';

export default async function ArchivePage() {
  const items = await getArchiveItems();

  return (
    <>
      <Nav active="archive" />
      <section className="archive-hero">
        <div className="hero-content">
          <div className="eyebrow">Our History</div>
          <h1>Parish Archive</h1>
          <p>A collection of historical moments, events, and memories from our church community.</p>
        </div>
      </section>
      <main className="archive-main">
        <ArchiveClient items={items} />
      </main>
      <Footer />
    </>
  );
}
