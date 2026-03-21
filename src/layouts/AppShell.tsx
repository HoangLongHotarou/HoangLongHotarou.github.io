import { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import {
  Home as HomeIcon,
  Layers,
  GitBranch,
  Wrench,
  Bell,
  type LucideIcon,
} from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import ThemeToggle from '../components/ThemeToggle/ThemeToggle';
import SearchBox from '../components/SearchBox/SearchBox';
import { PROFILE } from '../data/profile';

type NavLeaf = { type: 'link'; label: string; to: string; icon?: LucideIcon };
type NavGroup = { type: 'group'; label: string; icon?: LucideIcon; children: NavLeaf[] };
type NavItem = NavLeaf | NavGroup;

const NAV: NavItem[] = [
  { type: 'link', label: 'Home', to: '/', icon: HomeIcon },
  {
    type: 'group',
    label: 'Categories',
    icon: Layers,
    children: [
      { type: 'link', label: 'System Design', to: '/system-design', icon: GitBranch },
      { type: 'link', label: 'DevOps Tools', to: '/devops-tools', icon: Wrench },
      { type: 'link', label: 'New Updates', to: '/new-updates', icon: Bell },
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
                      {item.icon && <item.icon size={16} className="sidebar__icon" aria-hidden="true" />}
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
                      <span className="sidebar__group-label">
                        {item.icon && <item.icon size={16} className="sidebar__icon" aria-hidden="true" />}
                        {item.label}
                      </span>
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
                              {child.icon && <child.icon size={14} className="sidebar__icon" aria-hidden="true" />}
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
          <SearchBox />
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
