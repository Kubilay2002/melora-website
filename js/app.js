/* =====================================================
   MELORA CANDLES
   SHOPPING CART
   ===================================================== */

let cart = [];


/* =====================================================
   ADD PRODUCT
   ===================================================== */

function add(name, price) {

  const existingProduct = cart.find(
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

  updateCart();

  openCart();
}


/* =====================================================
   REMOVE ONE PRODUCT
   ===================================================== */

function decrease(name) {

  const product = cart.find(
    item => item.name === name
  );

  if (!product) return;

  product.quantity -= 1;

  if (product.quantity <= 0) {

    cart = cart.filter(
      item => item.name !== name
    );

  }

  updateCart();
}


/* =====================================================
   REMOVE PRODUCT COMPLETELY
   ===================================================== */

function removeItem(name) {

  cart = cart.filter(
    item => item.name !== name
  );

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


  if (!itemsContainer ||
      !countElement ||
      !totalElement) {

    return;

  }


  /* -------------------------
     EMPTY CART
     ------------------------- */

  if (cart.length === 0) {

    itemsContainer.innerHTML = `
      <p>Dein Warenkorb ist leer.</p>
    `;

    countElement.textContent = "0";

    totalElement.textContent = "0,00 €";

    return;

  }


  /* -------------------------
     PRODUCTS
     ------------------------- */

  let total = 0;

  let itemCount = 0;


  itemsContainer.innerHTML = "";


  cart.forEach(product => {

    const productTotal =
      product.price * product.quantity;


    total += productTotal;

    itemCount += product.quantity;


    const item = document.createElement("div");

    item.className = "cart-item";


    item.innerHTML = `

      <div>

        <h4>
          ${product.name}
        </h4>

        <p>
          ${product.price.toFixed(2).replace(".", ",")} €
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


  /* -------------------------
     CART COUNT
     ------------------------- */

  countElement.textContent =
    itemCount;


  /* -------------------------
     TOTAL
     ------------------------- */

  totalElement.textContent =
    total
      .toFixed(2)
      .replace(".", ",") + " €";

}


/* =====================================================
   OPEN / CLOSE CART
   ===================================================== */

function toggleCart() {

  const cartElement =
    document.getElementById("cart");

  if (!cartElement) return;

  cartElement.classList.toggle("open");

}


function openCart() {

  const cartElement =
    document.getElementById("cart");

  if (!cartElement) return;

  cartElement.classList.add("open");

}


/* =====================================================
   INITIALIZE
   ===================================================== */

document.addEventListener(
  "DOMContentLoaded",
  function () {

    updateCart();

  }
);
