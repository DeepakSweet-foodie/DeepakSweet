/* ================= MOBILE MENU ================= */

function toggleMenu() {
  const nav = document.getElementById("navMenu");
  nav.classList.toggle("show");
}

/* Close mobile menu after clicking link */
document.querySelectorAll("#navMenu a").forEach(link => {
  link.addEventListener("click", () => {
    document.getElementById("navMenu").classList.remove("show");
  });
});

/* ================= YEAR ================= */
document.getElementById("year").textContent = new Date().getFullYear();

/* ================= MENU FILTER ================= */
function filterMenu(category, button) {
  const items = document.querySelectorAll(".menu-item");
  const buttons = document.querySelectorAll(".category-buttons button");

  buttons.forEach(btn => {
    btn.classList.remove("active");
  });

  button.classList.add("active");

  items.forEach(item => {
    if (category === "all" || item.dataset.category === category) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

/* ================= CART ================= */
let cart = [];

function addToCart(name, price) {
  const existing = cart.find(item => item.name === name);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({
      name: name,
      price: price,
      quantity: 1
    });
  }

  updateCart();
  openCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById("cartItems");
  const cartCount = document.getElementById("cartCount");
  const cartTotal = document.getElementById("cartTotal");

  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
    cartCount.textContent = "0";
    cartTotal.textContent = "0";
    return;
  }

  let total = 0;
  let count = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;
    count += item.quantity;

    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
      <div>
        <h4>${item.name}</h4>
        <p>₹${item.price} × ${item.quantity}</p>
      </div>
      <button class="remove" onclick="removeFromCart(${index})">×</button>
    `;

    cartItems.appendChild(div);
  });

  cartCount.textContent = count;
  cartTotal.textContent = total;
}

/* ================= CART OPEN/CLOSE ================= */
function openCart() {
  document.getElementById("cartPanel").classList.add("open");
  document.getElementById("cartOverlay").classList.add("open");
}

function closeCart() {
  document.getElementById("cartPanel").classList.remove("open");
  document.getElementById("cartOverlay").classList.remove("open");
}

/* ================= PLACE ORDER (DIRECT ON WEBSITE) ================= */
function placeOrder() {
  if (cart.length === 0) {
    alert("Please add something to your cart first.");
    return;
  }

  const cartItems = document.getElementById("cartItems");
  
  // Success message dikhayein
  cartItems.innerHTML = `
    <div style="text-align: center; padding: 40px 15px;">
      <h3 style="color: #25d366; font-size: 24px; margin-bottom: 10px;">🎉 Order Successful!</h3>
      <p style="color: #746b68; font-size: 14px; line-height: 1.6;">Aapka order successfully place ho gaya hai. Deepak Sweets team jald hi aapse sampark karegi!</p>
    </div>
  `;

  // Cart ko reset kar dein
  cart = [];
  document.getElementById("cartCount").textContent = "0";
  document.getElementById("cartTotal").textContent = "0";
}
