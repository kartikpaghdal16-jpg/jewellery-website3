let products = JSON.parse(localStorage.getItem("products")) || [];

function addProduct() {
    const name = document.getElementById("productName").value;
    const price = document.getElementById("productPrice").value;
    const image = document.getElementById("productImage").value;

    if (!name || !price || !image) {
        alert("Fill all fields");
        return;
    }

    products.push({ name, price, image });
    localStorage.setItem("products", JSON.stringify(products));

    document.getElementById("productName").value = "";
    document.getElementById("productPrice").value = "";
    document.getElementById("productImage").value = "";

    renderProducts();
}


function renderProducts() {
    const container = document.getElementById("adminProducts");
    container.innerHTML = "";

    products.forEach((p, index) => {
        container.innerHTML += `
            <div style="margin-bottom:10px;">
                <img src="${p.image}" width="40" style="vertical-align:middle;">
                ${p.name} - ₹${p.price}
                <button onclick="deleteProduct(${index})">Delete</button>
            </div>
        `;
    });
}


function deleteProduct(index) {
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));
    renderProducts();
}

renderProducts();
