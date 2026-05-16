import React, { useEffect, useState } from "react";
import BackButton from "../components/BackButton";

function parseFrontmatter(md) {
  const match = md.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { data: {}, body: md };

  const yaml = match[1];
  const data = {};

  yaml.split(/\r?\n/).forEach((line) => {
    const idx = line.indexOf(":");
    if (idx > 0) {
      const k = line.slice(0, idx).trim();
      const v = line.slice(idx + 1).trim();
      data[k] = v;
    }
  });

  return { data };
}

export default function Projects() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("/content/projects/index.json")
      .then((r) => r.json())
      .then(async (list) => {
        const loaded = [];
        for (const path of list) {
          const md = await fetch(path).then((r) => r.text());
          const fm = parseFrontmatter(md);
          loaded.push({ ...fm.data });
        }
        setItems(loaded);
      })
      .catch(() => {});
  }, []);

  return (
    <main className="container">
      {/* Header */}
      <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 16 }}>
        <BackButton />
        <h1 style={{ margin: 0 }}>Projects</h1>
      </div>

      <p className="sub">Selected projects and build experience.</p>

      {/* Reveal animation */}
      <section className="grid reveal">
        {items.length === 0 ? (
          <div className="card">
            <p className="sub" style={{ margin: 0 }}>
              No projects loaded yet. Add items via Admin and update index.json.
            </p>
          </div>
        ) : (
          items.map((p, i) => (
            <div className="card half" key={i}>
              <h2 style={{ marginTop: 0 }}>{p.title}</h2>

              <p className="sub" style={{ marginTop: 0 }}>
                {p.location ? p.location : ""}
                {p.date ? ` • ${String(p.date).slice(0, 10)}` : ""}
              </p>

              {p.coverImage ? (
                <img
                  src={p.coverImage}
                  alt={p.title || "Project image"}
                  style={{
                    width: "100%",
                    borderRadius: 14,
                    border: "1px solid rgba(255,255,255,0.10)",
                    marginTop: 10,
                    marginBottom: 10,
                    objectFit: "cover",
                  }}
                  loading="lazy"
                />
              ) : null}

              {p.summary ? (
                <p className="sub" style={{ marginTop: 0 }}>
                  {p.summary}
                </p>
              ) : (
                <p className="sub" style={{ marginTop: 0 }}>
                  Add a short summary for this project in Admin to display it here.
                </p>
              )}
            </div>
          ))
        )}
      </section>
    </main>
  );
}
