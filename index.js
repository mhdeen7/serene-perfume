// ══════════════════════════════════
// SERENE PERFUME — index.js
// All JavaScript for all pages
// ══════════════════════════════════

// ── HEADER SCROLL ──
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (header) header.classList.toggle('scrolled', window.scrollY > 50);
});

// ══════════════════════════════════
// CART
// ══════════════════════════════════
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
  const total = cart.reduce((sum, i) => sum + i.quantity, 0);
  document.querySelectorAll('.cart-count').forEach(el => el.textContent = total);
}


updateCartCount();

const contactForm = document.getElementById('contact-form');
 
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
 
    const btn = contactForm.querySelector('.form-submit');
    const success = document.getElementById('form-success');
 
    // Show loading state
    btn.textContent = 'Sending...';
    btn.disabled = true;
 
    // Simulate sending (replace this with a real API call if needed)
    setTimeout(() => {
      contactForm.reset();
      btn.innerHTML = 'Send Message <i class="fa-solid fa-arrow-right"></i>';
      btn.disabled = false;
 
      // Show success message
      success.classList.add('show');
 
      // Hide it after 5 seconds
      setTimeout(() => success.classList.remove('show'), 5000);
    }, 1200);
  });
}
 
const products = [

  
  // MEN'S PERFUMES
 
  {
    id: "oud-mood",
    name: "Oud Mood",
    brand: "oud mood",
    gender: "men",
    price: 3500,
    image: "images/OUD.MOUD.jpg",
    images: ["images/OUD.MOUD.jpg"],
    description: "A rich oriental fragrance with deep oud notes, warm amber, and a hint of musk. Long-lasting and bold — perfect for evening wear."
  },
  {
    id: "ramz-gold",
    name: "Valentino",
    brand: "Valentino",
    gender: "men",
    price: 4000,
    image: "images/valentino.jpeg",
    images: ["images/valentino.jpeg"],
    description: "A luxurious sweet and woody fragrance layered with vanilla, sandalwood, and precious oud. Warm and unforgettable."
  },
  {
    id: "oud-for-glory",
    name: "SAUVAGE",
    brand: "SAUVAGE",
    gender: "men",
    price: 3800,
    image: "images/Sauvage.jpeg",
    images: ["images/Sauvage.jpeg"],
    description: "Majestic and powerful. Dark oud blended with rose and spices — a scent that commands attention."
  },
  {
    id: "rasasi-hawas",
    name: "YOU",
    brand: "YOU",
    gender: "men",
    price: 3600,
    image: "images/YOU.jpeg",
    images: ["images/YOU.jpeg"],
    description: "An aquatic woody fragrance blending sea salt, cardamom, and cedarwood into something truly refreshing."
  },
  {
    id: "rasasi-dhan",
    name: "SUPREMACY",
    brand: "SUPREMACY",
    gender: "men",
    price: 4200,
    image: "images/supremacy.jpeg",
    images: ["images/supremacy.jpeg"],
    description: "Pure oud oil crafted for those who appreciate the finest oriental tradition. Rich, raw, and timeless."
  },
  {
    id: "armaf-club6",
    name: "Club de Nuit",
    brand: "armaf",
    gender: "men",
    price: 2800,
    image: "images/club de nuit.jpeg",
    images: ["images/club de nuit.jpeg"],
    description: "A fresh and intense fragrance. Bergamot, apple, and blackcurrant open into a deep woody heart."
  },
   

  // ─────────────────
  // LADIES' PERFUMES
  // ─────────────────
  {
    id: "ajmal-wisal",
    name: "Wisal",
    brand: "ajmal",
    gender: "ladies",
    price: 3300,
    image: "images/OUD.MOUD.jpg",
    images: ["images/OUD.MOUD.jpg"],
    description: "A tender floral bouquet of rose, jasmine, and lily, softened with musk and sandalwood. Gentle and romantic."
  },
  {
    id: "ajmal-amber",
    name: "Amber Wood",
    brand: "ajmal",
    gender: "ladies",
    price: 3700,
    image: "images/OUD.MOUD.jpg",
    images: ["images/OUD.MOUD.jpg"],
    description: "Warm amber and smoky woods create a deeply sensual fragrance that feels like a cozy evening by the fire."
  },
  {
    id: "ajmal-blu",
    name: "Blu Femme",
    brand: "ajmal",
    gender: "ladies",
    price: 3000,
    image: "images/OUD.MOUD.jpg",
    images: ["images/OUD.MOUD.jpg"],
    description: "A light, airy feminine fragrance. Fresh aquatic notes blended with white flowers and soft musks."
  },
  {
    id: "rasasi-nine",
    name: "Nine Fine",
    brand: "rasasi",
    gender: "ladies",
    price: 3200,
    image: "images/OUD.MOUD.jpg",
    images: ["images/OUD.MOUD.jpg"],
    description: "A sophisticated blend of citrus, floral, and woody notes. Fresh and elegant for any occasion."
  },
  {
    id: "armaf-sillage",
    name: "Sillage d'Armaf",
    brand: "armaf",
    gender: "ladies",
    price: 3100,
    image: "images/OUD.MOUD.jpg",
    images: ["images/OUD.MOUD.jpg"],
    description: "Elegant floral meets warm amber. A romantic scent that lingers beautifully throughout the day."
  },
  {
    id: "lattafa-bloom",
    name: "Soft Bloom",
    brand: "lattafa",
    gender: "ladies",
    price: 2900,
    image: "images/OUD.MOUD.jpg",
    images: ["images/OUD.MOUD.jpg"],
    description: "A delicate blend of peony, rose, and soft musks. Light and feminine — perfect for everyday wear."
  }

];

// ══════════════════════════════════
// MEN.HTML & LADIES.HTML LOGIC
// Detects which page it's on by
// checking the product-grid element
// ══════════════════════════════════
const productGrid = document.getElementById('product-grid');

if (productGrid) {

  // Detect gender from the page URL
  const isMen = window.location.pathname.includes('men.html');
  const isLadies = window.location.pathname.includes('ladies.html');
  const currentGender = isMen ? 'men' : isLadies ? 'ladies' : null;

  if (currentGender) {

    let panelQty = 1;

    // ── BUILD BRAND FILTER TABS ──
    function buildFilterTabs() {
      const tabContainer = document.getElementById('filter-tabs');
      tabContainer.innerHTML = '';

      const brands = ['all', ...new Set(
        products.filter(p => p.gender === currentGender).map(p => p.brand)
      )];

      brands.forEach(brand => {
        const btn = document.createElement('button');
        btn.className = 'filter-tab' + (brand === 'all' ? ' active' : '');
        btn.textContent = brand === 'all' ? 'All' : brand.charAt(0).toUpperCase() + brand.slice(1);
        btn.onclick = () => {
          document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
          btn.classList.add('active');
          renderGrid(brand);
        };
        tabContainer.appendChild(btn);
      });
    }

    // ── RENDER PRODUCT GRID ──
    function renderGrid(brand = 'all') {
      productGrid.innerHTML = '';
      let list = products.filter(p => p.gender === currentGender);
      if (brand !== 'all') list = list.filter(p => p.brand === brand);

      list.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
          <img src="${product.image}" alt="${product.name}"
            onerror="this.src='https://placehold.co/300x210/f4f4f4/999?text=${encodeURIComponent(product.name)}'">
          <div class="card-body">
            <p class="brand-tag">${product.brand}</p>
            <h3>${product.name}</h3>
            <p class="card-price">KES ${product.price.toLocaleString()}</p>
            <button class="quick-add" onclick="event.stopPropagation(); quickAdd('${product.id}')">🛒 Add</button>
          </div>
        `;
        card.addEventListener('click', () => openPanel(product.id));
        productGrid.appendChild(card);
      });
    }

    // ── OPEN SLIDE PANEL ──
    function openPanel(id) {
      const product = products.find(p => p.id === id);
      if (!product) return;

      panelQty = 1;
      document.getElementById('panel-qty').textContent = 1;
      document.getElementById('panel-brand').textContent = product.brand.toUpperCase();
      document.getElementById('panel-name').textContent = product.name;
      document.getElementById('panel-price').textContent = 'KES ' + product.price.toLocaleString();
      document.getElementById('panel-desc').textContent = product.description;

      const mainImg = document.getElementById('panel-main-img');
      mainImg.src = product.images[0];
      mainImg.onerror = () => {
        mainImg.src = `https://placehold.co/400x260/f4f4f4/999?text=${encodeURIComponent(product.name)}`;
      };

      const thumbRow = document.getElementById('panel-thumbnails');
      thumbRow.innerHTML = '';
      product.images.forEach((img, i) => {
        const thumb = document.createElement('img');
        thumb.src = img;
        if (i === 0) thumb.classList.add('selected');
        thumb.onerror = () => { thumb.src = 'https://placehold.co/60x60/f4f4f4/999?text=img'; };
        thumb.addEventListener('click', () => {
          mainImg.src = img;
          thumbRow.querySelectorAll('img').forEach(t => t.classList.remove('selected'));
          thumb.classList.add('selected');
        });
        thumbRow.appendChild(thumb);
      });

      document.getElementById('panel-cart-btn').onclick = () => addToCart(product);

      // Related: same brand + same gender
      const relatedList = document.getElementById('related-list');
      relatedList.innerHTML = '';
      const related = products.filter(p =>
        p.brand === product.brand && p.id !== product.id && p.gender === product.gender
      );

      if (related.length === 0) {
        relatedList.innerHTML = '<p style="color:#999;font-size:13px;">No other products from this brand yet.</p>';
      } else {
        related.forEach(rel => {
          const item = document.createElement('div');
          item.className = 'related-item';
          item.innerHTML = `
            <img src="${rel.image}" alt="${rel.name}"
              onerror="this.src='https://placehold.co/80x80/f4f4f4/999?text=img'">
            <p>${rel.name}</p>
            <p class="rel-price">KES ${rel.price.toLocaleString()}</p>
          `;
          item.addEventListener('click', () => openPanel(rel.id));
          relatedList.appendChild(item);
        });
      }

      document.getElementById('slide-panel').classList.add('active');
      document.getElementById('overlay').classList.add('active');
      document.body.style.overflow = 'hidden';
      document.getElementById('slide-panel').scrollTop = 0;
    }

    // ── CLOSE PANEL ──
    window.closePanel = function() {
      document.getElementById('slide-panel').classList.remove('active');
      document.getElementById('overlay').classList.remove('active');
      document.body.style.overflow = '';
    };

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') window.closePanel();
    });

    // ── QUANTITY ──
    window.changeQty = function(amount) {
      panelQty = Math.max(1, panelQty + amount);
      document.getElementById('panel-qty').textContent = panelQty;
    };

    // ── ADD TO CART (panel) ──
    function addToCart(product) {
      const existing = cart.find(i => i.id === product.id);
      if (existing) {
        existing.quantity += panelQty;
      } else {
        cart.push({ id: product.id, name: product.name, price: product.price, quantity: panelQty });
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartCount();
      showToast('✓ ' + product.name + ' added to cart');
    }

    // ── QUICK ADD (card button) ──
    window.quickAdd = function(id) {
      const product = products.find(p => p.id === id);
      if (!product) return;
      const existing = cart.find(i => i.id === id);
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({ id: product.id, name: product.name, price: product.price, quantity: 1 });
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartCount();
      showToast('✓ ' + product.name + ' added to cart');
    };

    // ── TOAST ──
    function showToast(message) {
      const toast = document.getElementById('toast');
      toast.textContent = message;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2500);
    }

    // ── INIT ──
    buildFilterTabs();
    renderGrid();
  }
}






