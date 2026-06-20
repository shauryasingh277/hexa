// Main frontend logic for Hexa Shop
(function(){
  function $(s){return document.querySelector(s)}
  function $all(s){return Array.from(document.querySelectorAll(s))}
  function formatPrice(cents){return '$'+(cents/100).toFixed(2)}

  function renderBanner(){if(!window.BANNER) return; $('#hero-title').textContent = window.BANNER.title || $('#hero-title').textContent; $('#hero-subtitle').textContent = window.BANNER.subtitle || $('#hero-subtitle').textContent; $('#hero-image').src = window.BANNER.image || $('#hero-image').src; $('#hero-cta').textContent = (window.BANNER.cta && window.BANNER.cta.text) || $('#hero-cta').textContent; $('#hero-cta').href = (window.BANNER.cta && window.BANNER.cta.href) || '#'; }

  function renderProducts(filter){ const grid=$('#product-grid'); grid.innerHTML=''; const items=window.ITEMS.filter(p=>!filter || p.name.toLowerCase().includes(filter.toLowerCase()) || p.category.toLowerCase().includes(filter.toLowerCase())); $('#product-count').textContent = items.length; items.forEach(p=>{const card=document.createElement('article'); card.className='bg-white rounded-md overflow-hidden shadow-sm'; card.innerHTML = `
      <img src="${p.image}" alt="${p.name}" class="w-full h-48 object-cover product-image">
      <div class="p-4">
        <h3 class="font-semibold">${p.name}</h3>
        <p class="text-sm text-gray-600">${p.description || ''}</p>
        <div class="mt-3 flex items-center justify-between">
          <div class="font-semibold">${formatPrice(p.price_cents)}</div>
          <button data-id="${p.id}" class="add-to-cart bg-indigo-600 text-white px-3 py-1 rounded text-sm">Add</button>
        </div>
      </div>
    `; grid.appendChild(card);
  });

    $all('.add-to-cart').forEach(btn=>btn.addEventListener('click',e=>{const id=e.currentTarget.dataset.id; addToCart(id); }));
  }

  function addToCart(id){ const cart = JSON.parse(localStorage.getItem('hx_cart')||'{}'); if(!cart[id]) cart[id]={qty:0}; cart[id].qty++; localStorage.setItem('hx_cart', JSON.stringify(cart)); updateCartCount(); }
  function updateCartCount(){ const cart = JSON.parse(localStorage.getItem('hx_cart')||'{}'); let n=0; Object.values(cart).forEach(i=>n+=i.qty); $all('#cart-count').forEach(el=>el.textContent = n); }

  // Search suggestions
  function setupSearch(){ const search = $('#search'); const sug = $('#suggestions'); if(!search) return; search.addEventListener('input', e=>{ const q=e.target.value.trim(); if(!q){sug.classList.add('hidden'); return} const matches = window.ITEMS.filter(p=>p.name.toLowerCase().includes(q.toLowerCase())).slice(0,6); if(matches.length===0){sug.innerHTML='<div class="p-2 text-sm text-gray-600">No results</div>'; sug.classList.remove('hidden'); return} sug.innerHTML = matches.map(m=>`<a href="#" data-id="${m.id}" class="block px-3 py-2 hover:bg-gray-50">${m.name} <span class="text-xs text-gray-500">${formatPrice(m.price_cents)}</span></a>`).join(''); sug.classList.remove('hidden'); Array.from(sug.querySelectorAll('a')).forEach(a=>a.addEventListener('click',ev=>{ev.preventDefault(); search.value = a.textContent.trim(); sug.classList.add('hidden'); renderProducts(a.textContent.trim()); })); });
    document.addEventListener('click', e=>{ if(!e.target.closest('#suggestions') && !e.target.closest('#search')) $('#suggestions').classList.add('hidden'); });
  }

  // Mobile menu
  function setupMobile(){ const btn = $('#mobile-menu-button'); const menu = $('#mobile-menu'); if(!btn) return; btn.addEventListener('click',()=>{ menu.classList.toggle('hidden'); }); }

  // Initialize
  document.addEventListener('DOMContentLoaded', ()=>{
    // Update footer year
    document.getElementById('year').textContent = new Date().getFullYear();
    renderBanner(); renderProducts(); setupSearch(); setupMobile(); updateCartCount();
  });

})();
