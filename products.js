// JavaScript for dynamic product listing and sorting
var products = [
    { name: 'Apple', price: 0.99, category: 'Organic' },
    { name: 'Bread', price: 2.99, category: 'Gluten Free' },
    { name: 'Cucumber', price: 1.20, category: 'Organic' },
    { name: 'Chicken', price: 4.99, category: 'Meat' },
    { name: 'Carrot', price: 1.50, category: 'Organic' },
    { name: 'Salmon', price: 7.99, category: 'Meat' },
    { name: 'Lettuce', price: 1.99, category: 'Organic' },
    { name: 'Pasta', price: 3.49, category: 'Gluten Free' },
    { name: 'Beef', price: 9.99, category: 'Meat' },
    { name: 'Tomato', price: 1.25, category: 'Organic' },
    { name: 'Orange', price: 1.49, category: 'Organic' },
    { name: 'Yogurt', price: 2.79, category: 'Dairy' },
];

// Function to filter products based on dietary restrictions
function filterProducts(diet, productList) {
    if (diet === 'Vegetarian') {
        // If Vegetarian, exclude 'Chicken', 'Salmon', 'Beef' products
        return productList.filter(product => product.category !== 'Meat');
    } else if (diet === 'Gluten Free') {
        // If Gluten Free, exclude products with 'Gluten Free' category
        return productList.filter(product => product.category !== 'Gluten Free');
    } else if (diet === 'Organic') {
        // If Organic, only show products with 'Organic' category
        return productList.filter(product => product.category === 'Organic');
    } else if (diet === 'Meat') {
        // If Meat, show 'Chicken', 'Salmon', 'Beef' products
        return productList.filter(product => ['Chicken', 'Salmon', 'Beef'].includes(product.name));
    }
    // If none or any other preference, show all products
    return productList;
}

let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to add a product to the cart
function addToCart(productName) {
    // Find the product details based on the productName
    const product = products.find(p => p.name === productName);
    // Check if the product is already in the cart
    const productInCart = cart.find(p => p.name === productName);

    if (productInCart) {
        // If it's already in the cart, increment the quantity
        productInCart.quantity += 1;
    } else {
        // If it's not in the cart, add it with a quantity of 1
        cart.push({ ...product, quantity: 1 });
    }

    
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(productName + ' added to cart');
}

// Function to sort products based on the selected option
function sortProducts(sortBy, productList) {
    if (sortBy === 'price') {
        // Sort by price
        return productList.sort((a, b) => a.price - b.price);
    } else {

        return productList.sort((a, b) => a.name.localeCompare(b.name));
    }
}


function displayProducts() {
    const productGrid = document.getElementById('product-list');
    productGrid.innerHTML = ''; 

    const dietPreference = localStorage.getItem('dietPreference'); // Retrieve the diet preference
    const sortedProducts = sortProducts(document.getElementById('sort').value, products);
    const filteredProducts = dietPreference ? filterProducts(dietPreference, sortedProducts) : sortedProducts;

    filteredProducts.forEach(function(product, index) {
    const productHTML = `
        <div class="product-item">
            <div class="product-name">${product.name}</div>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <button class="add-to-cart" onclick="addToCart('${product.name}')">Add to Cart</button>
        </div>
    `;
    productGrid.insertAdjacentHTML('beforeend', productHTML);
});
}


document.getElementById('sort').addEventListener('change', function() {
    displayProducts(); 
});


displayProducts();