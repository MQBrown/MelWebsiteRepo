import React, { useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Plans from "./pages/Plans";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";

export default function App() {
  // Subtle fade-in on scroll for elements with className="reveal"
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("is-visible");
        });
      },
      { threshold: 0.12 }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

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

          {/* Admin is served by /public/admin/ (Decap CMS) */}
          <a className="admin-link" href="/admin/">
            Admin
          </a>
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
