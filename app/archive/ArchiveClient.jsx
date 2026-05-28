'use client';

import { useEffect, useState } from 'react';

export default function ArchiveClient({ items }) {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (!selected) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setSelected(null);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selected]);

  if (items.length === 0) {
    return (
      <div className="archive-empty">
        <h2>Archive Coming Soon</h2>
        <p>Add historical items to the archive sheet to display them here.</p>
      </div>
    );
  }

  return (
    <>
      <div className="archive-timeline">
        {items.map((item, index) => (
          <article className="archive-item" key={`${item.title}-${index}`}>
            <div className="archive-marker" />
            <div className="archive-content">
              {item.date && <time className="archive-date">{item.date}</time>}
              <span className="archive-category">{item.category}</span>
              <h2>{item.title}</h2>
              {item.description && <p>{item.description}</p>}
              <button
                type="button"
                className="archive-image-trigger"
                onClick={() => setSelected(item)}
                aria-label={`View ${item.title}`}
              >
                <img src={item.imageUrl} alt={item.title} loading="lazy" />
              </button>
            </div>
          </article>
        ))}
      </div>

      {selected && (
        <div className="gallery-modal" role="dialog" aria-modal="true" aria-label={selected.title} onClick={() => setSelected(null)}>
          <div className="gallery-modal-card" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="gallery-modal-close" onClick={() => setSelected(null)} aria-label="Close archive image">
              Close
            </button>
            <img src={selected.imageUrl} alt={selected.title} />
            <div className="gallery-modal-caption">
              <h2>{selected.title}</h2>
              {selected.date && <time>{selected.date}</time>}
              {selected.description && <p>{selected.description}</p>}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
