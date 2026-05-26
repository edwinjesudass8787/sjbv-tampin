'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Nav({ active }) {
  const [open, setOpen] = useState(false);
  const links = [
    { href: '/', label: 'Home', key: 'home' },
    { href: '/life', label: 'Life of St. John', key: 'life' },
    { href: '/readings', label: 'Readings', key: 'readings' },
    { href: '/news', label: 'News', key: 'news' },
    { href: '/sdg', label: 'SDG', key: 'sdg' },
    { href: '/rosary', label: 'Rosary', key: 'rosary' },
  ];

  return (
    <nav className="site-nav">
      <Link href="/" className="nav-logo">
        <img src="/logo.png" alt="Church of St. John Marie Vianney logo" />
        <span>Church of St. John Marie Vianney</span>
      </Link>
      <button className="mobile-menu-button" type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle navigation menu">
        <span />
        <span />
        <span />
      </button>
      <ul className={`nav-links ${open ? 'open' : ''}`}>
        {links.map((link) => (
          <li key={link.key}>
            <Link href={link.href} className={active === link.key ? 'active' : ''} onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          </li>
        ))}
        <li className="nav-social">
          <a href="https://www.facebook.com/people/Church-of-St-John-Marie-VianneyTampin/100084148242641/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </a>
        </li>
      </ul>
      <a href="https://www.facebook.com/people/Church-of-St-John-Marie-VianneyTampin/100084148242641/" className="nav-facebook-desktop" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
      </a>
    </nav>
  );
}
