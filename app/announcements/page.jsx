import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { getAnnouncements } from '../lib/announcementContent';

export const metadata = {
  title: 'Announcements | Church of St. John Marie Vianney, Tampin',
  description: 'Latest parish announcements from Church of St. John Marie Vianney, Tampin.',
};

export const dynamic = 'force-dynamic';

export default async function AnnouncementsPage() {
  const announcements = await getAnnouncements();

  return (
    <>
      <Nav active="announcements" />
      <section className="announcements-hero">
        <div className="hero-content">
          <div className="eyebrow">Parish Notice Board</div>
          <h1>Announcements</h1>
          <p>Stay close to the life of our parish through the latest notices, updates, and invitations.</p>
        </div>
      </section>

      <main className="announcements-main">
        {announcements.length > 0 ? (
          <section className="announcements-grid" aria-label="Parish announcements">
            {announcements.map((announcement) => (
              <article className="announcement-card" key={announcement.id}>
                {announcement.imageUrl ? (
                  <img src={announcement.imageUrl} alt="Parish announcement" />
                ) : null}
                <div className="announcement-card-body">
                  {announcement.timestamp ? <time>{announcement.timestamp}</time> : null}
                  <p>{announcement.text}</p>
                </div>
              </article>
            ))}
          </section>
        ) : (
          <div className="announcements-empty">
            <h2>No Announcements Yet</h2>
            <p>Add rows to the announcements Google Sheet to display them here.</p>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
