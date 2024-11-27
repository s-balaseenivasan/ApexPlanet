const products = [
    { id: 1, name: 'Laptop', category: 'electronics', price: 899.99, rating: 4.5, image: 'img/laptop.jpg' },
    { id: 2, name: 'Smartphone', category: 'electronics', price: 699.99, rating: 4.7, image: 'img/smartphone.jpg' },
    { id: 3, name: 'Jacket', category: 'clothing', price: 59.99, rating: 4.2, image: 'img/Jacket.png' },
    { id: 4, name: 'Headphones', category: 'electronics', price: 199.99, rating: 4.6, image: 'img/Headphones.jpg' },
    { id: 5, name: 'T-shirt', category: 'clothing', price: 19.99, rating: 4.0, image: 'img/T-shirt.png' },
    { id: 6, name: 'Shoes', category: 'clothing', price: 89.99, rating: 4.3, image: 'img/Shoes.jpg' },
  ];
  
  const productList = document.getElementById('product-listing');
  const categoryFilter = document.getElementById('category');
  const sortFilter = document.getElementById('sort');
  
  // Render products function
  function renderProducts(products) {
    productList.innerHTML = '';
    products.forEach(product => {
      const productCard = document.createElement('div');
      productCard.classList.add('product-card');
      productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>Category: ${product.category}</p>
        <p class="price">$${product.price}</p>
        <p class="rating">Rating: ${product.rating} ★</p>
      `;
      productList.appendChild(productCard);
    });
  }
  
  // Apply filters
  function applyFilters() {
    let filteredProducts = [...products];
  
    // Filter by category
    const selectedCategory = categoryFilter.value;
    if (selectedCategory !== 'all') {
      filteredProducts = filteredProducts.filter(product => product.category === selectedCategory);
    }
  
    // Sort by selected option
    const selectedSort = sortFilter.value;
    if (selectedSort === 'price-asc') {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (selectedSort === 'price-desc') {
      filteredProducts.sort((a, b) => b.price - a.price);
    } else if (selectedSort === 'rating') {
      filteredProducts.sort((a, b) => b.rating - a.rating);
    }
  
    renderProducts(filteredProducts);
  }
  
  // Event listeners for filters
  categoryFilter.addEventListener('change', applyFilters);
  sortFilter.addEventListener('change', applyFilters);
  
  // Initial render
  renderProducts(products);
  