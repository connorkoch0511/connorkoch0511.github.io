import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import ProjectDetail from "./pages/ProjectDetail";
import Downloads from "./pages/Downloads";

export default function App() {
  return (
    <>
      <div className="retro-bg retro-scanlines">
        <nav className="nav">
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/projects">Projects 🍄</Link>
            <Link to="/downloads">Downloads 💾</Link>
            <Link to="/contact">Contact ⚡</Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/downloads" element={<Downloads />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </>
  );
}
