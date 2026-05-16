import React from 'react'
import { Link } from 'react-router-dom'

export default function Home({ settings }){
  const s = settings || {}
  return (
 return (
  <main className="container">
    <section className="hero section">
      <span className="badge">{s.licenseStatus || "Georgia Residential Basic Contractor License – Pending"}</span>
      <h1 className="h1">{s.tagline || "Residential Construction & Property Development – Georgia"}</h1>
      <p className="sub">
        Built right. Permitted. Inspected. We focus on quality workmanship, clear communication, and code compliance.
      </p>

      <div style={{display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap"}}>
        <Link className="btn" to="/plans">View Floor Plans</Link>
        <Link className="btn secondary" to="/contact">{s.cta || "Request a call back"}</Link>
      </div>
    </section>

    <section className="section grid">
      <div className="card half">
        <h2 style={{marginTop:0}}>Contact</h2>
        <p className="sub" style={{margin:0}}>
          Phone: <strong>{s.phone || "(770) 899-7775"}</strong><br/>
          Email: <strong>{s.email || "mqbrown07@gmail.com"}</strong>
        </p>
        <p className="sub">Service Area: {s.serviceArea || "Atlanta Metro & surrounding areas"}</p>
        <Link className="btn secondary" to="/contact">Send a message</Link>
      </div>

      <div className="card half">
        <h2 style={{marginTop:0}}>Why Us</h2>
        <ul className="sub" style={{marginTop:0}}>
          <li>Hands-on new-build experience (framing → finish)</li>
          <li>Permit and inspection management</li>
          <li>Transparent scope, timeline, and communication</li>
        </ul>
        <p className="sub">See our work and in-progress plans.</p>
        <Link className="btn secondary" to="/projects">View Projects</Link>
      </div>
    </section>
  </main>
);
  )
}
