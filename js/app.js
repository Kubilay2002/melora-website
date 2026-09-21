/* =====================================================
   MELORA CANDLES
   SHOPPING CART
   ===================================================== */


/* =====================================================
   STORAGE
   ===================================================== */

const CART_KEY = "meloraCart";


function loadCart() {

  /* ---------- localStorage ---------- */

  try {

    const saved =
      localStorage.getItem(CART_KEY);

    if (saved) {

      return JSON.parse(saved);

    }

  } catch (error) {

    console.log(
      "localStorage nicht verfügbar"
    );

  }


  /* ---------- Cookie fallback ---------- */

  try {

    const cookies =
      document.cookie.split(";");

    const cookie =
      cookies.find(
        item =>
          item.trim()
            .startsWith(CART_KEY + "=")
      );

    if (cookie) {

      const value =
        cookie
          .split("=")
          .slice(1)
          .join("=");

      return JSON.parse(
        decodeURIComponent(value)
      );

    }

  } catch (error) {

    console.log(
      "Cookie-Speicher nicht verfügbar"
    );

  }


  return [];

}



function saveCart() {

  const data =
    JSON.stringify(cart);


  /* ---------- localStorage ---------- */

  try {

    localStorage.setItem(
      CART_KEY,
      data
    );

  } catch (error) {

    console.log(
      "localStorage konnte nicht gespeichert werden"
    );

  }


  /* ---------- Cookie ---------- */

  try {

    document.cookie =
      CART_KEY +
      "=" +
      encodeURIComponent(data) +
      "; path=/; max-age=2592000; SameSite=Lax";

  } catch (error) {

    console.log(
      "Cookie konnte nicht gespeichert werden"
    );

  }

}


/* =====================================================
   CART
   ===================================================== */

let cart = loadCart();


/* =====================================================
   ADD
   ===================================================== */

function add(name, price) {

  const existingProduct =
    cart.find(
      item => item.name === name
    );


  if (existingProduct) {

    existingProduct.quantity += 1;

  } else {

    cart.push({

      name: name,
      price: price,
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


  if (!product) return;


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

  const itemsContainer =
    document.getElementById("items");

  const countElement =
    document.getElementById("count");

  const totalElement =
    document.getElementById("total");


  if (
    !itemsContainer ||
    !countElement ||
    !totalElement
  ) {

    return;

  }


  /* ---------- EMPTY ---------- */

  if (cart.length === 0) {

    itemsContainer.innerHTML = `
      <p>
        Dein Warenkorb ist leer.
      </p>
    `;


    countElement.textContent = "0";


    totalElement.textContent =
      "0,00 €";


    return;

  }


  /* ---------- PRODUCTS ---------- */

  let total = 0;

  let itemCount = 0;


  itemsContainer.innerHTML = "";


  cart.forEach(product => {

    const productTotal =
      product.price *
      product.quantity;


    total += productTotal;

    itemCount +=
      product.quantity;


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
          ${product.price
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


    itemsContainer.appendChild(item);

  });


  /* ---------- COUNT ---------- */

  countElement.textContent =
    itemCount;


  /* ---------- TOTAL ---------- */

  totalElement.textContent =
    total
      .toFixed(2)
      .replace(".", ",") +
    " €";

}


/* =====================================================
   OPEN / CLOSE
   ===================================================== */

function toggleCart() {

  const cartElement =
    document.getElementById("cart");


  if (!cartElement) return;


  cartElement.classList.toggle(
    "open"
  );

}


function openCart() {

  const cartElement =
    document.getElementById("cart");


  if (!cartElement) return;


  cartElement.classList.add(
    "open"
  );

}


/* =====================================================
   RELOAD CART
   ===================================================== */

function reloadCart() {

  const savedCart =
    loadCart();


  if (Array.isArray(savedCart)) {

    cart = savedCart;

  }


  updateCart();

}


/* =====================================================
   INITIALIZE
   ===================================================== */

document.addEventListener(
  "DOMContentLoaded",
  function () {

    reloadCart();

  }
);


/* =====================================================
   SAFARI / PAGE CACHE
   ===================================================== */

window.addEventListener(
  "pageshow",
  function () {

    reloadCart();

  }
);
