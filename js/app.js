/* =====================================================
   MELORA CANDLES
   SHOPPING CART
   ===================================================== */

const CART_KEY = "MELORA_CANDLES_CART";


/* =====================================================
   LOAD CART
   ===================================================== */

function loadCart() {

  try {

    const saved =
      window.localStorage.getItem(CART_KEY);

    if (!saved) {
      return [];
    }

    const parsed =
      JSON.parse(saved);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed;

  } catch (error) {

    console.log(
      "MELORA: Warenkorb konnte nicht geladen werden.",
      error
    );

    return [];

  }

}


/* =====================================================
   CART
   ===================================================== */

let cart = loadCart();


/* =====================================================
   SAVE CART
   ===================================================== */

function saveCart() {

  try {

    window.localStorage.setItem(
      CART_KEY,
      JSON.stringify(cart)
    );

  } catch (error) {

    console.log(
      "MELORA: Warenkorb konnte nicht gespeichert werden.",
      error
    );

  }

}


/* =====================================================
   ADD PRODUCT
   ===================================================== */

function add(name, price) {

  const existing =
    cart.find(
      item => item.name === name
    );


  if (existing) {

    existing.quantity += 1;

  } else {

    cart.push({

      name: name,

      price: Number(price),

      quantity: 1

    });

  }


  saveCart();

  updateCart();

  openCart();

}


/* =====================================================
   DECREASE
   ===================================================== */

function decrease(name) {

  const product =
    cart.find(
      item => item.name === name
    );


  if (!product) {
    return;
  }


  product.quantity -= 1;


  if (product.quantity <= 0) {

    cart =
      cart.filter(
        item => item.name !== name
      );

  }


  saveCart();

  updateCart();

}


/* =====================================================
   REMOVE
   ===================================================== */

function removeItem(name) {

  cart =
    cart.filter(
      item => item.name !== name
    );


  saveCart();

  updateCart();

}


/* =====================================================
   UPDATE CART
   ===================================================== */

function updateCart() {

  const items =
    document.getElementById("items");

  const count =
    document.getElementById("count");

  const totalElement =
    document.getElementById("total");


  if (!items || !count || !totalElement) {
    return;
  }


  /* -----------------------------------------------------
     EMPTY
     ----------------------------------------------------- */

  if (cart.length === 0) {

    items.innerHTML = `
      <p>
        Dein Warenkorb ist leer.
      </p>
    `;

    count.textContent = "0";

    totalElement.textContent =
      "0,00 €";

    return;

  }


  /* -----------------------------------------------------
     BUILD CART
     ----------------------------------------------------- */

  items.innerHTML = "";

  let total = 0;

  let quantity = 0;


  cart.forEach(product => {

    const productTotal =
      Number(product.price) *
      Number(product.quantity);


    total += productTotal;

    quantity +=
      Number(product.quantity);


    const item =
      document.createElement("div");


    item.className =
      "cart-item";


    item.innerHTML = `

      <div>

        <h4>
          ${product.name}
        </h4>

        <p>
          ${Number(product.price)
            .toFixed(2)
            .replace(".", ",")} €

          ×

          ${product.quantity}
        </p>

        <button
          onclick="decrease('${product.name}')">

          − weniger

        </button>

        <button
          onclick="removeItem('${product.name}')">

          Entfernen

        </button>

      </div>

      <strong>

        ${productTotal
          .toFixed(2)
          .replace(".", ",")} €

      </strong>

    `;


    items.appendChild(item);

  });


  count.textContent =
    quantity;


  totalElement.textContent =
    total
      .toFixed(2)
      .replace(".", ",") +
    " €";

}


/* =====================================================
   OPEN / CLOSE CART
   ===================================================== */

function toggleCart() {

  const cartElement =
    document.getElementById("cart");


  if (!cartElement) {
    return;
  }


  cartElement.classList.toggle("open");

}


function openCart() {

  const cartElement =
    document.getElementById("cart");


  if (!cartElement) {
    return;
  }


  cartElement.classList.add("open");

}


/* =====================================================
   RESTORE CART
   ===================================================== */

function restoreCart() {

  cart = loadCart();

  updateCart();

}


/* =====================================================
   PAGE LOAD
   ===================================================== */

document.addEventListener(
  "DOMContentLoaded",
  function () {

    restoreCart();

  }
);


/* =====================================================
   SAFARI / BROWSER CACHE
   ===================================================== */

window.addEventListener(
  "pageshow",
  function () {

    restoreCart();

  }
);
