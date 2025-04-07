// 1. סל קניות - ספירה ואנימציה
const cartCount = document.querySelector('.cart-count');
const buyButtons = document.querySelectorAll('.btn');
let count = 0;

buyButtons.forEach(button => {
  button.addEventListener('click', () => {
    count++;
    cartCount.textContent = count;

    // אפקט אנימציה על הכפתור
    button.classList.add('clicked');
    setTimeout(() => button.classList.remove('clicked'), 200);

    showPopup("המוצר נוסף לסל הקניות!");
  });
});

// 2. התחברות
const loginLink = document.querySelector('.login');
if (loginLink) {
  loginLink.addEventListener('click', (e) => {
    e.preventDefault();
    showPopup("ברוכה הבאה חיה!");
  });
}

// 3. חיפוש
const searchInput = document.querySelector('.search-box input');
const searchBtn = document.querySelector('.search-box button');

searchBtn.addEventListener('click', () => {
  const term = searchInput.value.trim();
  if (term === '') {
    showPopup("נא להקליד מילת חיפוש");
  } else {
    showPopup(`תוצאות חיפוש עבור: "${term}" (הדמיה)`);
  }
});

// 4. כפתור גלילה לראש הדף
const scrollBtn = document.querySelector('.scroll-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollBtn?.classList.add('visible');
  } else {
    scrollBtn?.classList.remove('visible');
  }
});

scrollBtn?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// 5. הודעה קופצת יפה במקום alert
function showPopup(text) {
  const popup = document.createElement('div');
  popup.className = 'popup-msg';
  popup.textContent = text;
  document.body.appendChild(popup);

  setTimeout(() => {
    popup.classList.add('visible');
    setTimeout(() => {
      popup.classList.remove('visible');
      setTimeout(() => popup.remove(), 300);
    }, 2500);
  }, 100);
}
