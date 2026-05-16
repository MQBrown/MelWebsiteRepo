import React, { useState } from "react";
import BackButton from "../components/BackButton";

export default function Contact({ settings }) {
  const s = settings || {};
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState(null);
  const [busy, setBusy] = useState(false);

  const onChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setStatus(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("Thanks! We received your message and will follow up.");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      setStatus("Sorry — something went wrong. Please email or call us directly.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="container">
      <div style={{ marginBottom: 16 }}>
        <BackButton /> {/* should say Home and navigate("/") */}
      </div>

      <h1 style={{ marginTop: 0 }}>Contact</h1>
      <p className="sub">
        Phone: <strong>{s.phone || "(770) 899-7775"}</strong> &nbsp;•&nbsp; Email:{" "}
        <strong>{s.email || "mqbrown07@gmail.com"}</strong>
      </p>

      <section className="section contact-layout">
        {/* LEFT: FORM */}
        <div className="contact-left">
          <h2 style={{ marginTop: 0 }}>Send a message</h2>

          <form onSubmit={submit} className="contact-form">
            <div>
              <label>Name</label>
              <input className="input" name="name" value={form.name} onChange={onChange} required />
            </div>

            <div>
              <label>Email</label>
              <input
                className="input"
                name="email"
                type="email"
                value={form.email}
                onChange={onChange}
                required
              />
            </div>

            <div>
              <label>Phone (optional)</label>
              <input className="input" name="phone" value={form.phone} onChange={onChange} />
            </div>

            <div>
              <label>Message</label>
              <textarea
                className="input"
                name="message"
                rows="5"
                value={form.message}
                onChange={onChange}
                required
              />
            </div>

            <button className="btn" disabled={busy}>
              {busy ? "Sending…" : "Submit"}
            </button>

            {status ? <p className="sub" style={{ marginTop: 12 }}>{status}</p> : null}
          </form>
        </div>

        {/* RIGHT: INFO */}
        <div className="contact-right">
          <h2 style={{ marginTop: 0 }}>What to include</h2>
          <ul className="contact-list">
            <li>Project address (or general area)</li>
            <li>Type of work (new build, remodel, additions)</li>
            <li>Target timeline</li>
            <li>Any plans or inspiration links</li>
          </ul>
          <p className="sub">We'll respond with next steps and a quick call if needed.</p>
        </div>
      </section>
    </main>
  );
}
