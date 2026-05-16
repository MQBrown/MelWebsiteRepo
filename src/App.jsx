import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Plans from "./pages/Plans";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <div>

      {/* ===== NAVBAR ===== */}
      <nav className="nav">

        {/* LEFT MENU */}
        <div className="links">
          <Link to="/plans">Floor Plans</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/contact">Contact</Link>
        </div>

        {/* RIGHT SIDE (BRAND + ADMIN) */}
        <div className="brand-wrapper">
          <div className="brand-right">
            <Link to="/">MQBrown Property LLC</Link>
          </div>
          <Link className="admin-link" to="/admin">Admin</Link>
        </div>

      </nav>

      {/* ===== ROUTES ===== */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      {/* ===== FOOTER ===== */}
      <footer className="footer container">
        © {new Date().getFullYear()} MQBrown Property LLC
      </footer>

    </div>
  );
}
