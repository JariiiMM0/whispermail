import Stripe from 'stripe';
import { Resend } from 'resend';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);
export const config = { api: { bodyParser: false } };
async function getRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', c => chunks.push(c));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const rawBody = await getRawBody(req);
  const sig = req.headers['stripe-signature'];
  let event;
  try { event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET); }
  catch (err) { return res.status(400).send('Webhook Error: ' + err.message); }
  if (event.type === 'checkout.session.completed') {
    const { recipientEmail, message, messageExtra, subject } = event.data.object.metadata;
    const full = message + (messageExtra || '');
    try {
      await resend.emails.send({
        from: 'WhisperMail <onboarding@resend.dev>',
        to: recipientEmail,
        subject: subject || 'Sinulle on anonyymi viesti',
        html: '<div style="background:#080a0f;padding:40px 20px;font-family:monospace"><h2 style="color:#c9a96e;margin-bottom:24px">WhisperMail</h2><div style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);padding:28px;color:#e8e0d4;font-size:15px;line-height:1.9;white-space:pre-wrap">' + full.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;') + '</div><p style="color:rgba(255,255,255,.18);font-size:11px;margin-top:20px;letter-spacing:1px">Viesti lahetettiin anonyymisti WhisperMailin kautta.</p></div>',
      });
    } catch(e) { console.error('Email error:', e); }
  }
  res.status(200).json({ received: true });
}