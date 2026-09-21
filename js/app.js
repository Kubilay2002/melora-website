let cart = [];

function add(name, price) {
  cart.push({
    name: name,
    price: price
  });

  updateCart();
  openCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

function updateCart() {
  const count = document.getElementById("count");
  const items = document.getElementById("items");
  const total = document.getElementById("total");

  count.textContent = cart.length;

  if (cart.length === 0) {
    items.innerHTML = "<p>Dein Warenkorb ist leer.</p>";
    total.textContent = "0,00 €";
    return;
  }

  let totalPrice = 0;

  items.innerHTML = "";

  cart.forEach((item, index) => {
    totalPrice += item.price;

    const div = document.createElement("div");

    div.className = "cart-item";

    div.innerHTML = `
      <div>
        <div class="cart-item-name">${item.name}</div>

        <button
          class="remove-item"
          onclick="removeItem(${index})"
        >
          Entfernen
        </button>
      </div>

      <div class="cart-item-price">
        ${item.price.toFixed(2).replace(".", ",")} €
      </div>
    `;

    items.appendChild(div);
  });

  total.textContent =
    totalPrice.toFixed(2).replace(".", ",") + " €";
}

function toggleCart() {
  const cartElement = document.getElementById("cart");

  cartElement.classList.toggle("open");
}

function openCart() {
  const cartElement = document.getElementById("cart");

  cartElement.classList.add("open");
}

updateCart();
