let cart = JSON.parse(localStorage.getItem('cart') || '[]');

function updateCartCount() {
  const cartCountElem = document.getElementById('cart-count');
  if (cartCountElem) {
    cartCountElem.textContent = cart.length;
  }
}

function addToCart(item, price) {
  cart.push({ item, price });
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(item + " added to cart!");
  updateCartCount(); // Update cart count right after adding item
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartCount(); // Update count on page load

  // Populate cart page if cart-list exists
  const cartList = document.getElementById("cart-list");
  if (cartList) {
    cartList.innerHTML = '';
    if (cart.length === 0) {
      cartList.innerHTML = '<li>Your cart is empty.</li>';
    } else {
      cart.forEach((c, index) => {
        const li = document.createElement("li");
        li.textContent = `${c.item} - ₹${c.price}`;
        cartList.appendChild(li);
      });
    }
  }

  // Place order button event (if exists)
  const placeOrderBtn = document.querySelector('button[onclick="placeOrder()"]');
  if (placeOrderBtn) {
    placeOrderBtn.addEventListener('click', () => {
      if (cart.length === 0) {
        document.getElementById("order-message").textContent = "Your cart is empty.";
        return;
      }
      cart = [];
      localStorage.setItem('cart', JSON.stringify(cart));
      document.getElementById("order-message").textContent = "Order placed successfully!";
      updateCartCount(); // Update count after order placed
    });
  }

  // Ticket form submit
  const ticketForm = document.querySelector('form');
  if (ticketForm) {
    ticketForm.addEventListener('submit', (e) => {
      e.preventDefault();
      document.getElementById("ticket-message").textContent = "Your ticket has been submitted. We'll get back to you soon.";
      ticketForm.reset();
    });
  }
});
