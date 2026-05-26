'use client';

import { useEffect, useState } from 'react';

export default function NewsClient() {
  const [feed, setFeed] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('/api/news')
      .then((response) => {
        if (!response.ok) throw new Error('Unable to load news');
        return response.json();
      })
      .then(setFeed)
      .catch(() => setError(true));
  }, []);

  if (error) {
    return (
      <div className="news-status">
        <h2>Catholic News</h2>
        <p>The news feed could not be loaded right now.</p>
        <a className="outline-button" href="https://www.vaticannews.va/en.html" target="_blank" rel="noopener noreferrer">Open Vatican News</a>
      </div>
    );
  }

  if (!feed) {
    return <div className="news-status">Loading Catholic community news...</div>;
  }

  return (
    <div className="news-shell">
      <div className="news-source">
        <span>Source</span>
        <a href={feed.sourceUrl} target="_blank" rel="noopener noreferrer">{feed.source}</a>
      </div>
      <div className="news-grid">
        {feed.items.map((item) => (
          <article className="news-card" key={item.link}>
            {item.image ? <img src={item.image} alt="" /> : <div className="news-image-placeholder">Catholic News</div>}
            <div className="news-card-body">
              <p className="news-date">{item.pubDate}</p>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <a href={item.link} target="_blank" rel="noopener noreferrer">Read Full Story</a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
