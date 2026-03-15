import { Link } from 'react-router-dom';
import { loadUpdates } from '../../utils/parseMd';

const UPDATES = loadUpdates();

export default function Updates() {
  return (
    <div className="page">
      <h1 className="section__heading" style={{ borderBottom: 'none', paddingBottom: 0 }}>
        New Updates
      </h1>

      {UPDATES.length === 0 ? (
        <p style={{ color: 'var(--text)' }}>No updates yet — check back soon.</p>
      ) : (
        <div className="update-list">
          {UPDATES.map((update) => (
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
