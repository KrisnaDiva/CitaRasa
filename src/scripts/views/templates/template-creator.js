import CONFIG from '../../globals/config';

const createRestaurantItemTemplate = (restaurant) => `
  <a href="#/detail/${restaurant.id}" class="restaurant-item">
    <img 
      src="${CONFIG.BASE_IMAGE_URL.MEDIUM + restaurant.pictureId}" 
      alt="restoran ${restaurant.name}" 
      class="restaurant-img"
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
    <div class="detail-hero" style="background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${CONFIG.BASE_IMAGE_URL.LARGE + restaurant.pictureId}')">
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
        <h3><i class="fa-solid fa-comments"></i> Customer Reviews</h3>
        <div class="reviews-container">
          ${restaurant.customerReviews.map((review) => `
            <div class="review-card">
              <div class="review-header">
                <img 
                  src="https://picsum.photos/seed/${review.name}/50" 
                  alt="${review.name}"
                  class="review-avatar"
                  loading="lazy"
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

export { createRestaurantItemTemplate, createRestaurantDetailTemplate };