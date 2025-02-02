let cart = JSON.parse(localStorage.getItem('cart')) || [];

function displayCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalAmount = document.getElementById('total-amount');
    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        const listItem = document.createElement('li');
        listItem.innerHTML = `${item.name} - $${item.price} x ${item.quantity} 
            <button onclick="updateQuantity(${index}, 'increase')">+</button>
            <button onclick="updateQuantity(${index}, 'decrease')">-</button>
            <button onclick="removeFromCart(${index})">Remove</button>`;
        cartItemsContainer.appendChild(listItem);
    });

    totalAmount.textContent = total.toFixed(2);
    localStorage.setItem('cart', JSON.stringify(cart));  

}
function addToCart(id, name, price) {
    const existingItemIndex = cart.findIndex(item => item.id === id);
    
    if (existingItemIndex >= 0) {
        cart[existingItemIndex].quantity += 1;  
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }
    
    displayCart();
}


function updateQuantity(index, action) {
    if (action === 'increase') {
        cart[index].quantity += 1;
    } else if (action === 'decrease') {
        cart[index].quantity = Math.max(1, cart[index].quantity - 1);
    }
    
    displayCart();
}


function removeFromCart(index) {
    cart.splice(index, 1);
    displayCart();
}


function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
    } else {
        alert("Thank you for your purchase!");
        cart = [];  
        localStorage.removeItem('cart');
        displayCart();
    }
}


displayCart();


function showReceipt() {
    const receiptContent = document.getElementById('receipt-content');
    const receiptTotal = document.getElementById('receipt-total');
    let total = 0;

    
    receiptContent.innerHTML = '';

    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const itemElement = document.createElement('p');
        itemElement.innerHTML = `${item.name} - $${item.price} x ${item.quantity} = $${itemTotal.toFixed(2)}`;
        receiptContent.appendChild(itemElement);
    });

    
    receiptTotal.textContent = total.toFixed(2);

    
    document.getElementById('receipt-modal').style.display = 'block';
}


function closeReceipt() {
    document.getElementById('receipt-modal').style.display = 'none';
}


function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    showReceipt();  
}


function confirmCheckout() {
    alert("Thank you for your purchase!");
    cart = [];  
    localStorage.removeItem('cart');
    displayCart();  
    closeReceipt(); 
}
