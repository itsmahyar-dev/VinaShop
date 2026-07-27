document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // MOBILE NAVIGATION
  // ==========================================

  const menuBtn = document.querySelector(".menu-btn");

  const navbar = document.querySelector(".navbar");

  const navLinks = document.querySelectorAll(".nav-list a");

  // Open / Close mobile menu
  if (menuBtn && navbar) {
    menuBtn.addEventListener("click", () => {
      navbar.classList.toggle("show");

      const icon = menuBtn.querySelector("i");

      if (icon) {
        if (navbar.classList.contains("show")) {
          icon.classList.remove("fa-bars");

          icon.classList.add("fa-xmark");
        } else {
          icon.classList.remove("fa-xmark");

          icon.classList.add("fa-bars");
        }
      }
    });

    // Close menu after clicking a link
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navbar.classList.remove("show");

        const icon = menuBtn.querySelector("i");

        if (icon) {
          icon.classList.remove("fa-xmark");

          icon.classList.add("fa-bars");
        }
      });
    });
  }

  // ==========================================
  // WISHLIST
  // ==========================================

  const wishlistButtons = document.querySelectorAll(".wishlist-btn");

  const wishlistBadge = document.querySelector(".wishlist-header-btn span");

  wishlistButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      const isLiked = btn.classList.toggle("liked");

      const icon = btn.querySelector("i");

      if (icon) {
        if (isLiked) {
          icon.classList.remove("far");

          icon.classList.add("fas");
        } else {
          icon.classList.remove("fas");

          icon.classList.add("far");
        }
      }

      // Update wishlist badge
      if (wishlistBadge) {
        const likedCount = document.querySelectorAll(
          ".wishlist-btn.liked",
        ).length;

        wishlistBadge.textContent = likedCount;
      }
    });
  });

  // ==========================================
  // SHOPPING CART
  // ==========================================

  const addCartButtons = document.querySelectorAll(".add-cart");

  const cartBadge = document.querySelector(".cart-btn span");

  addCartButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Add product
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
      }

      // Remove product
      else {
        btn.classList.remove("added");

        btn.innerHTML = `
            <i class="fas fa-shopping-bag"></i>
            Add To Cart
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
  // PRODUCT SEARCH
  // ==========================================

  const searchForm = document.querySelector(".search-box");

  const searchInput = document.querySelector(".search-box input");

  const products = document.querySelectorAll(".product-card");

  // Search while typing
  if (searchInput && products.length > 0) {
    searchInput.addEventListener("input", () => {
      filterProducts();
    });
  }

  // Search button
  if (searchForm && searchInput) {
    searchForm.addEventListener("submit", (e) => {
      // Prevent refresh
      e.preventDefault();

      // Filter products
      const matchedProducts = filterProducts();

      // Scroll to first result
      if (matchedProducts.length > 0) {
        matchedProducts[0].scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    });
  }

  // ==========================================
  // FILTER PRODUCTS
  // ==========================================

  function filterProducts() {
    const value = searchInput.value.toLowerCase().trim();

    const matchedProducts = [];

    products.forEach((product) => {
      // Product title
      const title =
        product
          .querySelector(".product-content h3")
          ?.textContent.toLowerCase() || "";

      // Product category
      const category =
        product.querySelector(".product-category")?.textContent.toLowerCase() ||
        "";

      // Check product match
      const isMatch =
        value === "" || title.includes(value) || category.includes(value);

      if (isMatch) {
        product.style.display = "flex";

        // Add only when search is not empty
        if (value !== "") {
          matchedProducts.push(product);
        }
      } else {
        product.style.display = "none";
      }
    });

    return matchedProducts;
  }
});
