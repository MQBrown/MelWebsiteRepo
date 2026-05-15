import React from 'react'
import { Link } from 'react-router-dom'

export default function Home({ settings }){
  const s = settings || {}
  return (
    <main className="container">
      <section className="hero">
        <span className="badge">{s.licenseStatus || 'Georgia Residential Basic Contractor License – Pending'}</span>
        <h1 className="h1">{s.tagline || 'Residential Construction & Property Development – Georgia'}</h1>
        <p className="sub">
          Built right. Permitted. Inspected. We focus on quality workmanship, clear communication, and code compliance.
        </p>
        <div style={{display:'flex',gap:12,flexWrap:'wrap',marginTop:18}}>
          <Link className="btn" to="/plans">View Floor Plans</Link>
          <Link className="btn" to="/contact">{s.cta || 'Request a call back'}</Link>
        </div>
      </section>

      <section className="grid">
        <div className="card half">
          <h2>Contact</h2>
          <p className="sub">Phone: <strong>{s.phone || '(###) ###-####'}</strong><br/>
          Email: <strong>{s.email || 'info@mqbrownproperty.com'}</strong></p>
          <p className="sub">Service Area: {s.serviceArea || 'Atlanta Metro & surrounding areas'}</p>
          <Link className="btn" to="/contact">Send a message</Link>
        </div>
        <div className="section">
          <h2>Why us</h2>
          <ul className="sub">
            <li>Hands-on new-build experience (framing → finish)</li>
            <li>Permit and inspection management</li>
            <li>Transparent scope, timeline, and communication</li>
          </ul>
          <p className="sub">See our work and in-progress plans.</p>
          <Link className="btn" to="/projects">View Projects</Link>
        </div>
      </section>
    </main>
  )
}
