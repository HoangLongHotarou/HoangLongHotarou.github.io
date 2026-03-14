import { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import ThemeToggle from '../components/ThemeToggle/ThemeToggle';
import { PROFILE } from '../data/profile';

type NavLeaf = { type: 'link'; label: string; to: string };
type NavGroup = { type: 'group'; label: string; children: NavLeaf[] };
type NavItem = NavLeaf | NavGroup;

const NAV: NavItem[] = [
  { type: 'link', label: 'Home', to: '/' },
  {
    type: 'group',
    label: 'Categories',
    children: [
      { type: 'link', label: 'System Design', to: '/system-design' },
      { type: 'link', label: 'DevOps Tools', to: '/devops-tools' },
      { type: 'link', label: 'New Updates', to: '/new-updates' },
    ],
  },
];

export default function AppShell() {
  useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ Categories: true });

  const toggleGroup = (label: string) =>
    setExpanded((prev) => ({ ...prev, [label]: !prev[label] }));

  return (
    <div className="shell">
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`sidebar${sidebarOpen ? ' sidebar--open' : ''}`}>
          <nav aria-label="Site navigation">
            <ul className="sidebar__list">
              {NAV.map((item) =>
                item.type === 'link' ? (
                  <li key={item.label}>
                    <NavLink
                      to={item.to}
                      end
                      className={({ isActive }) =>
                        `sidebar__link${isActive ? ' sidebar__link--active' : ''}`
                      }
                      onClick={() => setSidebarOpen(false)}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ) : (
                  <li key={item.label} className="sidebar__group">
                    <button
                      className="sidebar__group-btn"
                      onClick={() => toggleGroup(item.label)}
                      aria-expanded={!!expanded[item.label]}
                    >
                      <span>{item.label}</span>
                      <span className={`sidebar__chevron${expanded[item.label] ? ' sidebar__chevron--open' : ''}`}>
                        ›
                      </span>
                    </button>
                    {expanded[item.label] && (
                      <ul className="sidebar__sublist">
                        {item.children.map((child) => (
                          <li key={child.label}>
                            <NavLink
                              to={child.to}
                              className={({ isActive }) =>
                                `sidebar__link sidebar__link--sub${isActive ? ' sidebar__link--active' : ''}`
                              }
                              onClick={() => setSidebarOpen(false)}
                            >
                              {child.label}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                )
              )}
            </ul>
          </nav>
        </aside>

      <div className="main-col">
        <header className="topbar">
          <button
            className="topbar__hamburger"
            aria-label="Toggle sidebar"
            aria-expanded={sidebarOpen}
            onClick={() => setSidebarOpen((o) => !o)}
          >
            <span /><span /><span />
          </button>
          <Link to="/" className="topbar__brand">{PROFILE.name}</Link>
          <ThemeToggle />
        </header>

        <main className="content">
          <Outlet />
        </main>

        <footer className="footer">
          <p>© {new Date().getFullYear()} {PROFILE.name}</p>
        </footer>
      </div>
    </div>
  );
}
