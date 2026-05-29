'use client';

import { useState } from 'react';

const categorySections = {
  'PARISH PASTORAL COORDINATOR': 'Parish Leadership',
  'PARISH COORDINATING COMMITTEE': 'Parish Leadership',
  'PARISH FINANCE COMMITTEE': 'Parish Leadership',
  'LITURGICAL COMMITTEE': 'Parish Leadership',
  'PARISH PROJECT COMMITTEE': 'Parish Leadership',
  CATECHETICS: 'Formation & Apostolates',
  'LANGUAGE APOSTOLATES': 'Formation & Apostolates',
  LITURGY: 'Worship & Service',
  'INTEGRATED HUMAN DEVELOPMENT (PIHD)': 'Community & Outreach',
  'SPIRITUAL & RENEWAL': 'Formation & Apostolates',
  YOUTH: 'Community & Outreach',
  'SOCIAL COMMUNICATION': 'Community & Outreach',
  'FAMILY LIFE': 'Community & Outreach',
  CEMETERY: 'Worship & Service',
};

const sectionOrder = ['Parish Leadership', 'Formation & Apostolates', 'Worship & Service', 'Community & Outreach'];

export default function MinistriesClient({ ministries }) {
  const [openCategory, setOpenCategory] = useState(ministries[0]?.category || '');
  const sections = groupBySection(ministries);

  const toggleCategory = (category) => {
    setOpenCategory((current) => (current === category ? '' : category));
  };

  return (
    <section className="ministries-sections" aria-label="Parish ministries">
      {sections.map((section) => (
        <div className="ministries-section" key={section.name}>
          <div className="ministries-section-header">
            <span>{section.name}</span>
            <small>{section.groups.length} {section.groups.length === 1 ? 'category' : 'categories'}</small>
          </div>
          <div className="ministries-grid">
            {section.groups.map((group) => {
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
          </div>
        </div>
      ))}
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

function groupBySection(ministries) {
  const sections = new Map(sectionOrder.map((section) => [section, { name: section, groups: [] }]));

  ministries.forEach((group) => {
    const sectionName = categorySections[group.category.toUpperCase()] || 'Community & Outreach';
    if (!sections.has(sectionName)) sections.set(sectionName, { name: sectionName, groups: [] });
    sections.get(sectionName).groups.push(group);
  });

  return [...sections.values()].filter((section) => section.groups.length > 0);
}
