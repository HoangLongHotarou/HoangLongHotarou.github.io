import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../../hooks/useSearch';
import type { SearchResult } from '../../types';

interface SearchBoxProps {
  placeholder?: string;
  className?: string;
}

export default function SearchBox({ placeholder = 'Search…', className }: SearchBoxProps) {
  const [query, setQuery] = useState('');
  const { pageResults, categoryResults } = useSearch(query);
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  const hasResults = pageResults.length > 0 || categoryResults.length > 0;
  const isOpen = query.length > 0 && hasResults;

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Escape') {
      setQuery('');
    }
  }

  function handleSelect(result: SearchResult) {
    navigate(result.to);
    setQuery('');
  }

  useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setQuery('');
      }
    }
    document.addEventListener('mousedown', onMouseDown);
    return () => document.removeEventListener('mousedown', onMouseDown);
  }, []);

  return (
    <div ref={containerRef} className={`search-box${className ? ` ${className}` : ''}`}>
      <input
        className="search-box__input"
        type="search"
        aria-label="Search site"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        autoComplete="off"
      />
      {isOpen && (
        <ul className="search-box__panel" role="listbox" aria-label="Search results">
          {pageResults.length > 0 && (
            <>
              <li className="search-box__group-heading" role="presentation">Pages</li>
              {pageResults.map((r) => (
                <li
                  key={r.to}
                  className="search-box__item"
                  role="option"
                  aria-selected={false}
                  onMouseDown={() => handleSelect(r)}
                >
                  <span className="search-box__item-label">{r.label}</span>
                  <span className="search-box__item-sub">{r.sublabel}</span>
                </li>
              ))}
            </>
          )}
          {categoryResults.length > 0 && (
            <>
              <li className="search-box__group-heading" role="presentation">Categories</li>
              {categoryResults.map((r) => (
                <li
                  key={r.to}
                  className="search-box__item search-box__item--category"
                  role="option"
                  aria-selected={false}
                  onMouseDown={() => handleSelect(r)}
                >
                  <span className="search-box__item-label">{r.label}</span>
                  <span className="search-box__item-sub">{r.sublabel}</span>
                </li>
              ))}
            </>
          )}
        </ul>
      )}
    </div>
  );
}

