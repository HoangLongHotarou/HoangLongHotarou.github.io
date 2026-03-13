import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useState } from 'react';
import './App.css';

function Blade({ categories }: { categories: string[] }) {
  return (
    <div className="blade">
      <h2>Categories</h2>
      <ul>
        {categories.map((category, index) => (
          <li key={index}>{category}</li>
        ))}
      </ul>
    </div>
  );
}

function Home() {
  const categories = ['DevOps', 'Cloud Engineering', 'System Design'];
  const userName = 'John Doe'; // Replace with dynamic user data
  const avatarSrc = '';

  return (
    <div className="portfolio">
      <header>
        {avatarSrc ? (
          <img src={avatarSrc} alt="Avatar" className="avatar" />
        ) : (
          <div className="avatar-placeholder">{getInitials(userName)}</div>
        )}
        <h1>Welcome to My Portfolio</h1>
      </header>
      <main>
        <Blade categories={categories} />
        <section className="skills">
          <h2>Skills</h2>
          <ul>
            <li>DevOps</li>
            <li>Cloud Engineering</li>
            <li>System Design</li>
          </ul>
        </section>
        <section className="info">
          <h2>About Me</h2>
          <p>I am a passionate developer with expertise in DevOps and Cloud Engineering.</p>
        </section>
        <Link to="/system-design">Go to System Design</Link>
      </main>
    </div>
  );
}

function SystemDesign() {
  return (
    <div className="system-design">
      <h1>System Design</h1>
      <p>This page contains private content about system design principles and practices.</p>
      <Link to="/">Back to Home</Link>
    </div>
  );
}

function getInitials(name: string) {
  const [firstName, lastName] = name.split(' ');
  return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase();
}

function App() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <Router>
      <div className="app">
        <button onClick={toggleTheme} className="theme-toggle">
          Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/system-design" element={<SystemDesign />} />
      </Routes>
    </Router>
  );
}

export default App;
