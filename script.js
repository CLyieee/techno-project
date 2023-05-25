function rentCar(carId) {
  // Perform necessary actions for renting a car
  // You can add your custom logic here

  // Example action: Add 'rented' class to the rented car
  var carElement = document.getElementById("car" + carId);
  carElement.classList.add("rented");
}
'use strict';



/**
 * MOBILE NAVBAR TOGGLE
 */
function rentCar(carId) {
  const car = document.querySelector(`#carList .car:nth-child(${carId})`);
  const carName = car.querySelector('h2').textContent;
  const price = car.querySelector('.price').textContent;

  // Create a cart item object
  const cartItem = {
    carId: carId,
    carName: carName,
    price: price,
  };

  // Store the cart item in the browser's local storage
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  cartItems.push(cartItem);
  localStorage.setItem('cartItems', JSON.stringify(cartItems));

  // Display confirmation message
  alert('Car added to cart. Proceed to checkout.');

  // Clear the car list and display the cart
  clearCarList();
  displayCart();
}

function clearCarList() {
  const carList = document.querySelector('#carList');
  carList.innerHTML = '';
}

function displayCart() {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  if (cartItems.length === 0) {
    const carList = document.querySelector('#carList');
    const emptyCartMessage = document.createElement('p');
    emptyCartMessage.textContent = 'Your cart is empty.';
    carList.appendChild(emptyCartMessage);
  } else {
    const carList = document.querySelector('#carList');
    const cartContainer = document.createElement('div');
    cartContainer.classList.add('cart-container');

    for (let i = 0; i < cartItems.length; i++) {
      const cartItem = cartItems[i];
      const cartEntry = document.createElement('div');
      cartEntry.classList.add('cart-entry');

      const carName = document.createElement('h2');
      carName.textContent = cartItem.carName;
      cartEntry.appendChild(carName);

      const price = document.createElement('p');
      price.classList.add('price');
      price.textContent = cartItem.price;
      cartEntry.appendChild(price);

      cartContainer.appendChild(cartEntry);
    }

    const checkoutButton = document.createElement('button');
    checkoutButton.textContent = 'Checkout';
    checkoutButton.addEventListener('click', showReceipt);
    cartContainer.appendChild(checkoutButton);

    carList.appendChild(cartContainer);
  }
}

function showReceipt() {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  if (cartItems.length === 0) {
    alert('Your cart is empty.');
    return;
  }

  const receiptContainer = document.createElement('div');
  receiptContainer.classList.add('receipt-container');

  const receiptHeader = document.createElement('h3');
  receiptHeader.textContent = 'Receipt';
  receiptContainer.appendChild(receiptHeader);

  let totalPrice = 0;

  for (let i = 0; i < cartItems.length; i++) {
    const cartItem = cartItems[i];

    const receiptItem = document.createElement('div');
    receiptItem.classList.add('receipt-item');

    const carName = document.createElement('p');
    carName.textContent = cartItem.carName;
    receiptItem.appendChild(carName);

    const price = document.createElement('p');
    price.textContent = cartItem.price;
    receiptItem.appendChild(price);

    totalPrice += parseInt(cartItem.price.slice(1));

    receiptContainer.appendChild(receiptItem);
  }

  const totalAmount = document.createElement('p');
  totalAmount.classList.add('total-amount');
  totalAmount.textContent = `Total: $${totalPrice}`;
  receiptContainer.appendChild(totalAmount);

  // Clear the cart and display the receipt
  const carList = document.querySelector('#carList');
  carList.innerHTML = '';
  carList.appendChild(receiptContainer);

  // Clear the cart items from local storage
  localStorage.removeItem('cartItems');
}
