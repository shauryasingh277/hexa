import Stripe from 'stripe'

export default async function handler(req,res){
  if(req.method !== 'POST') return res.status(405).end('Method Not Allowed')
  const stripeSecret = process.env.STRIPE_SECRET_KEY
  if(!stripeSecret) return res.status(500).send('Stripe secret key not configured')
  const stripe = new Stripe(stripeSecret)
  try{
    const { items } = req.body
    // Build line items using product info
    const all = (await import('../../content/products.json')).default || (await import('../../content/products.json'))
    const line_items = items.map(i=>{
      const prod = all.find(p=>p.id===i.id)
      return { price_data: { currency: 'usd', product_data: { name: prod.name }, unit_amount: prod.price_cents }, quantity: i.quantity }
    })
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${process.env.BASE_URL || 'http://localhost:3000'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.BASE_URL || 'http://localhost:3000'}/cart`
    })
    res.json({ url: session.url })
  }catch(err){ console.error(err); res.status(500).send(err.message||String(err)) }
}
