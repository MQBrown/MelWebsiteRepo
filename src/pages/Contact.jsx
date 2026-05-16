
import React from "react";

export default function Contact({ settings }) {
  const s = settings || {};

  return (
    <main className="container">

      <section className="hero section contact-layout">

        {/* LEFT: FORM */}
        <div className="contact-left">
          <h2>Send a message</h2>

          <input className="input" placeholder="Name" />
          <input className="input" placeholder="Email" />
          <input className="input" placeholder="Phone (optional)" />

          <textarea
            className="input"
            rows="4"
            placeholder="Message"
          />

          <button className="btn">Submit</button>
        </div>

        {/* RIGHT: INFO */}
        <div className="contact-right">
          <h3>What to include</h3>

          <ul>
            <li>Project address (or general area)</li>
            <li>Type of work (new build, remodel, additions)</li>
            <li>Target timeline</li>
            <li>Any plans or inspiration links</li>
          </ul>

          <p className="sub">
            We'll respond with next steps and a quick call if needed.
          </p>
        </div>

      </section>

    </main>
  );
}
