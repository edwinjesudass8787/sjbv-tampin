import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { getDailyPrayer } from '../lib/dailyPrayerContent';

export const metadata = {
  title: 'Daily Prayer | Church of St. John Marie Vianney, Tampin',
  description: 'Daily Prayer from Catholic Online.',
};

export const dynamic = 'force-dynamic';

export default async function DailyPrayerPage({ searchParams }) {
  const params = await searchParams;
  const prayer = await getDailyPrayer(params?.date);

  return (
    <>
      <Nav active="daily-prayer" />
      <section className="daily-prayer-hero">
        <div className="hero-content">
          <div className="eyebrow">Prayer for Today</div>
          <h1>Daily Prayer</h1>
          <p>A simple prayer to begin or end the day with God.</p>
        </div>
      </section>
      <main className="daily-prayer-main">
        <section className="daily-prayer-shell">
          <form className="daily-prayer-picker" action="/daily-prayer">
            <label htmlFor="daily-prayer-date">Choose a date</label>
            <input id="daily-prayer-date" name="date" type="date" defaultValue={prayer.date} />
            <button type="submit" className="outline-button">Load Prayer</button>
          </form>
          <article className="daily-prayer-card">
            <span>{formatDisplayDate(prayer.date)}</span>
            <h2>{prayer.title}</h2>
            <div className="daily-prayer-text" dangerouslySetInnerHTML={{ __html: prayer.html }} />
            <a className="daily-prayer-source" href={prayer.source} target="_blank" rel="noopener noreferrer">
              Open Source
            </a>
          </article>
        </section>
      </main>
      <Footer />
    </>
  );
}

function formatDisplayDate(value) {
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString('en-MY', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
