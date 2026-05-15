import React, { useEffect, useMemo, useState } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Plans from './pages/Plans'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import BackButton from "./pages/BackButton";
import "./styles.css";

export default function App(){
  const [settings, setSettings] = useState(null)
  const location = useLocation()

  useEffect(()=>{
    fetch('/content/settings.json').then(r=>r.json()).then(setSettings).catch(()=>{})
  },[])

  const title = useMemo(()=> settings?.businessName ?? 'MQbrown Property LLC', [settings])

  return (
    <>
      <header className="nav">
        <div className="brand"><Link to="/">{title}</Link></div>
        <nav className="links">
          <Link to="/plans">Floor Plans</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/contact">Contact</Link>
          <a href="/admin/">Admin</a>
        </nav>
        
        <main className="container">
          <div style={{display:"flex", gap:12, alignItems:"center", marginBottom:12}}>
            <BackButton fallback="/" />
            <h1 style={{margin:0}}>Floor Plans</h1>
          </div>
        </main>
        
      </header>
      <Routes location={location}>
        <Route path="/" element={<Home settings={settings} />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact settings={settings} />} />
      </Routes>
      <footer className="footer">
        <div className="container">
          <div>© {new Date().getFullYear()} {title}. All rights reserved.</div>
          <div style={{marginTop:8}}>Built on Azure Static Web Apps + GitHub.</div>
        </div>
      </footer>
    </>
  )
}
