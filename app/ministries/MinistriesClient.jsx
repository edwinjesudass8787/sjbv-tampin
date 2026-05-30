'use client';

import { useState } from 'react';

export default function MinistriesClient({ ministries }) {
  const [openCategory, setOpenCategory] = useState(ministries[0]?.category || '');

  const toggleCategory = (category) => {
    setOpenCategory((current) => (current === category ? '' : category));
  };

  return (
    <section className="ministries-grid" aria-label="Parish ministries">
      {ministries.map((group) => {
        const isOpen = openCategory === group.category;
        return (
          <article className={`ministry-card ${isOpen ? 'open' : ''}`} key={group.category}>
            <button className="ministry-card-toggle" type="button" onClick={() => toggleCategory(group.category)} aria-expanded={isOpen}>
              <span className="ministry-card-heading">
                <h2>{group.category}</h2>
                <small>{group.ministries.length || 'More'} {group.ministries.length === 1 ? 'ministry' : 'ministries'}</small>
              </span>
            </button>
            {isOpen ? (
              group.ministries.length > 0 ? (
                <ul>
                  {group.ministries.map((ministry) => (
                    <li key={ministry.name}>
                      <span>{ministry.name}</span>
                      <PicBlock picName={ministry.picName} picImageUrl={ministry.picImageUrl} />
                    </li>
                  ))}
                </ul>
              ) : group.picName || group.picImageUrl ? (
                <div className="ministry-card-empty">
                  <PicBlock picName={group.picName} picImageUrl={group.picImageUrl} />
                </div>
              ) : (
                null
              )
            ) : null}
          </article>
        );
      })}
    </section>
  );
}

function PicBlock({ picName, picImageUrl }) {
  if (!picName && !picImageUrl) return null;

  return (
    <div className="ministry-pic">
      {picImageUrl ? <img src={picImageUrl} alt="" /> : <div className="ministry-pic-fallback">{picName?.charAt(0) || 'P'}</div>}
      <div>
        <small>Person-in-Charge</small>
        {picName ? <strong>{picName}</strong> : <strong>To be confirmed</strong>}
      </div>
    </div>
  );
}
