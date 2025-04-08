// סל הקניות עם מעקב כמויות ותצוגת פריטים בסל עם אפשרות מחיקה
const cartCount = document.querySelector('.cart-count');
const cartSidebar = document.getElementById('cartSidebar');
const closeCartBtn = document.getElementById('closeCart');
const cartBtn = document.getElementById('cart-button');
const cartItemsContainer = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');

let cart = {}; // מבנה: { id: { name, price, image, quantity } }

// פתיחת וסגירת הסל
cartBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  cartSidebar.classList.add('open');
});

closeCartBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  cartSidebar.classList.remove('open');
});

// מניעת סגירת הסל בלחיצה בתוך הסל
cartSidebar.addEventListener('click', (e) => {
  e.stopPropagation();
});

// סגירה רק בלחיצה מחוץ לסל ולכפתור
window.addEventListener('click', (e) => {
  const isClickInside = cartSidebar.contains(e.target) || cartBtn.contains(e.target);
  if (!isClickInside) {
    cartSidebar.classList.remove('open');
  }
});

// הוספת פריט לסל או שינוי כמות
function addToCart(id, name, price, image) {
  if (cart[id]) {
    cart[id].quantity++;
  } else {
    cart[id] = { name, price, image, quantity: 1 };
  }
  updateCartUI();
}

// עדכון תצוגת הסל
function updateCartUI() {
  let total = 0;
  let html = '';
  for (const id in cart) {
    const item = cart[id];
    total += item.price * item.quantity;
    html += `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-thumb">
        <div style="flex-grow:1">
          <strong>${item.name}</strong><br>
          <span>${item.price} ₪ × ${item.quantity}</span>
        </div>
        <div class="qty-controls">
          <button onclick="changeQty('${id}', -1)">−</button>
          <button onclick="changeQty('${id}', 1)">+</button>
        </div>
        <button onclick="removeItem('${id}')" style="background:red;color:white;border:none;border-radius:4px;padding:4px 8px;margin-right:8px">🗑</button>
      </div>
    `;
  }
  cartItemsContainer.innerHTML = html || '<p>הסל ריק.</p>';
  cartTotal.textContent = total;
  cartCount.textContent = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);

  // הפעלה מחדש של כפתורים למוצרים שהוסרו
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    const id = btn.dataset.id;
    if (!cart[id]) {
      btn.disabled = false;
      btn.textContent = 'הוספה לסל';
    }
  });
}

// שינוי כמות
function changeQty(id, delta) {
  if (!cart[id]) return;
  cart[id].quantity += delta;
  if (cart[id].quantity <= 0) delete cart[id];
  updateCartUI();
}

// מחיקת פריט מהסל
function removeItem(id) {
  delete cart[id];
  updateCartUI();
}

// חיבור כפתורים אחרי טעינת DOM
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.dataset.id;
      const name = btn.dataset.name;
      const price = parseInt(btn.dataset.price);
      const image = btn.dataset.image;
      addToCart(id, name, price, image);
      btn.disabled = true;
      btn.textContent = 'בסל ✓';
    });
  });
});
