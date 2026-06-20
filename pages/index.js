import Link from 'next/link'
import products from '../content/products.json'

export default function Home(){
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between h-16">
            <div className="flex items-center gap-6">
              <Link href="/" className="text-2xl font-bold text-indigo-600">Hexa<span className="text-gray-600">Shop</span></Link>
              <ul className="hidden md:flex items-center gap-4 text-sm">
                <li><Link href="/">Home</Link></li>
                <li><a>Men</a></li>
                <li><a>Women</a></li>
                <li><a>Kids</a></li>
                <li><a>Accessories</a></li>
              </ul>
            </div>
            <div className="flex items-center gap-4">
              <input id="search" placeholder="Search products..." className="hidden sm:inline-block w-64 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300" />
              <Link href="/cart" className="flex items-center gap-2 border px-3 py-2 rounded-md hover:bg-gray-100">🛒 <span id="cart-count" className="text-sm">0</span></Link>
              <Link href="/account" className="px-3 py-2 rounded-md border hover:bg-gray-100">Account</Link>
            </div>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="rounded-lg overflow-hidden bg-gradient-to-r from-indigo-600 to-indigo-400 text-white mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center">
            <div className="p-8">
              <h1 className="text-3xl sm:text-4xl font-extrabold">Summer Sale — Up to 40% Off</h1>
              <p className="mt-3 text-lg opacity-90">Refresh your wardrobe with select styles — limited time only.</p>
              <div className="mt-6">
                <Link href="/" className="inline-block bg-white text-indigo-600 font-semibold px-5 py-3 rounded-md shadow">Shop Now</Link>
              </div>
            </div>
            <div className="p-4">
              <img src={"/hero.jpg"} alt="Promotion" className="w-full h-64 object-cover" />
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Featured Products</h2>
            <div className="text-sm text-gray-600">Showing {products.length} items</div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(p=> (
              <article key={p.id} className="bg-white rounded-md overflow-hidden shadow-sm">
                <img src={p.image} alt={p.name} className="w-full h-48 object-cover product-image" />
                <div className="p-4">
                  <h3 className="font-semibold">{p.name}</h3>
                  <p className="text-sm text-gray-600">{p.description}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="font-semibold">${(p.price_cents/100).toFixed(2)}</div>
                    <div className="flex gap-2">
                      <button data-id={p.id} className="add-to-cart bg-indigo-600 text-white px-3 py-1 rounded text-sm">Add</button>
                      <Link href={`/product/${p.id}`} className="px-3 py-1 border rounded text-sm">View</Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-sm text-gray-600">
          <div className="flex flex-col md:flex-row md:justify-between gap-4">
            <div>© {new Date().getFullYear()} Hexa Shop. All rights reserved.</div>
            <div className="space-x-4">
              <a>Privacy</a>
              <a>Terms</a>
              <a>Contact</a>
            </div>
          </div>
        </div>
      </footer>

      <script dangerouslySetInnerHTML={{ __html: `
        (function(){
          function updateCartCount(){const c=JSON.parse(localStorage.getItem('hx_cart')||'{}'); let n=0; Object.values(c).forEach(i=>n+=i.qty); document.querySelectorAll('#cart-count').forEach(el=>el.textContent=n)}
          function setupAdd(){document.querySelectorAll('.add-to-cart').forEach(b=>b.addEventListener('click',e=>{const id=e.currentTarget.dataset.id; const cart=JSON.parse(localStorage.getItem('hx_cart')||'{}'); if(!cart[id]) cart[id]={qty:0}; cart[id].qty++; localStorage.setItem('hx_cart', JSON.stringify(cart)); updateCartCount();}))}
          document.addEventListener('DOMContentLoaded',()=>{updateCartCount(); setupAdd();});
        })();
      `}} />
    </div>
  )
}
