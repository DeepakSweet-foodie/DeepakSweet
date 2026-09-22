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

/* ================= PROFESSIONAL PLACE ORDER ================= */
function placeOrder() {
  if (cart.length === 0) {
    alert("Please add items to your cart first.");
    return;
  }

  const name = document.getElementById("customerName").value.trim();
  const phone = document.getElementById("customerPhone").value.trim();
  const address = document.getElementById("customerAddress").value.trim();

  if (!name || !phone || !address) {
    alert("Please fill in your Name, Mobile Number, and Delivery Address!");
    return;
  }

  // Professional message format for the shop owner
  let message = `🛍️ *NEW ORDER RECEIVED*%0A`;
  message += `-----------------------------------%0A`;
  message += `👤 *Customer Name:* ${name}%0A`;
  message += `📞 *Phone Number:* ${phone}%0A`;
  message += `📍 *Delivery Address:* ${address}%0A`;
  message += `-----------------------------------%0A`;
  message += `🛒 *Order Items:*%0A`;

  let total = 0;
  cart.forEach(item => {
    message += `• ${item.name} (Qty: ${item.quantity}) - ₹${item.price * item.quantity}%0A`;
    total += item.price * item.quantity;
  });

  message += `-----------------------------------%0A`;
  message += `💰 *Total Bill Amount: ₹${total}*%0A`;
  message += `-----------------------------------%0A`;
  message += `_Sent via Deepak Sweets Professional Website_`;

  // Restaurant/Shop Owner WhatsApp Number
  const ownerWhatsApp = "919204965346";
  const whatsappUrl = `https://wa.me/${ownerWhatsApp}?text=${message}`;

  // Open WhatsApp directly
  window.open(whatsappUrl, '_blank');
}
