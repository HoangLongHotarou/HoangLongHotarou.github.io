import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

type SearchResult = {
  label: string;
  to: string;
  group: string;
};

const ALL_RESULTS: SearchResult[] = [
  { label: 'Home', to: '/', group: 'Pages' },
  { label: 'System Design', to: '/system-design', group: 'Categories' },
  { label: 'DevOps Tools', to: '/devops-tools', group: 'Categories' },
  { label: 'New Updates', to: '/new-updates', group: 'Pages' },
];

function groupResults(results: SearchResult[]) {
  const groups: Record<string, SearchResult[]> = {};
  for (const r of results) {
    if (!groups[r.group]) groups[r.group] = [];
    groups[r.group].push(r);
  }
  return groups;
}

export default function SearchBox() {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const q = query.trim().toLowerCase();
  const filtered = q
    ? ALL_RESULTS.filter((r) => r.label.toLowerCase().includes(q))
    : [];
  const grouped = groupResults(filtered);
  const groupKeys = Object.keys(grouped);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="search-box" ref={containerRef}>
      <span className="search-box__icon" aria-hidden="true">
        <Search size={15} />
      </span>
      <input
        className="search-box__input"
        type="search"
        placeholder="Search…"
        aria-label="Search pages and categories"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
      />
      {open && q && (
        <div className="search-box__panel" aria-label="Search results">
          {groupKeys.length === 0 ? (
            <p className="search-box__empty">No results for &ldquo;{query}&rdquo;</p>
          ) : (
            groupKeys.map((group) => (
              <div key={group}>
                <p className="search-box__group-heading">{group}</p>
                {grouped[group].map((r) => (
                  <Link
                    key={r.to}
                    to={r.to}
                    className="search-box__item"
                    onClick={() => {
                      setQuery('');
                      setOpen(false);
                    }}
                  >
                    {r.label}
                  </Link>
                ))}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
