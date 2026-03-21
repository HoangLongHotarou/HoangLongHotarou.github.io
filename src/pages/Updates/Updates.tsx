import { useState } from 'react';
import { Link } from 'react-router-dom';
import { loadUpdates } from '../../utils/parseMd';

const UPDATES = loadUpdates();

export default function Updates() {
  const [query, setQuery] = useState('');

  const filteredUpdates = query
    ? UPDATES.filter(
        (u) =>
          u.title.toLowerCase().includes(query.toLowerCase()) ||
          u.summary.toLowerCase().includes(query.toLowerCase()),
      )
    : UPDATES;

  return (
    <div className="page">
      <h1 className="section__heading" style={{ borderBottom: 'none', paddingBottom: 0 }}>
        New Updates
      </h1>

      <div className="update-search">
        <input
          type="search"
          className="update-search__input"
          aria-label="Filter updates"
          placeholder="Filter updates…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {filteredUpdates.length === 0 && query ? (
        <p className="search-empty">No updates match &ldquo;{query}&rdquo;.</p>
      ) : UPDATES.length === 0 ? (
        <p style={{ color: 'var(--text)' }}>No updates yet — check back soon.</p>
      ) : (
        <div className="update-list">
          {filteredUpdates.map((update) => (
            <Link key={update.slug} to={`/new-updates/${update.slug}`} className="update-card">
              <span className="update-card__date">{update.date}</span>
              <h2 className="update-card__title">{update.title}</h2>
              <p className="update-card__summary">{update.summary}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
