import React, { useEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Plans from "./pages/Plans";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";

export default function App() {
  const location = useLocation();

  useEffect(() => {
    const els = Array.from(document.querySelectorAll(".reveal"));

    // If there are no reveal elements on this route, nothing to do.
    if (!els.length) return;

    // Reset state when route changes so elements can animate in again.
    els.forEach((el) => el.classList.remove("is-visible"));

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("is-visible");
        });
      },
      { threshold: 0.12 }
    );

    els.forEach((el) => obs.observe(el));

    // Safety: if an element is already in view immediately after navigation,
    // ensure it becomes visible on the next frame.
    requestAnimationFrame(() => {
      els.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const inView = rect.top < window.innerHeight && rect.bottom > 0;
        if (inView) el.classList.add("is-visible");
      });
    });

    return () => obs.disconnect();
  }, [location.pathname]); // <-- key fix: rerun on route change [1](https://reactrouter.com/docs/en/v6/hooks/use-location)

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

          {/* Admin is served by /public/admin/ */}
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
