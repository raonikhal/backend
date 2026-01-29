const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = async (req, res) => {
  try {
    const { cartItems } = req.body;

    if (!cartItems) {
      return res.status(400).json({ error: "Invalid cart data" });
    }

    const lineItems = cartItems.map(item => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [item.image],
        },
        unit_amount: Number(item.price) * 100,
      },
      quantity: item.quantity || 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",
    });

    res.json({ url: session.url });

  } catch (error) {
    console.error("Stripe checkout error:", error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = createCheckoutSession;


