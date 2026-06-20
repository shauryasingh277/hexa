import { useEffect, useState } from 'react'
import products from '../content/products.json'

function formatPrice(c){return '$'+(c/100).toFixed(2)}

export default function Cart(){
  const [cart, setCart] = useState({})
  const [items, setItems] = useState([])

  useEffect(()=>{ const c = JSON.parse(localStorage.getItem('hx_cart')||'{}'); setCart(c); const ids = Object.keys(c); setItems(ids.map(id=>({ ...products.find(p=>p.id===id), qty: c[id].qty }))) }, [])

  function update(id, qty){ const c = JSON.parse(localStorage.getItem('hx_cart')||'{}'); if(qty<=0) delete c[id]; else c[id].qty = qty; localStorage.setItem('hx_cart', JSON.stringify(c)); setCart(c); setItems(Object.keys(c).map(id=>({ ...products.find(p=>p.id===id), qty: c[id].qty }))) }

  async function checkout(){ if(items.length===0){ alert('Cart is empty'); return }
    // Call API to create Stripe session
    const res = await fetch('/api/checkout', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ items: items.map(i=>({ id: i.id, quantity: i.qty })) }) });
    if(res.ok){ const data = await res.json(); window.location = data.url } else { const err = await res.text(); alert('Checkout error: '+err) }
  }

  const subtotal = items.reduce((s,i)=>s + i.price_cents * i.qty, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="text-2xl font-bold text-indigo-600">HexaShop</a>
          <a href="/">Continue shopping</a>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold mb-6">Shopping Cart</h1>
        <div>
          {items.length===0 && <p className="text-gray-600">Your cart is empty.</p>}
          <div className="space-y-4">
            {items.map(i=> (
              <div key={i.id} className="bg-white p-4 rounded-md flex items-center gap-4">
                <img src={i.image} className="w-20 h-20 object-cover rounded" alt="" />
                <div className="flex-1">
                  <div className="font-semibold">{i.name}</div>
                  <div className="text-sm text-gray-600">{formatPrice(i.price_cents)}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-2 py-1 bg-gray-100 rounded" onClick={()=>update(i.id, i.qty-1)}>-</button>
                  <span className="w-6 text-center">{i.qty}</span>
                  <button className="px-2 py-1 bg-gray-100 rounded" onClick={()=>update(i.id, i.qty+1)}>+</button>
                </div>
                <div className="w-24 text-right font-semibold">{formatPrice(i.price_cents * i.qty)}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-end">
            <div className="text-right">
              <div className="text-lg font-semibold">Subtotal: {formatPrice(subtotal)}</div>
              <button onClick={checkout} className="mt-3 bg-indigo-600 text-white px-4 py-2 rounded">Checkout</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
