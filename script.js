function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}



function addToCart(name, price) {
    let cart = getCart();
    const item = cart.find(i => i.name === name);

    if (item) {
        item.qty += 1;
    } else {
        cart.push({ name, price, qty: 1 });
    }

    saveCart(cart);
    alert(name + " added to cart!");
    updateCartCount();

}



function loadCart() {
    const cart = getCart();
    const cartContainer = document.getElementById("cartContainer");
    const totalPrice = document.getElementById("totalPrice");

    if (!cartContainer) return;

    cartContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.qty;
        total += itemTotal;

        cartContainer.innerHTML += `
            <div class="cart-item">
                <div>
                    <p>${item.name}</p>
                    <p>₹${item.price} × ${item.qty} = ₹${itemTotal}</p>
                </div>
                <div>
                    <button onclick="changeQty(${index}, -1)">−</button>
                    <button onclick="changeQty(${index}, 1)">+</button>
                </div>
            </div>
        `;
    });
    if (cart.length === 0) {
    cartContainer.innerHTML = `
        <p style="text-align:center; color:#777;">
            Your cart is empty.
        </p>
    `;
    totalPrice.innerText = "";
    return;
}


    totalPrice.innerText = "Total: ₹" + total;
}





loadCart();

function loadProducts() {
    const productGrid = document.getElementById("productGrid");
    if (!productGrid) return;

    const products = JSON.parse(localStorage.getItem("products")) || [];

    productGrid.innerHTML = "";

    products.forEach(product => {
        productGrid.innerHTML += `
            <div class="product-card"
                 onclick="openProduct('${product.name}')">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>₹${product.price}</p>
                <button onclick="event.stopPropagation(); addToCart('${product.name}', ${product.price})">
                    Add to Cart
                </button>
            </div>
        `;
    });
    if (products.length === 0) {
    productGrid.innerHTML = "<p>No products available.</p>";
    return;
}

}



function placeOrder() {
    if (cart.length === 0) {
        alert("Cart is empty");
        return;
    }

    const orders = JSON.parse(localStorage.getItem("orders")) || [];

    let total = 0;
    cart.forEach(item => {
        total += item.price * item.qty;
    });

    const order = {
        id: Date.now(),
        date: new Date().toLocaleDateString(),
        items: JSON.parse(JSON.stringify(cart)),
        total: total
    };

    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));

    localStorage.removeItem("cart");
    alert("Order placed successfully!");
    window.location.href = "orders.html";
}


loadCheckout();

function loadProducts() {
    const productGrid = document.getElementById("productGrid");
    if (!productGrid) return;

    const products = JSON.parse(localStorage.getItem("products")) || [];

    productGrid.innerHTML = "";

    products.forEach(product => {
        productGrid.innerHTML += `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>₹${product.price}</p>
                <button onclick="addToCart('${product.name}', ${product.price})">
                    Add to Cart
                </button>
            </div>
        `;
    });
}


loadProducts();

function changeQty(index, change) {
    let cart = getCart();
    cart[index].qty += change;

    if (cart[index].qty <= 0) {
        cart.splice(index, 1);
    }

    saveCart(cart);
    loadCart();
    updateCartCount();
}


function loadOrders() {
    const container = document.getElementById("ordersContainer");
    if (!container) return;

    const orders = JSON.parse(localStorage.getItem("orders")) || [];

    if (orders.length === 0) {
        container.innerHTML = "<p style='text-align:center;'>No orders yet.</p>";
        return;
    }

    container.innerHTML = "";

    orders.reverse().forEach(order => {
        let itemsHTML = "";

        order.items.forEach(item => {
            itemsHTML += `
                <p>${item.name} — ${item.qty} × ₹${item.price}</p>
            `;
        });

        container.innerHTML += `
            <div class="order-card">
                <h3>Order #${order.id}</h3>
                <p>Date: ${order.date}</p>
                ${itemsHTML}
                <strong>Total: ₹${order.total}</strong>
            </div>
        `;
    });
}

loadOrders();

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const count = cart.reduce((sum, item) => sum + item.qty, 0);

    const cartCount = document.getElementById("cartCount");
    if (cartCount) {
        cartCount.innerText = count;
    }
}

updateCartCount();
function openProduct(name) {
    window.location.href = `product.html?name=${encodeURIComponent(name)}`;
}

function loadProductDetail() {
    const container = document.getElementById("productDetail");
    if (!container) return;

    const params = new URLSearchParams(window.location.search);
    const name = params.get("name");

    const products = JSON.parse(localStorage.getItem("products")) || [];
    const product = products.find(p => p.name === name);

    if (!product) {
        container.innerHTML = "<p>Product not found.</p>";
        return;
    }

    container.innerHTML = `
        <div class="detail-wrapper">
            <img src="${product.image}" alt="${product.name}">
            <div class="detail-info">
                <h2>${product.name}</h2>
                <p class="price">₹${product.price}</p>
                <p class="desc">
                    Crafted with precision and elegance, this piece is designed
                    to elevate your everyday style.
                </p>
                <button onclick="addToCart('${product.name}', ${product.price})">
                    Add to Cart
                </button>
            </div>
        </div>
    `;
}

loadProductDetail();
