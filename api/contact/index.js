// Azure Static Web Apps Managed Function (HTTP only)
// POST /api/contact
// Optional: forward message via SendGrid (recommended) or store in a DB.

export default async function (context, req) {
  try {
    const { name, email, phone, message } = req.body || {}
    if (!name || !email || !message) {
      context.res = { status: 400, body: { ok: false, error: 'Missing required fields' } }
      return
    }

    // If SENDGRID_API_KEY and CONTACT_TO_EMAIL are configured, send an email.
    const apiKey = process.env.SENDGRID_API_KEY
    const to = process.env.CONTACT_TO_EMAIL
    const from = process.env.CONTACT_FROM_EMAIL || to

    if (apiKey && to && from) {
      const payload = {
        personalizations: [{ to: [{ email: to }] }],
        from: { email: from },
        subject: `New website inquiry from ${name}`,
        content: [{
          type: 'text/plain',
          value: `Name: ${name}
Email: ${email}
Phone: ${phone || ''}

Message:
${message}`
        }]
      }

      const resp = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      if (!resp.ok) {
        const text = await resp.text().catch(()=> '')
        context.log('SendGrid error:', resp.status, text)
      }
    }

    // Always return ok to the client (avoid exposing email provider details)
    context.res = { status: 200, body: { ok: true } }
  } catch (e) {
    context.log('Contact form error', e)
    context.res = { status: 500, body: { ok: false } }
  }
}
