const productsContainer = document.getElementById("productsContainer");
const searchInput = document.getElementById("searchInput");
const favouriteCount = document.getElementById("favouriteCount");
const loading = document.getElementById("loading");
const error = document.getElementById("error");

let products = [];
let favourites = [];

// Get products from API

async function getProducts() {
  try {
    const response = await fetch("https://dummyjson.com/products");

    if (!response.ok) {
      throw new Error("Failed to load products");
    }

    const data = await response.json();

    products = data.products;

    loading.style.display = "none";

    showProducts(products);
  } catch (error) {
    loading.style.display = "none";

    errorMessage.textContent =
      "Sorry, we could not load the products. Please try again.";
  }
}

// Show products on the page

function showProducts(productsToShow) {
  productsContainer.innerHTML = "";

  if (productsToShow.length === 0) {
    productsContainer.innerHTML = "<p>No products found.</p>";
    return;
  }

  productsToShow.forEach(function (product) {
    const card = document.createElement("div");
    card.classList.add("product-card");

    const image = document.createElement("img");
    image.src = product.thumbnail;
    image.alt = product.title;

    const title = document.createElement("h2");
    title.textContent = product.title;

    const price = document.createElement("p");
    price.classList.add("product-price");
    price.textContent = "$" + product.price;

    const button = document.createElement("button");
    button.classList.add("favourite-button");

    if (favourites.includes(product.id)) {
      button.textContent = "♥ Remove Favourite";
      button.classList.add("active");
    } else {
      button.textContent = "♡ Add Favourite";
    }

    button.addEventListener("click", function () {
      toggleFavourite(product.id);
    });

    card.appendChild(image);
    card.appendChild(title);
    card.appendChild(price);
    card.appendChild(button);

    productsContainer.appendChild(card);
  });
}

// Add or remove favourite

function toggleFavourite(productId) {
  if (favourites.includes(productId)) {
    favourites = favourites.filter(function (id) {
      return id !== productId;
    });
  } else {
    favourites.push(productId);
  }

  favouriteCount.textContent = favourites.length;

  searchProducts();
}

// Search products

function searchProducts() {
  const searchText = searchInput.value.toLowerCase();

  const filteredProducts = products.filter(function (product) {
    return product.title.toLowerCase().includes(searchText);
  });

  showProducts(filteredProducts);
}


searchInput.addEventListener("input", function () {
  searchProducts();
});

getProducts();
