const productsContainer = document.getElementById("productsContainer");
const searchInput = document.getElementById("searchInput");
const favouriteCount = document.getElementById("favouriteCount");
const loading = document.getElementById("loading");
const errorMessage = document.getElementById("error");

let products = [];
let favourites = [];

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
function showProducts(productsToShow) {
  if (productsToShow.length === 0) {
    productsContainer.innerHTML = "<p>No products found.</p>";
    return;
  }

  productsContainer.innerHTML = productsToShow
    .map(
      (product) => `
        <div class="product-card">
            <img 
                src="${product.thumbnail}" 
                alt="${product.title}"
            >
            <h2>${product.title}</h2>

            <p class="product-price">
                $${product.price}
            </p>
            <button
                class="favourite-button ${
                  favourites.includes(product.id) ? "active" : ""
                }"
                onclick="toggleFavourite(${product.id})"
            >
                ${
                  favourites.includes(product.id)
                    ? "Remove Favourite"
                    : "Add Favourite"
                }
            </button>

        </div>
    `,
    )
    .join("");
}
function toggleFavourite(productId) {
  if (favourites.includes(productId)) {
    favourites = favourites.filter((id) => id !== productId);
  } else {
    favourites.push(productId);
  }

  favouriteCount.textContent = favourites.length;

  searchProducts();
}
function searchProducts() {
  const searchText = searchInput.value.toLowerCase();

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchText),
  );

  showProducts(filteredProducts);
}

searchInput.addEventListener("input", searchProducts);

getProducts();
