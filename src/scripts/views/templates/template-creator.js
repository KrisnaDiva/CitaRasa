const createRestaurantItemTemplate = (restaurant) => `
  <a href="#/detail/${restaurant.id}" class="restaurant-item">
    <img 
      src="https://restaurant-api.dicoding.dev/images/medium/${restaurant.pictureId}" 
      alt="restoran ${restaurant.name}" 
      class="restaurant-img"
      loading="lazy"
    >
    <div class="restaurant-info">
      <div class="restaurant-header">
        <h2 class="restaurant-name">${restaurant.name}</h2>
        <div class="restaurant-rating">
          <i class="fa-solid fa-star"></i>
          <span>${restaurant.rating}</span>
        </div>
      </div>
      <p class="restaurant-city">
        <i class="fa-solid fa-location-dot"></i>
        ${restaurant.city}
      </p>
      <p class="restaurant-description">${restaurant.description.slice(0, 100)}...</p>
    </div>
  </a>
`;

const createRestaurantDetailTemplate = (restaurant) => `
  <div class="restaurant-detail">
    <div class="detail-hero" style="background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://restaurant-api.dicoding.dev/images/large/${restaurant.pictureId}')">
      <div class="detail-hero-content">
        <h2 class="restaurant-name">${restaurant.name}</h2>
        <div class="restaurant-meta">
          <p class="restaurant-rating">
            <i class="fa-solid fa-star"></i>
            <span>${restaurant.rating}</span>
          </p>
          <p class="restaurant-location">
            <i class="fa-solid fa-location-dot"></i>
            ${restaurant.city}
          </p>
          <p class="restaurant-address">
            <i class="fa-solid fa-map"></i>
            ${restaurant.address}
          </p>
        </div>
      </div>
    </div>

    <div class="detail-content">
      <section class="detail-section">
        <h3><i class="fa-solid fa-utensils"></i> Categories</h3>
        <div class="categories-list">
          ${restaurant.categories.map((category) => `
            <span class="category-tag">${category.name}</span>
          `).join('')}
        </div>
      </section>

      <section class="detail-section">
        <h3><i class="fa-solid fa-quote-left"></i> Description</h3>
        <p class="restaurant-description">${restaurant.description}</p>
      </section>

      <section class="detail-section">
        <h3><i class="fa-solid fa-book-open"></i> Menu</h3>
        <div class="menu-container">
          <div class="menu-column">
            <h4><i class="fa-solid fa-bowl-food"></i> Foods</h4>
            <ul class="menu-list">
              ${restaurant.menus.foods.map((food) => `
                <li>${food.name}</li>
              `).join('')}
            </ul>
          </div>
          <div class="menu-column">
            <h4><i class="fa-solid fa-glass-water"></i> Drinks</h4>
            <ul class="menu-list">
              ${restaurant.menus.drinks.map((drink) => `
                <li>${drink.name}</li>
              `).join('')}
            </ul>
          </div>
        </div>
      </section>

      <section class="detail-section">
        <div class="customer-review">
          <h3>
            <i class="fa-solid fa-comments"></i>
            Customer Reviews
          </h3>
          <form id="reviewForm" class="review-form">
            <div class="form-control">
              <label for="reviewName">Your Name</label>
              <input 
                type="text" 
                id="reviewName" 
                name="name" 
                required 
                placeholder="Enter your name"
              >
            </div>
            <div class="form-control">
              <label for="reviewText">Your Review</label>
              <textarea 
                id="reviewText" 
                name="review" 
                required 
                placeholder="Share your experience..."
              ></textarea>
            </div>
            <button type="submit" class="submit-review">
              <i class="fa-solid fa-paper-plane"></i>
              Submit Review
            </button>
          </form>
        </div>

        <div class="reviews-container">
          ${restaurant.customerReviews.map((review) => `
            <div class="review-card">
              <div class="review-header">
                <img 
                  src="https://ui-avatars.com/api/?name=${review.name}&background=random" 
                  alt="${review.name}"
                  class="review-avatar"
                >
                <div class="review-info">
                  <p class="review-name">${review.name}</p>
                  <p class="review-date">${review.date}</p>
                </div>
              </div>
              <p class="review-text">${review.review}</p>
            </div>
          `).join('')}
        </div>
      </section>
    </div>
  </div>
`;

const createLikeButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
    <i class="fa-regular fa-heart" aria-hidden="true"></i>
  </button>
`;

const createLikedButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa-solid fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createRestaurantItemTemplate,
  createRestaurantDetailTemplate,
  createLikeButtonTemplate,
  createLikedButtonTemplate,
};