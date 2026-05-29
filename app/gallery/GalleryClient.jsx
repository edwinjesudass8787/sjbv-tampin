'use client';

import { useEffect, useState } from 'react';

export default function GalleryClient({ items }) {
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

  return (
    <>
      <div className="gallery-grid">
        {items.map((item, index) => (
          <figure className="gallery-card" key={`${item.title}-${index}`}>
            <button type="button" onClick={() => setSelected(item)} aria-label={`Open ${item.title}`}>
              <img src={item.thumbnailUrl} alt={item.caption || item.title} loading="lazy" />
            </button>
            <figcaption>
              <h2>{item.title}</h2>
              {item.caption && <p>{item.caption}</p>}
            </figcaption>
          </figure>
        ))}
      </div>

      {selected && (
        <div className="gallery-modal" role="dialog" aria-modal="true" aria-label={selected.title} onClick={() => setSelected(null)}>
          <div className="gallery-modal-card" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="gallery-modal-close" onClick={() => setSelected(null)} aria-label="Close gallery image">
              Close
            </button>
            <img src={selected.imageUrl} alt={selected.caption || selected.title} />
            <div className="gallery-modal-caption">
              <h2>{selected.title}</h2>
              {selected.caption && <p>{selected.caption}</p>}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
