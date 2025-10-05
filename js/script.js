// Sample product data
const products = [
    { id: 1, name: 'Digital Art Brush Pack', category: 'graphics', price: 19.99, image: '/images/Digital_Art_Brush_Pack.jpg?height=200&width=200' },
    { id: 2, name: 'Website Template', category: 'templates', price: 29.99, image: '/images/Website_Template.jpg?height=200&width=200' },
    { id: 3, name: 'Premium Font', category: 'fonts', price: 39.99, image: '/images/Premium_Font_Collection.jpg?height=200&width=200' },
    { id: 4, name: 'Icon Set', category: 'graphics', price: 9.99, image: '/images/Icon_Set.jpg?height=200&width=200' },
    { id: 5, name: 'E-book Template', category: 'templates', price: 14.99, image: '/images/E-book_Template.jpg?height=200&width=200' },
    { id: 6, name: 'Handwritten Font', category: 'fonts', price: 24.99, image: '/images/Handwritten_Font.jpg?height=200&width=200' },
];

// Cart functionality
let cart = [];

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity++; // Increase quantity if already in cart
        } else {
            cart.push({ ...product, quantity: 1 }); // Add new product with quantity
        }
        updateCart();
        showNotification(`${product.name} added to cart!`);
    }
}

// Increase quantity
function increaseQuantity(index) {
    cart[index].quantity++;
    updateCart();
}

// Decrease quantity
function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        removeFromCart(index); // Remove item if quantity reaches 0
    }
    updateCart();
}

// Remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Update cart modal content
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const checkoutButton = document.getElementById('cart-button');
    const totalPriceContainer = document.getElementById('cart-total');

    cartItemsContainer.innerHTML = ""; // Clear cart content

    let total = 0; // Initialize total price

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
        totalPriceContainer.innerHTML = ""; // Clear total price
        checkoutButton.disabled = true;
        checkoutButton.classList.add("disabled");
    } else {
        cart.forEach((product, index) => {
            let itemTotal = product.price * product.quantity; // Compute total per item
            total += itemTotal; // Add to overall total

            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="cart-img">
                <div class="cart-info">
                    <h4>${product.name}</h4>
                    <p>$${product.price.toFixed(2)} x ${product.quantity} = <strong>$${itemTotal.toFixed(2)}</strong></p>
                    <div class="quantity-controls">
                        <button class="minus-btn" onclick="decreaseQuantity(${index})">−</button>
                        <span>${product.quantity}</span>
                        <button class="plus-btn" onclick="increaseQuantity(${index})">+</button>
                    </div>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        totalPriceContainer.innerHTML = `<h3>Total: $${total.toFixed(2)}</h3>`;
        checkoutButton.disabled = false;
        checkoutButton.classList.remove("disabled");
    }

    document.getElementById('cart-count').textContent = cart.length; // Update cart count
}



// Remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

// Render product cards
function renderProductCard(product) {
    return `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>$${product.price.toFixed(2)}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        </div>
    `;
}

// Populate featured products
function populateFeaturedProducts() {
    const featuredProducts = products.slice(0, 3);
    document.getElementById('featured-products-grid').innerHTML = featuredProducts.map(renderProductCard).join('');
}

// Populate store products
function populateStoreProducts() {
    document.getElementById('store-products').innerHTML = products.map(renderProductCard).join('');
}

// Filter and sort products
function filterAndSortProducts() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const category = document.getElementById('category-filter').value;
    const sortOption = document.getElementById('sort-options').value;

    let filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) &&
        (category === 'all' || product.category === category)
    );

    if (sortOption === 'price-low-high') {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-high-low') {
        filteredProducts.sort((a, b) => b.price - a.price);
    }

    document.getElementById('store-products').innerHTML = filteredProducts.map(renderProductCard).join('');
}

// Mobile navigation
document.addEventListener('DOMContentLoaded', function () {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li a');

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        burger.classList.toggle('toggle');

        document.querySelectorAll('.nav-links li').forEach((link, index) => {
            if (nav.classList.contains('nav-active')) {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            } else {
                link.style.animation = '';
            }
        });
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
            document.querySelectorAll('.nav-links li').forEach(link => {
                link.style.animation = '';
            });
        });
    });
});

// Smooth scrolling for anchor links
function smoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// Open & Close Cart Modal
document.querySelector('.cart-icon').addEventListener('click', function () {
    document.getElementById('cart-modal').style.display = "flex";
    updateCart();
});

document.querySelector('.close').addEventListener('click', function () {
    document.getElementById('cart-modal').style.display = "none";
});

window.addEventListener('click', function (e) {
    if (e.target === document.getElementById('cart-modal')) {
        document.getElementById('cart-modal').style.display = "none";
    }
});

// Event listeners
document.getElementById('search').addEventListener('input', filterAndSortProducts);
document.getElementById('category-filter').addEventListener('change', filterAndSortProducts);
document.getElementById('sort-options').addEventListener('change', filterAndSortProducts);

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    populateFeaturedProducts();
    populateStoreProducts();
    smoothScroll();
});
