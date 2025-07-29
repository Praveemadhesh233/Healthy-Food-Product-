// admin.js - Admin Panel Script

// Load products from localStorage or initialize empty array
let products = JSON.parse(localStorage.getItem("adminProducts")) || [];

// DOM Elements
const productList = document.getElementById("product-list");
const addProductForm = document.getElementById("add-product-form");
const nameInput = document.getElementById("product-name");
const priceInput = document.getElementById("product-price");
const categoryInput = document.getElementById("product-category");

// Render products in table
function renderProducts() {
  productList.innerHTML = "";
  products.forEach((product, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${product.name}</td>
      <td>₹${product.price}</td>
      <td>${product.category}</td>
      <td>
        <button class="btn" onclick="editProduct(${index})">Edit</button>
        <button class="btn btn-danger" onclick="deleteProduct(${index})">Delete</button>
      </td>
  `;
    productList.appendChild(row);
  });
  localStorage.setItem("adminProducts", JSON.stringify(products));
}

// Add product
addProductForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newProduct = {
    name: nameInput.value,
    price: parseFloat(priceInput.value),
    category: categoryInput.value
  };
  products.push(newProduct);
  nameInput.value = "";
  priceInput.value = "";
  categoryInput.value = "";
  renderProducts();
});

// Edit product
function editProduct(index) {
  const updatedName = prompt("Enter new product name:", products[index].name);
  const updatedPrice = prompt("Enter new product price:", products[index].price);
  const updatedCategory = prompt("Enter new product category:", products[index].category);
  if (updatedName && updatedPrice && updatedCategory) {
    products[index].name = updatedName;
    products[index].price = parseFloat(updatedPrice);
    products[index].category = updatedCategory;
    renderProducts();
  }
}
// Delete product
function deleteProduct(index) {
  if (confirm("Are you sure you want to delete this product?")) {
    products.splice(index, 1);
    renderProducts();
  }
}

// Initial call
renderProducts();