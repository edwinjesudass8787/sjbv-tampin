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
      <div className="archive-grid">
        {items.map((item, index) => (
          <figure className="archive-card" key={`${item.title}-${index}`}>
            <button type="button" onClick={() => setSelected(item)} aria-label={`Open ${item.title}`}>
              <img src={item.imageUrl} alt={item.title} loading="lazy" />
            </button>
            <figcaption>
              <span className="archive-card-category">{item.category}</span>
              <h2>{item.title}</h2>
              {item.date && <time>{item.date}</time>}
              {item.description && <p>{item.description}</p>}
            </figcaption>
          </figure>
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
