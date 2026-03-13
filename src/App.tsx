import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';

function Home() {
  return (
    <div className="portfolio">
      <header>
        <img src="./assets/avatar.png" alt="Avatar" className="avatar" />
        <h1>Welcome to My Portfolio</h1>
      </header>
      <main>
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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/system-design" element={<SystemDesign />} />
      </Routes>
    </Router>
  );
}

export default App;
