let cart = JSON.parse(localStorage.getItem("cart")) || [];

const container = document.getElementById("cart-items");

function renderCart(){
  container.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const div = document.createElement("div");

    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    div.innerHTML = `
      <p>${item.name}</p>
      <p>${item.quantity} x KES ${item.price}</p>
      <p>Total: KES ${itemTotal}</p>
      <button onclick="removeItem(${index})">Remove</button>
      <hr>
    `;

    container.appendChild(div);
  });

  document.getElementById("total-price").textContent = "Total: KES " + total;
}

function removeItem(index){
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function checkout(){
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;
  });

  let handler = PaystackPop.setup({
    key: 'YOUR_PUBLIC_KEY_HERE', // replace this
    email: "customer@email.com",
    amount: total * 100, // Paystack uses kobo (KES x 100)

    callback: function(response){
      alert("Payment successful! Ref: " + response.reference);
      localStorage.removeItem("cart");
      window.location.reload();
    },

    onClose: function(){
      alert("Payment cancelled");
    }
  });

  handler.openIframe();
}
