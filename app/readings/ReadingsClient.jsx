'use client';

import { useEffect, useState, useCallback } from 'react';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'ms', label: 'Bahasa Malaysia' },
  { code: 'zh', label: 'Mandarin' },
  { code: 'ta', label: 'Tamil' },
];

export default function ReadingsClient() {
  const [reading, setReading] = useState(null);
  const [error, setError] = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [language, setLanguage] = useState('en');

  const loadReading = useCallback((date, selectedLanguage = language) => {
    setReading(null);
    setError(false);

    const params = new URLSearchParams({ lang: selectedLanguage });
    if (date) params.set('date', date);

    fetch(`/api/readings?${params.toString()}`)
      .then((response) => {
        if (!response.ok) throw new Error('Unable to load readings');
        return response.json();
      })
      .then((data) => {
        setReading(data);
        setCurrentDate(data.date || '');
        setSelectedDate(data.date || '');
      })
      .catch(() => setError(true));
  }, [language]);

  useEffect(() => {
    loadReading(currentDate, language);
  }, [loadReading]);

  const goToPrev = () => {
    if (reading?.prevDate) loadReading(reading.prevDate, language);
  };

  const goToNext = () => {
    if (reading?.nextDate) loadReading(reading.nextDate, language);
  };

  const changeLanguage = (nextLanguage) => {
    setLanguage(nextLanguage);
  };

  const loadSelectedDate = () => {
    if (selectedDate) loadReading(selectedDate, language);
  };

  const loadToday = () => {
    loadReading(getTodayIsoDate(), language);
  };

  const languagePicker = (
    <div className="language-picker" aria-label="Reading language">
      {languages.map((item) => (
        <button
          type="button"
          key={item.code}
          className={language === item.code ? 'active' : ''}
          onClick={() => changeLanguage(item.code)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );

  if (error) {
    return (
      <ReadingFrame
        title="Daily Readings"
        date="The RSS feed could not be loaded right now."
        source="https://www.catholicgallery.org/mass-readings-today-drb/"
        navButtons={null}
        languagePicker={languagePicker}
      >
        <div className="status">Please use the source link below to view today's readings directly from the USCCB website.</div>
      </ReadingFrame>
    );
  }

  if (!reading) {
    return (
      <ReadingFrame
        title="Loading today's readings..."
        date="Retrieving the readings from Catholic Gallery."
        source="https://www.catholicgallery.org/mass-readings-today-drb/"
        navButtons={null}
        languagePicker={languagePicker}
      >
        <div className="status">Please wait while the readings are loaded.</div>
      </ReadingFrame>
    );
  }

  const navButtons = (
    <>
      <div className="date-picker" aria-label="Choose reading date">
        <label htmlFor="reading-date">Choose a date</label>
        <input
          id="reading-date"
          type="date"
          value={selectedDate}
          onChange={(event) => setSelectedDate(event.target.value)}
        />
        <button type="button" className="outline-button" onClick={loadSelectedDate} disabled={!selectedDate}>
          Load Date
        </button>
        <button type="button" className="outline-button" onClick={loadToday} disabled={currentDate === getTodayIsoDate()}>
          Today
        </button>
      </div>
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
    </>
  );

  return (
    <ReadingFrame
      title={reading.title}
      date={reading.pubDate}
      source={reading.link}
      navButtons={navButtons}
      languagePicker={languagePicker}
    >
      {reading.languageNote && <p className="translation-note">{reading.languageNote}</p>}
      <div dangerouslySetInnerHTML={{ __html: reading.description }} />
    </ReadingFrame>
  );
}

function getTodayIsoDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function ReadingFrame({ title, date, source, children, navButtons, languagePicker }) {
  return (
    <div className="reading-shell">
      <div className="reading-meta">
        <h2>{title}</h2>
        <p>{date}</p>
        {languagePicker}
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
