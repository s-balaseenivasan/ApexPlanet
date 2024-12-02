const products = [
    { id: 1, name: "Laptop", price: 999.99, category: "electronics", image: "img/laptop.jpg", rating: 4.5 },
    { id: 2, name: "Shirt", price: 29.99, category: "clothing", image: "img/tshirt.png", rating: 4.0 },
    { id: 3, name: "Book", price: 19.99, category: "books", image: "img/book.jpg", rating: 4.8 },
    { id: 4, name: "Headphones", price: 199.99, category: "electronics", image: "img/headphones.jpg", rating: 4.2 },
    { id: 5, name: "Jacket", price: 49.99, category: "clothing", image: "img/jacket.png", rating: 3.3 },
    { id: 6, name: "Smartphone", price: 249.99, category: "electronics", image: "img/smartphone.jpg", rating: 4.7 },
    { id: 7, name: "Shoes", price: 49.99, category: "clothing", image: "img/shoes.jpg", rating: 2.7 },
    { id: 8, name: "Blender", price: 79.99, category: "home", image: "img/blender.jpg", rating: 4.3 },
    { id: 9, name: "Running Shoes", price: 99.99, category: "sports", image: "img/runningshoes.jpg", rating: 4.6 },
    { id: 10, name: "Yoga Mat", price: 29.99, category: "sports", image: "img/yogamat.jpg", rating: 4.1 },
    { id: 11, name: "Coffee Maker", price: 59.99, category: "home", image: "img/coffeemaker.jpg", rating: 4.4 },
    { id: 12, name: "Hair Dryer", price: 49.99, category: "beauty", image: "img/hairdryer.jpg", rating: 4.2 },
    { id: 13, name: "Fridge", price: 499.99, category: "home", image: "img/fridge.jpg", rating: 4.7 },
    { id: 14, name: "Sofa", price: 899.99, category: "home", image: "img/sofa.jpg", rating: 4.3 },
    { id: 15, name: "Shampoo", price: 9.99, category: "beauty", image: "img/shampoo.jpg", rating: 4.5 },
    { id: 16, name: "Smartwatch", price: 149.99, category: "electronics", image: "img/smartwatch.jpg", rating: 4.1 },
    { id: 17, name: "Microwave", price: 129.99, category: "home", image: "img/microwave.jpg", rating: 4.0 },
    { id: 18, name: "Desk Lamp", price: 19.99, category: "home", image: "img/desklamp.jpg", rating: 4.5 },
    { id: 19, name: "Sneakers", price: 69.99, category: "clothing", image: "img/sneakers.jpg", rating: 3.9 },
    { id: 20, name: "Tennis Racket", price: 149.99, category: "sports", image: "img/tennisracket.jpg", rating: 4.8 },
    { id: 21, name: "Running Shorts", price: 29.99, category: "sports", image: "img/runningshorts.jpg", rating: 4.2 },
    { id: 22, name: "Electric Toothbrush", price: 39.99, category: "beauty", image: "img/toothbrush.jpg", rating: 4.4 },
    { id: 23, name: "Foundation", price: 19.99, category: "beauty", image: "img/foundation.jpg", rating: 4.6 },
    { id: 24, name: "Sunscreen", price: 14.99, category: "beauty", image: "img/sunscreen.jpg", rating: 4.3 },
    { id: 25, name: "Gaming Chair", price: 249.99, category: "home", image: "img/gamingchair.jpg", rating: 4.7 },
    { id: 26, name: "T-Shirt", price: 24.99, category: "clothing", image: "img/tee.jpg", rating: 4.1 },
    { id: 27, name: "Sweater", price: 39.99, category: "clothing", image: "img/sweater.jpg", rating: 3.8 },
    { id: 28, name: "Washing Machine", price: 399.99, category: "home", image: "img/washingmachine.jpg", rating: 4.6 },
    { id: 29, name: "Couch", price: 799.99, category: "home", image: "img/couch.jpg", rating: 4.5 },
    { id: 30, name: "Headband", price: 14.99, category: "clothing", image: "img/headband.jpg", rating: 3.7 } 
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
let orders = JSON.parse(localStorage.getItem("orders")) || [];

function displayProducts() {
    const productList = document.getElementById("product-list");
    if (!productList) return;
    productList.innerHTML = "";


    const categoryFilter = document.getElementById("category").value;
    const priceFilter = document.getElementById("price").value;
    const ratingFilter = document.getElementById("rating").value;
    const searchQuery = document.getElementById("search").value.toLowerCase();

    products.forEach(product => {
        let displayProduct = true;

        
        if (categoryFilter !== "all" && product.category !== categoryFilter) {
            displayProduct = false;
        }

        
        if (priceFilter !== "all") {
            if (priceFilter === "under-50" && product.price > 50) displayProduct = false;
            if (priceFilter === "50-100" && (product.price < 50 || product.price > 100)) displayProduct = false;
            if (priceFilter === "100-200" && (product.price < 100 || product.price > 200)) displayProduct = false;
            if (priceFilter === "200-plus" && product.price <= 200) displayProduct = false;
        }

        
        if (ratingFilter !== "all" && product.rating < ratingFilter) {
            displayProduct = false;
        }

        
        if (!product.name.toLowerCase().includes(searchQuery)) {
            displayProduct = false;
        }

        
        if (displayProduct) {
            const productCard = document.createElement("div");
            productCard.classList.add("product-card");
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p class="price">$${product.price}</p>
                <p class="rating">${"⭐".repeat(Math.floor(product.rating))}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
                <button onclick="addToWishlist(${product.id})" id="wishlist-btn-${product.id}">
                    ${wishlist.some(item => item.id === product.id) ? "Added to Wishlist" : "Add to Wishlist"}
                </button>
            `;
            productList.appendChild(productCard);
        }
    });
}


function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product && !cart.some(p => p.id === productId)) {
        cart.push({ ...product, quantity: 1 });
        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${product.name} added to cart.`);
        updateCartPage(); 
    } else {
        alert("This product is already in the cart.");
    }
}


function addToWishlist(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        
        if (!wishlist.some(p => p.id === productId)) {
            wishlist.push(product);
            localStorage.setItem("wishlist", JSON.stringify(wishlist));
            alert(`${product.name} added to wishlist.`);
            updateWishlistPage(); 

            document.getElementById(`wishlist-btn-${productId}`).innerText = "Added to Wishlist";
        } else {
            alert("This product is already in the wishlist.");
        }
    }
}

function updateWishlistPage() {
    const wishlistItemsContainer = document.getElementById("wishlist-items");

    if (!wishlistItemsContainer) return; 

    if (wishlist.length === 0) {
        wishlistItemsContainer.innerHTML = "<p>No items found in wishlist.</p>";
    } else {
        wishlistItemsContainer.innerHTML = wishlist.map(product => `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p class="price">$${product.price}</p>
                <button onclick="moveToCart(${product.id})">Move to Cart</button> <!-- Move to Cart button -->
            </div>
        `).join("");
    }
}


function moveToCart(productId) {
    const product = wishlist.find(p => p.id === productId);
    if (product) {
        if (!cart.some(p => p.id === productId)) {
            cart.push({ ...product, quantity: 1 }); 
            localStorage.setItem("cart", JSON.stringify(cart));
        }

        wishlist = wishlist.filter(p => p.id !== productId);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));

        alert(`${product.name} has been moved to the cart.`);

        updateCartPage();
        updateWishlistPage();
    }
}

function updateCartPage() {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("total-price");

    if (!cartItemsContainer || !cartTotal) return; 
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>No items found in cart.</p>";
        cartTotal.textContent = "0.00";
    } else {
        cartItemsContainer.innerHTML = cart.map(product => `
            <div class="cart-item">
                <img src="${product.image}" alt="${product.name}">
                <p>${product.name}</p>
                <p>$${product.price}</p>
                <div class="quantity">
                    <button onclick="changeQuantity(${product.id}, 'decrease')">-</button>
                    <span>${product.quantity}</span>
                    <button onclick="changeQuantity(${product.id}, 'increase')">+</button>
                </div>
                <button onclick="removeFromCart(${product.id})">Remove</button>
            </div>
        `).join("");

        const total = cart.reduce((sum, product) => sum + (product.price * product.quantity), 0);
        cartTotal.textContent = total.toFixed(2);
    }
}

function changeQuantity(productId, action) {
    const product = cart.find(p => p.id === productId);
    if (product) {
        if (action === 'increase') {
            product.quantity++;
        } else if (action === 'decrease' && product.quantity > 1) {
            product.quantity--;
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartPage(); 
    }
}



function removeFromCart(productId) {
        cart = cart.filter(p => p.id !== productId);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartPage(); 
}
    


function placeOrder() {
    if (cart.length === 0) {
        alert("Your cart is empty. Add items to the cart first.");
        return;
    }

    const currentDate = new Date().toLocaleString();
    const orderWithDate = cart.map(product => ({ 
        ...product, 
        date: currentDate 
    }));
    
    orders = [...orders, ...orderWithDate];
    localStorage.setItem("orders", JSON.stringify(orders));
    cart = []; 
    localStorage.setItem("cart", JSON.stringify(cart)); 
    alert("Order placed successfully!");
    updateOrdersPage();
    updateCartPage();
    const cartTotal = document.getElementById("total-price");
    if (cartTotal) cartTotal.textContent = '0.00';
}


function updateOrdersPage() {
    const orderListContainer = document.getElementById("order-list");

    if (!orderListContainer) return;

    if (orders.length === 0) {
        orderListContainer.innerHTML = "<p>No orders found.</p>";
    } else {
        orderListContainer.innerHTML = orders.map(order => `
            <div class="product-card">
                <img src="${order.image}" alt="${order.name}">
                <h3>${order.name}</h3>
                <p class="price">$${order.price}</p>
                <p class="order-date">${order.date}</p>
            </div>
        `).join("");
    }
}


function filterProducts() {
    displayProducts();
}


window.onload = function() {
    console.log("Loaded Wishlist: ", wishlist);  
    if (document.getElementById("product-list")) displayProducts();
    if (document.getElementById("cart-items")) updateCartPage();
    if (document.getElementById("wishlist-items")) updateWishlistPage();
    if (document.getElementById("order-list")) updateOrdersPage();
};
