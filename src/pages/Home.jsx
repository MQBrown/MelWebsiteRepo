import React from 'react'
import { Link } from 'react-router-dom'

export default function Home({ settings }){
  const s = settings || {}
  return (
    <main className="container">
      <section className="hero section hero-split">
        {/* LEFT SIDE */}
        <div className="hero-left">
          <span className="badge">
            Georgia Residential Contractor – Pending
          </span>
      
          <h1 className="h1">
            Built Right. Permitted. Inspected.
          </h1>
      
          <p className="sub">
            Residential construction & property development in Georgia. 
            We focus on quality workmanship, clear communication, and code compliance.
          </p>
      
          <div className="hero-actions">
            <a className="btn" href="/plans">View Floor Plans</a>
            <a className="btn secondary" href="/contact">Request a call back</a>
          </div>
        </div>
      
        {/* RIGHT SIDE (YOUR IMAGE) */}
        <div className="hero-right">
          <img 
            src="/house.jpg" 
            alt="Project Preview"
            className="hero-image"
          />
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
}
