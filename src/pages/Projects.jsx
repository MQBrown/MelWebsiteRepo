import React, { useEffect, useState } from 'react'
import BackButton from "../components/BackButton";

function parseFrontmatter(md) {
  const match = md.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { data: {}, body: md };

  const yaml = match[1];
  const body = match[2];
  const data = {};

  yaml.split(/\r?\n/).forEach((line) => {
    const idx = line.indexOf(":");
    if (idx > 0) {
      const k = line.slice(0, idx).trim();
      const v = line.slice(idx + 1).trim();
      data[k] = v;
    }
  });

  return { data, body };
}

export default function Projects(){
  const [items, setItems] = useState([])

  useEffect(()=>{
    fetch('/content/projects/index.json')
      .then(r=>r.json())
      .then(async (list)=>{
        const loaded=[]
        for(const path of list){
          const md = await fetch(path).then(r=>r.text())
          const fm = parseFrontmatter(md)
          loaded.push({ ...fm.data })
        }
        setItems(loaded)
      })
      .catch(()=>{})
  },[])

  return (
    <main className="container">
      <div style={{display:"flex", gap:12, alignItems:"center", marginBottom:12}}>
        <BackButton fallback="/" />
        <h1 style={{margin:0}}>Floor Plans</h1>
      </div>
     
      <h1>Projects</h1>
      <p className="sub">Selected projects and build experience.</p>
      <section className="grid">
        {items.length===0 ? (
          <div className="card"><p className="sub">No projects loaded yet. Add items via Admin and update index.json.</p></div>
        ) : items.map((p,i)=>(
          <div className="card half" key={i}>
            <h2>{p.title}</h2>
            <p className="sub">{p.location} {p.date ? `• ${String(p.date).slice(0,10)}` : ''}</p>
            {p.coverImage ? (
              <img src={p.coverImage} alt={p.title} style={{width:'100%',borderRadius:12,border:'1px solid rgba(148,163,184,.15)'}} />
            ) : null}
            <p className="sub" style={{marginTop:10}}>{p.summary}</p>
          </div>
        ))}
      </section>
    </main>
  )
}
