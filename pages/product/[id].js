import products from '../../content/products.json'
import Link from 'next/link'

export async function getStaticPaths(){
  const paths = products.map(p=>({ params: { id: p.id } }));
  return { paths, fallback: false }
}

export async function getStaticProps({ params }){
  const product = products.find(p=>p.id === params.id)
  return { props: { product } }
}

export default function ProductPage({ product }){
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-indigo-600">HexaShop</Link>
          <Link href="/cart" className="text-sm">Cart</Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 rounded-md shadow-sm">
          <img src={product.image} alt={product.name} className="w-full h-96 object-cover rounded" />
          <div>
            <h1 className="text-2xl font-semibold">{product.name}</h1>
            <p className="text-gray-600 mt-2">{product.description}</p>
            <div className="mt-4 text-xl font-bold">${(product.price_cents/100).toFixed(2)}</div>
            <div className="mt-6 flex gap-3">
              <button id="add" className="bg-indigo-600 text-white px-4 py-2 rounded">Add to cart</button>
              <Link href="/cart" className="px-4 py-2 border rounded">View cart</Link>
            </div>
          </div>
        </div>
      </main>

      <script dangerouslySetInnerHTML={{ __html: `
        document.addEventListener('DOMContentLoaded',()=>{ document.getElementById('add').addEventListener('click',()=>{ const id='${product.id}'; const cart=JSON.parse(localStorage.getItem('hx_cart')||'{}'); if(!cart[id]) cart[id]={qty:0}; cart[id].qty++; localStorage.setItem('hx_cart', JSON.stringify(cart)); alert('Added to cart'); }); });
      `}} />
    </div>
  )
}
