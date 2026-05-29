'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function AnnouncementTicker() {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    let cancelled = false;

    async function loadAnnouncements() {
      try {
        const response = await fetch('/api/announcements', { cache: 'no-store' });
        if (!response.ok) return;
        const data = await response.json();
        if (!cancelled) setAnnouncements(data.announcements || []);
      } catch {
        if (!cancelled) setAnnouncements([]);
      }
    }

    loadAnnouncements();

    return () => {
      cancelled = true;
    };
  }, []);

  const messages = announcements.map((announcement) => announcement.text).filter(Boolean);
  if (messages.length === 0) return null;

  const tickerMessages = [...messages, ...messages];

  return (
    <aside className="announcement-ticker" aria-label="Running parish announcements">
      <Link href="/announcements" className="announcement-ticker-label">
        Announcements
      </Link>
      <div className="announcement-ticker-window">
        <div className="announcement-ticker-track">
          {tickerMessages.map((message, index) => (
            <span key={`${message}-${index}`}>
              {message}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
}
