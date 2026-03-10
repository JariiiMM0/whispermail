import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { recipientEmail, message, subject } = req.body;
  if (!recipientEmail || !message) return res.status(400).json({ error: 'Missing fields' });
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [{ price_data: { currency: 'eur', unit_amount: 100, product_data: { name: 'Anonyymi viesti' } }, quantity: 1 }],
      metadata: { recipientEmail, message: message.substring(0,500), messageExtra: message.length>500?message.substring(500,1500):'', subject: subject||'Sinulle on anonyymi viesti' },
      success_url: process.env.NEXT_PUBLIC_BASE_URL + '/success',
      cancel_url: process.env.NEXT_PUBLIC_BASE_URL + '/',
    });
    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Stripe error' });
  }
}