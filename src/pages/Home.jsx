import React from "react";
import { Link } from "react-router-dom";

export default function Home({ settings }) {
  const s = settings || {};

  return (
    <main className="container">
      <section className="hero section hero-split">
        
        {/* LEFT SIDE */}
        <div className="hero-left">
          <h1 className="h1">
            We Build Custom, Single Family &amp; Town Houses
          </h1>

          <p className="sub">
            Residential construction &amp; property development in Georgia.
            Built with precision, inspected for quality, and delivered with integrity.
          </p>

          <div className="hero-actions">
            <Link className="btn" to="/plans">View Floor Plans</Link>
            <Link className="btn secondary" to="/contact">Request a Call</Link>
          </div>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="hero-right">
          <img
            src="/house.jpg"
            alt="Custom home build"
            className="hero-image"
          />

          {/* ✅ BIG CENTERED TEXT OVER IMAGE */}
          <div className="hero-overlay-text">
            Bring your plans — we’ll build your home.
          </div>
        </div>

      </section>

      {/* ===== LOWER SECTION ===== */}
      <section className="section grid">
        <div className="card half">
          <h2 style={{ marginTop: 0 }}>Contact</h2>

          <p className="sub" style={{ margin: 0 }}>
            Phone: <strong>{s.phone || "(770) 899-7775"}</strong><br />
            Email: <strong>{s.email || "mqbrown07@gmail.com"}</strong>
          </p>

          <p className="sub">
            Service Area: {s.serviceArea || "Atlanta Metro & surrounding areas"}
          </p>

          <Link className="btn secondary" to="/contact">
            Send a message
          </Link>
        </div>

        <div className="card half">
          <h2 style={{ marginTop: 0 }}>Why Us</h2>

          <ul className="sub" style={{ marginTop: 0 }}>
            <li>Hands-on new-build experience (framing → finish)</li>
            <li>Permit and inspection management</li>
            <li>Transparent scope, timeline, and communication</li>
          </ul>

          <p className="sub">See our work and in-progress plans.</p>

          <Link className="btn secondary" to="/projects">
            View Projects
          </Link>
        </div>
      </section>
    </main>
  );
}
