document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // Mobile Navigation
  // ==========================================

  const menuBtn = document.querySelector(".menu-btn");
  const navbar = document.querySelector(".navbar");

  if (menuBtn && navbar) {
    menuBtn.addEventListener("click", () => {
      navbar.classList.toggle("show");

      const icon = menuBtn.querySelector("i");

      if (icon) {
        icon.classList.toggle("fa-bars");
        icon.classList.toggle("fa-xmark");
      }
    });
  }

  // ==========================================
  // Wishlist
  // ==========================================

  const wishlistButtons = document.querySelectorAll(".wishlist-btn");

  wishlistButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      btn.classList.toggle("liked");
    });
  });

  // ==========================================
  // Shopping Cart
  // ==========================================

  const addCartButtons = document.querySelectorAll(".add-cart");
  const cartBadge = document.querySelector(".cart-btn span");

  addCartButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (!btn.classList.contains("added")) {
        btn.classList.add("added");

        btn.innerHTML = `
          <i class="fas fa-check"></i>
          Added
        `;

        if (cartBadge) {
          let currentCount = parseInt(cartBadge.textContent) || 0;

          cartBadge.textContent = currentCount + 1;
        }
      } else {
        btn.classList.remove("added");

        btn.innerHTML = `
          <i class="fas fa-shopping-bag"></i>
          Add to Cart
        `;

        if (cartBadge) {
          let currentCount = parseInt(cartBadge.textContent) || 0;

          if (currentCount > 0) {
            cartBadge.textContent = currentCount - 1;
          }
        }
      }
    });
  });

  // ==========================================
  // Product Search
  // ==========================================

  const searchForm = document.querySelector(".search-box");
  const searchInput = document.querySelector(".search-box input");
  const products = document.querySelectorAll(".product-card");

  if (searchForm && searchInput) {
    // Search while typing
    searchInput.addEventListener("input", () => {
      filterProducts();
    });

    // Search when clicking the button
    searchForm.addEventListener("submit", (e) => {
      // جلوگیری از Refresh شدن صفحه
      e.preventDefault();

      // نمایش نتایج
      filterProducts();

      // خالی کردن Input
      searchInput.value = "";

      // دوباره فوکوس روی Input
      searchInput.focus();
    });
  }

  function filterProducts() {
    const value = searchInput.value.toLowerCase().trim();

    products.forEach((product) => {
      const title =
        product
          .querySelector(".product-content h3")
          ?.textContent.toLowerCase() || "";

      const category =
        product.querySelector(".product-category")?.textContent.toLowerCase() ||
        "";

      if (value === "" || title.includes(value) || category.includes(value)) {
        product.style.display = "flex";
      } else {
        product.style.display = "none";
      }
    });
  }
});
