import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import AppShell from './layouts/AppShell';
import Home from './pages/Home/Home';
import SystemDesign from './pages/SystemDesign/SystemDesign';
import ComingSoon from './pages/ComingSoon/ComingSoon';

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route element={<AppShell />}>
            <Route path="/" element={<Home />} />
            <Route path="/system-design" element={<SystemDesign />} />
            <Route path="/devops-tools" element={<ComingSoon title="DevOps Tools" />} />
            <Route path="/new-updates" element={<ComingSoon title="New Updates" />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
