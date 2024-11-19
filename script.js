// Sample product data
const products = [
    { id: 1, name: 'Digital Art Brush Pack', category: 'graphics', price: 19.99, image: 'https://username.github.io/repository/images/Digital_Art_Brush_Pack.jpg?height=200&width=200' },
    { id: 2, name: 'Website Template', category: 'templates', price: 29.99, image: 'https://username.github.io/repository/images/Website_Template.jpg?height=200&width=200' },
    { id: 3, name: 'Premium Font', category: 'fonts', price: 39.99, image: 'https://username.github.io/repository/images/Premium_Font_Collection.jpg?height=200&width=200' },
    { id: 4, name: 'Icon Set', category: 'graphics', price: 9.99, image: 'https://username.github.io/repository/images/Icon_Set.jpg?height=200&width=200' },
    { id: 5, name: 'E-book Template', category: 'templates', price: 14.99, image: 'https://username.github.io/repository/images/E-book_Template.jpg?height=200&width=200' },
    { id: 6, name: 'Handwritten Font', category: 'fonts', price: 24.99, image: 'https://username.github.io/repository/images/Handwritten_Font.jpg?height=200&width=200' },
];

// Cart functionality
let cart = [];

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        updateCartCount();
        showNotification(`${product.name} added to cart!`);
    }
}

function updateCartCount() {
    document.getElementById('cart-count').textContent = cart.length;
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.remove();
    }, 3000);
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
    const featuredProducts = products.slice(0, 3); // Just use the first 3 products for this example
    const featuredProductsContainer = document.getElementById('featured-products-grid');
    featuredProductsContainer.innerHTML = featuredProducts.map(renderProductCard).join('');
}

// Populate store products
function populateStoreProducts() {
    const storeProductsContainer = document.getElementById('store-products');
    storeProductsContainer.innerHTML = products.map(renderProductCard).join('');
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

    const storeProductsContainer = document.getElementById('store-products');
    storeProductsContainer.innerHTML = filteredProducts.map(renderProductCard).join('');
}

// Mobile navigation
function mobileNav() {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');

        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        burger.classList.toggle('toggle');
    });
}

// Smooth scrolling for anchor links
function smoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

// Event listeners
document.getElementById('search').addEventListener('input', filterAndSortProducts);
document.getElementById('category-filter').addEventListener('change', filterAndSortProducts);
document.getElementById('sort-options').addEventListener('change', filterAndSortProducts);

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    populateFeaturedProducts();
    populateStoreProducts();
    mobileNav();
    smoothScroll();
});
