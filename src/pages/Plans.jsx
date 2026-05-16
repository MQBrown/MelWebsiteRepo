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

export default function Plans(){
  const [plans, setPlans] = useState([])
  const [selected, setSelected] = useState(null)

  useEffect(()=>{
    fetch('/content/plans/index.json')
      .then(r=>r.json())
      .then(async (items)=>{
        const loaded = []
        for(const item of items){
          const md = await fetch(item).then(r=>r.text())
          const fm = parseFrontmatter(md)
          loaded.push({ ...fm.data, _raw: md })
        }
        setPlans(loaded)
        setSelected(loaded[0] || null)
      })
      .catch(()=>{})
  },[])

  return (
    <main className="container">

      {/* ✅ Header */}
      <div style={{display:"flex", gap:12, alignItems:"center", marginBottom:16}}>
        <BackButton />
        <h1 style={{margin:0}}>Floor Plans</h1>
      </div>

      <p className="sub">
        Browse available floor plans. Select one to preview the full design.
      </p>

      {/* ✅ Add reveal animation */}
      <section className="grid reveal">

        {/* LEFT: PLAN LIST */}
        <div className="card half">
          <h2>Plans</h2>

          {plans.length === 0 ? (
            <p className="sub">
              No plans loaded yet. Add plans in the Admin page.
            </p>
          ) : (
            <ul className="sub" style={{listStyle:"none", padding:0}}>
              {plans.map((p,i)=>(
                <li key={i} style={{marginBottom:12}}>
                  <button
                    className="btn secondary"
                    style={{
                      width:'100%',
                      justifyContent:'space-between',
                      fontSize:14
                    }}
                    onClick={()=>setSelected(p)}
                  >
                    <span>{p.title}</span>
                    <span style={{opacity:.7}}>
                      {p.sqft ? `${p.sqft} sqft` : ''}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* RIGHT: PREVIEW */}
        <div className="card half">
          <h2>Preview</h2>

          {!selected ? (
            <p className="sub">Select a plan to preview.</p>
          ) : (
            <>
              <p className="sub">
                <strong>{selected.title}</strong><br/>
                {selected.beds && selected.baths
                  ? `${selected.beds} bed / ${selected.baths} bath`
                  : ''}
                {selected.status ? ` • ${selected.status}` : ''}
              </p>

              {selected.file ? (
                <iframe
                  title="plan"
                  src={selected.file}
                  style={{
                    width:'100%',
                    height:'520px',
                    border:'1px solid rgba(148,163,184,.2)',
                    borderRadius:12
                  }}
                />
              ) : (
                <p className="sub">No PDF linked yet.</p>
              )}
            </>
          )}
        </div>

      </section>
    </main>
  )
}
