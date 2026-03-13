import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';

// ─── Profile config — edit here to personalise ───────────────────────────────
const PROFILE = {
  name: 'Long Hoang',
  title: 'DevOps & Cloud Engineer',
  bio: 'Passionate about automating infrastructure, building resilient systems, and designing for scale.',
  avatarSrc: '', // set to image URL or leave empty for initials
  categories: ['All', 'DevOps', 'Cloud', 'System Design'],
  skills: [
    { name: 'Kubernetes', category: 'DevOps' },
    { name: 'Docker', category: 'DevOps' },
    { name: 'Terraform', category: 'Cloud' },
    { name: 'AWS', category: 'Cloud' },
    { name: 'Azure', category: 'Cloud' },
    { name: 'CI/CD Pipelines', category: 'DevOps' },
    { name: 'Helm', category: 'DevOps' },
    { name: 'Microservices', category: 'System Design' },
    { name: 'Event-Driven Architecture', category: 'System Design' },
    { name: 'Observability', category: 'DevOps' },
    { name: 'GitOps', category: 'DevOps' },
    { name: 'GCP', category: 'Cloud' },
  ],
};

function getInitials(name: string) {
  const parts = name.trim().split(' ');
  const first = parts[0]?.[0] ?? '';
  const last = parts[parts.length - 1]?.[0] ?? '';
  return (first + (parts.length > 1 ? last : '')).toUpperCase();
}

// ─── Avatar ──────────────────────────────────────────────────────────────────
function Avatar({ src, name }: { src: string; name: string }) {
  return src ? (
    <img src={src} alt={name} className="avatar" />
  ) : (
    <div className="avatar avatar--initials" aria-label={name}>
      {getInitials(name)}
    </div>
  );
}

// ─── Theme Toggle ────────────────────────────────────────────────────────────
function ThemeToggle({ theme, onToggle }: { theme: string; onToggle: () => void }) {
  return (
    <button
      className="theme-toggle"
      onClick={onToggle}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}

// ─── Category Blade ──────────────────────────────────────────────────────────
function Blade({
  categories,
  active,
  onSelect,
}: {
  categories: string[];
  active: string;
  onSelect: (c: string) => void;
}) {
  return (
    <div className="blade" role="tablist" aria-label="Skill categories">
      {categories.map((cat) => (
        <button
          key={cat}
          role="tab"
          aria-selected={active === cat}
          className={`blade__tab${active === cat ? ' blade__tab--active' : ''}`}
          onClick={() => onSelect(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

// ─── Skill Card ──────────────────────────────────────────────────────────────
function SkillCard({ name }: { name: string }) {
  return <div className="skill-card">{name}</div>;
}

// ─── Home Page ───────────────────────────────────────────────────────────────
function Home() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredSkills =
    activeCategory === 'All'
      ? PROFILE.skills
      : PROFILE.skills.filter((s) => s.category === activeCategory);

  return (
    <div className="page">
      <section className="hero">
        <Avatar src={PROFILE.avatarSrc} name={PROFILE.name} />
        <div className="hero__text">
          <h1 className="hero__name">{PROFILE.name}</h1>
          <p className="hero__title">{PROFILE.title}</p>
          <p className="hero__bio">{PROFILE.bio}</p>
        </div>
      </section>

      <section className="section" aria-label="Skills">
        <h2 className="section__heading">Skills</h2>
        <Blade
          categories={PROFILE.categories}
          active={activeCategory}
          onSelect={setActiveCategory}
        />
        <div className="skill-grid">
          {filteredSkills.map((s) => (
            <SkillCard key={s.name} name={s.name} />
          ))}
        </div>
      </section>

      <section className="section" aria-label="About">
        <h2 className="section__heading">About Me</h2>
        <p className="section__body">{PROFILE.bio}</p>
        <Link to="/system-design" className="link-button">
          View System Design Notes →
        </Link>
      </section>
    </div>
  );
}

// ─── System Design Page ──────────────────────────────────────────────────────
function SystemDesign() {
  return (
    <div className="page">
      <section className="section">
        <h1>System Design</h1>
        <p className="section__body">
          Private notes on distributed systems, architecture patterns, and infrastructure
          design decisions.
        </p>
        <Link to="/" className="link-button">
          ← Back to Portfolio
        </Link>
      </section>
    </div>
  );
}

// ─── App Shell ───────────────────────────────────────────────────────────────
function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const stored = localStorage.getItem('theme') as 'light' | 'dark' | null;
    return stored ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  });

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  };

  // Sync initial theme attribute on mount
  useState(() => {
    document.documentElement.setAttribute('data-theme', theme);
  });

  return (
    <Router>
      <div className="shell">
        <header className="topbar">
          <span className="topbar__brand">{PROFILE.name}</span>
          <nav className="topbar__nav">
            <Link to="/" className="topbar__link">Home</Link>
            <Link to="/system-design" className="topbar__link">System Design</Link>
          </nav>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </header>

        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/system-design" element={<SystemDesign />} />
          </Routes>
        </main>

        <footer className="footer">
          <p>© {new Date().getFullYear()} {PROFILE.name}</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
