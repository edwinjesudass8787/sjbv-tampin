'use client';

import { useEffect, useState } from 'react';

export default function GalleryClient({ items }) {
  const [selected, setSelected] = useState(null);
  const groups = groupItems(items);

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
      <div className="gallery-groups">
        {groups.map((group) => (
          <section className="gallery-group" key={group.name}>
            <div className="gallery-group-header">
              <h2>{group.name}</h2>
              <span>{group.items.length} {group.items.length === 1 ? 'photo' : 'photos'}</span>
            </div>
            <div className="gallery-grid">
              {group.items.map((item) => (
                <figure className="gallery-card" key={item.fileId}>
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
          </section>
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

function groupItems(items) {
  const groups = new Map();

  items.forEach((item) => {
    const name = item.groupName || 'Gallery';
    if (!groups.has(name)) groups.set(name, []);
    groups.get(name).push(item);
  });

  return [...groups.entries()].map(([name, groupItems]) => ({ name, items: groupItems }));
}
