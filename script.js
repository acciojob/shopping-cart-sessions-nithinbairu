// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearButton = document.getElementById("clear-cart-btn");

let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

// Render product list
function renderProducts() {
  productList.innerHTML = ""; // clear old items
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${product.name} - $${product.price} 
      <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
    `;
    productList.appendChild(li);
  });

  // attach events to "Add to Cart" buttons
  const addCartButtons = document.querySelectorAll(".add-to-cart-btn");
  addCartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const productId = parseInt(button.dataset.id);
      addToCart(productId);
    });
  });
}

// Render cart list
function renderCart() {
  cartList.innerHTML = "";

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} - $${item.price}
      <button class="remove-item-btn" data-id="${item.id}">Remove from Cart</button>
    `;
    cartList.appendChild(li);
  });

  // attach events to "Remove" buttons
  const removeButtons = document.querySelectorAll(".remove-item-btn");
  removeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const productId = parseInt(button.dataset.id);
      removeFromCart(productId);
    });
  });
}

// Add item to cart
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  cart.push(product);
  sessionStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Remove item from cart
function removeFromCart(productId) {
  cart = cart.filter((p) => p.id !== productId);
  sessionStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Clear cart
function clearCart() {
  cart = [];
  sessionStorage.removeItem("cart");
  renderCart();
}

clearButton.addEventListener("click", clearCart);

// Initial render
renderProducts();
renderCart();
