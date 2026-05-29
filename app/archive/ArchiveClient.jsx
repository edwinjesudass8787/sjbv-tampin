'use client';

import { useEffect, useMemo, useState } from 'react';

export default function ArchiveClient({ items }) {
  const [selected, setSelected] = useState(null);
  const [selectedYear, setSelectedYear] = useState('all');
  const [sortDirection, setSortDirection] = useState('asc');

  const years = useMemo(() => {
    return [...new Set(items.map((item) => item.year).filter(Boolean))].sort((a, b) => a - b);
  }, [items]);

  const filteredItems = useMemo(() => {
    return [...items]
      .filter((item) => selectedYear === 'all' || item.year === Number(selectedYear))
      .sort((a, b) => {
        const yearA = a.year || 0;
        const yearB = b.year || 0;
        const yearSort = sortDirection === 'asc' ? yearA - yearB : yearB - yearA;
        return yearSort || a.title.localeCompare(b.title);
      });
  }, [items, selectedYear, sortDirection]);

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
      <div className="archive-filters" aria-label="Archive filters">
        <div>
          <span>Filter by Year</span>
          <div className="archive-filter-buttons">
            <button type="button" className={selectedYear === 'all' ? 'active' : ''} onClick={() => setSelectedYear('all')}>
              All
            </button>
            {years.map((year) => (
              <button type="button" className={selectedYear === String(year) ? 'active' : ''} key={year} onClick={() => setSelectedYear(String(year))}>
                {year}
              </button>
            ))}
          </div>
        </div>
        <div>
          <span>Sort</span>
          <div className="archive-filter-buttons">
            <button type="button" className={sortDirection === 'asc' ? 'active' : ''} onClick={() => setSortDirection('asc')}>
              Oldest First
            </button>
            <button type="button" className={sortDirection === 'desc' ? 'active' : ''} onClick={() => setSortDirection('desc')}>
              Newest First
            </button>
          </div>
        </div>
      </div>

      <div className="archive-grid">
        {filteredItems.map((item, index) => (
          <figure className="archive-card" key={`${item.title}-${index}`}>
            <button type="button" onClick={() => setSelected(item)} aria-label={`Open ${item.title}`}>
              <img src={item.imageUrl} alt={item.title} loading="lazy" />
            </button>
            <figcaption>
              <span className="archive-card-category">{item.year || item.category}</span>
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
              {selected.year ? <span className="archive-card-category">{selected.year}</span> : null}
              {selected.date && <time>{selected.date}</time>}
              {selected.description && <p>{selected.description}</p>}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
