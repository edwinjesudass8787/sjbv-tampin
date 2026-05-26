'use client';

import { useEffect, useState, useCallback } from 'react';

export default function ReadingsClient() {
  const [reading, setReading] = useState(null);
  const [error, setError] = useState(false);
  const [currentDate, setCurrentDate] = useState('');

  const loadReading = useCallback((date) => {
    setReading(null);
    setError(false);

    const url = date ? `/api/readings?date=${date}` : '/api/readings';

    fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error('Unable to load readings');
        return response.json();
      })
      .then((data) => {
        setReading(data);
        setCurrentDate(data.date || '');
      })
      .catch(() => setError(true));
  }, []);

  useEffect(() => {
    loadReading('');
  }, [loadReading]);

  const goToPrev = () => {
    if (reading?.prevDate) loadReading(reading.prevDate);
  };

  const goToNext = () => {
    if (reading?.nextDate) loadReading(reading.nextDate);
  };

  if (error) {
    return (
      <ReadingFrame
        title="Daily Readings"
        date="The RSS feed could not be loaded right now."
        source="https://bible.usccb.org/bible/readings"
        navButtons={null}
      >
        <div className="status">Please use the source link below to view today's readings directly from the USCCB website.</div>
      </ReadingFrame>
    );
  }

  if (!reading) {
    return (
      <ReadingFrame
        title="Loading today's readings..."
        date="Retrieving the latest item from the USCCB Daily Readings RSS feed."
        source="https://bible.usccb.org/bible/readings"
        navButtons={null}
      >
        <div className="status">Please wait while the readings are loaded.</div>
      </ReadingFrame>
    );
  }

  const navButtons = (
    <div className="day-nav">
      <button
        type="button"
        className="outline-button"
        onClick={goToPrev}
        disabled={!reading.prevDate}
      >
        ← Previous Day
      </button>
      <button
        type="button"
        className="outline-button"
        onClick={goToNext}
        disabled={!reading.nextDate}
      >
        Next Day →
      </button>
    </div>
  );

  return (
    <ReadingFrame
      title={reading.title}
      date={reading.pubDate}
      source={reading.link}
      navButtons={navButtons}
    >
      <div dangerouslySetInnerHTML={{ __html: reading.description }} />
    </ReadingFrame>
  );
}

function ReadingFrame({ title, date, source, children, navButtons }) {
  return (
    <div className="reading-shell">
      <div className="reading-meta">
        <h2>{title}</h2>
        <p>{date}</p>
        {navButtons}
      </div>
      <article className="reading-content">{children}</article>
      <div className="actions">
        <a className="outline-button" href={source} target="_blank" rel="noopener noreferrer">Open Source</a>
        <a className="outline-button" href="/">Back to Home</a>
      </div>
    </div>
  );
}
