let cart = [];

function add(name, price) {
  const existing = cart.find(item => item.name === name);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({
      name: name,
      price: Number(price),
      quantity: 1
    });
  }

  updateCart();
  openCart();
}

function decrease(name) {
  const product = cart.find(item => item.name === name);

  if (!product) return;

  product.quantity--;

  if (product.quantity <= 0) {
    cart = cart.filter(item => item.name !== name);
  }

  updateCart();
}

function removeItem(name) {
  cart = cart.filter(item => item.name !== name);
  updateCart();
}

function updateCart() {
  const items = document.getElementById("items");
  const count = document.getElementById("count");
  const totalElement = document.getElementById("total");

  if (!items || !count || !totalElement) return;

  if (cart.length === 0) {
    items.innerHTML = "<p>Dein Warenkorb ist leer.</p>";
    count.textContent = "0";
    totalElement.textContent = "0,00 €";
    return;
  }

  items.innerHTML = "";

  let total = 0;
  let quantity = 0;

  cart.forEach(product => {
    const productTotal =
      product.price * product.quantity;

    total += productTotal;
    quantity += product.quantity;

    const item = document.createElement("div");
    item.className = "cart-item";

    item.innerHTML = `
      <div>
        <h4>${product.name}</h4>
        <p>${product.price.toFixed(2).replace(".", ",")} € × ${product.quantity}</p>

        <button onclick="decrease('${product.name}')">
          − weniger
        </button>

        <button onclick="removeItem('${product.name}')">
          Entfernen
        </button>
      </div>

      <strong>
        ${productTotal.toFixed(2).replace(".", ",")} €
      </strong>
    `;

    items.appendChild(item);
  });

  count.textContent = quantity;
  totalElement.textContent =
    total.toFixed(2).replace(".", ",") + " €";
}

function toggleCart() {
  const cartElement = document.getElementById("cart");

  if (!cartElement) return;

  cartElement.classList.toggle("open");
}

function openCart() {
  const cartElement = document.getElementById("cart");

  if (!cartElement) return;

  cartElement.classList.add("open");
}

document.addEventListener("DOMContentLoaded", function () {
  updateCart();
});
