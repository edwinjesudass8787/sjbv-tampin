import Nav from '../components/Nav';
import Footer from '../components/Footer';
import SocialBoardClient from './SocialBoardClient';
import { getSocialBoardPosts } from '../lib/socialBoardContent';

export const metadata = {
  title: 'Social Board | Church of St. John Marie Vianney, Tampin',
  description: 'A community wall of photos, messages, and moments from parish visitors.',
};

export const dynamic = 'force-dynamic';

export default async function SocialBoardPage() {
  const posts = await getSocialBoardPosts();
  const formUrl = process.env.SOCIAL_BOARD_FORM_URL;

  return (
    <>
      <Nav active="social-board" />
      <section className="social-hero">
        <div className="hero-content">
          <div className="eyebrow">Parish Voices</div>
          <h1>Social Board</h1>
          <p>Share a photo, a prayer, a thanksgiving, or a joyful moment with our community.</p>
          {formUrl ? (
            <a href={formUrl} target="_blank" rel="noopener noreferrer" className="outline-button">
              Submit Your Post
            </a>
          ) : null}
        </div>
      </section>

      <main className="social-main">
        <div className="social-intro">
          <span>Community Wall</span>
          <h2>Moments of faith, gratitude, and fellowship.</h2>
          <p>
            Posts are submitted through a Google Form, reviewed in a Google Sheet, and displayed
            here after approval.
          </p>
        </div>

        {posts.length > 0 ? (
          <SocialBoardClient posts={posts} />
        ) : (
          <div className="social-empty">
            <h2>Social Board Coming Soon</h2>
            <p>Connect a published Google Sheet with visitor submissions to display posts here.</p>
            {formUrl ? (
              <a href={formUrl} target="_blank" rel="noopener noreferrer" className="outline-button">
                Be The First To Post
              </a>
            ) : null}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
