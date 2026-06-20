import { useEffect, useState } from 'react'
import products from '../content/products.json'

export default function Account(){
  const [orders, setOrders] = useState([])
  const [user, setUser] = useState(null)

  useEffect(()=>{ setOrders(JSON.parse(localStorage.getItem('hx_orders')||'[]')); setUser(JSON.parse(localStorage.getItem('hx_user')||'null')) }, [])

  function signup(e){ e.preventDefault(); const name=e.target.name.value; const email=e.target.email.value; const pw=e.target.password.value; const users=JSON.parse(localStorage.getItem('hx_users')||'[]'); users.push({id:Date.now(),name,email,password:pw}); localStorage.setItem('hx_users', JSON.stringify(users)); localStorage.setItem('hx_user', JSON.stringify({name,email})); setUser({name,email}); alert('Account created')} 
  function login(e){ e.preventDefault(); const email=e.target.email.value; const pw=e.target.password.value; const users=JSON.parse(localStorage.getItem('hx_users')||'[]'); const u=users.find(x=>x.email===email && x.password===pw); if(u){ localStorage.setItem('hx_user', JSON.stringify({name:u.name,email:u.email})); setUser({name:u.name,email:u.email}); alert('Logged in') } else alert('Invalid credentials') }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="text-2xl font-bold text-indigo-600">HexaShop</a>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold mb-6">Account</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section className="bg-white p-6 rounded-md">
            <h2 className="font-semibold mb-4">Login</h2>
            <form onSubmit={login} className="space-y-3">
              <input name="email" placeholder="Email" className="w-full border px-3 py-2 rounded" required />
              <input name="password" type="password" placeholder="Password" className="w-full border px-3 py-2 rounded" required />
              <button className="bg-indigo-600 text-white px-4 py-2 rounded">Login</button>
            </form>
          </section>

          <section className="bg-white p-6 rounded-md">
            <h2 className="font-semibold mb-4">Sign up</h2>
            <form onSubmit={signup} className="space-y-3">
              <input name="name" placeholder="Full name" className="w-full border px-3 py-2 rounded" required />
              <input name="email" placeholder="Email" className="w-full border px-3 py-2 rounded" required />
              <input name="password" type="password" placeholder="Password" className="w-full border px-3 py-2 rounded" required />
              <button className="bg-green-600 text-white px-4 py-2 rounded">Create account</button>
            </form>
          </section>
        </div>

        <section className="mt-8 bg-white p-6 rounded-md">
          <h2 className="font-semibold mb-4">Order history</h2>
          <div>
            {orders.length===0 && <p className="text-gray-600">No orders yet.</p>}
            {orders.slice().reverse().map(o=> (
              <div key={o.id} className="border-b py-3">
                <div className="flex justify-between"><div className="font-semibold">Order {o.id}</div><div className="text-sm text-gray-600">{new Date(o.created_at).toLocaleString()}</div></div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
