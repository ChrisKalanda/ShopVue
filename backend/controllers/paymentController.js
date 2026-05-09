import Stripe from 'stripe';

function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) throw new Error('STRIPE_SECRET_KEY manquant dans .env');
  return new Stripe(process.env.STRIPE_SECRET_KEY);
}

async function getPaypalAccessToken() {
  if (!process.env.PAYPAL_CLIENT_ID || !process.env.PAYPAL_CLIENT_SECRET) {
    throw new Error('PAYPAL_CLIENT_ID ou PAYPAL_CLIENT_SECRET manquant dans .env');
  }
  const auth = Buffer.from(
    `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
  ).toString('base64');

  const res = await fetch('https://api-m.sandbox.paypal.com/v1/oauth2/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials'
  });

  const data = await res.json();
  if (!data.access_token) throw new Error('Impossible d\'obtenir le token PayPal.');
  return data.access_token;
}

// POST /api/payments/stripe/create-intent
export async function createStripeIntent(req, res) {
  try {
    const { amount } = req.body;
    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({ message: 'Montant invalide.' });
    }

    const stripe = getStripe();
    const intent = await stripe.paymentIntents.create({
      amount: Math.round(Number(amount) * 100),
      currency: 'cad',
      automatic_payment_methods: { enabled: true }
    });

    return res.json({ clientSecret: intent.client_secret });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

// POST /api/payments/paypal/create-order
export async function createPaypalOrder(req, res) {
  try {
    const { amount } = req.body;
    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({ message: 'Montant invalide.' });
    }

    const token = await getPaypalAccessToken();
    const r = await fetch('https://api-m.sandbox.paypal.com/v2/checkout/orders', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'CAD',
              value: Number(amount).toFixed(2)
            }
          }
        ]
      })
    });

    const order = await r.json();
    if (!order.id) {
      return res.status(500).json({ message: 'Erreur création commande PayPal.', detail: order });
    }
    return res.json({ id: order.id });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

// POST /api/payments/paypal/capture/:orderId
export async function capturePaypalOrder(req, res) {
  try {
    const { orderId } = req.params;
    const token = await getPaypalAccessToken();

    const r = await fetch(
      `https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderId}/capture`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const data = await r.json();
    if (data.status !== 'COMPLETED') {
      return res.status(400).json({ message: 'Paiement PayPal non complété.', detail: data });
    }

    return res.json({ status: data.status, orderId: data.id });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}
