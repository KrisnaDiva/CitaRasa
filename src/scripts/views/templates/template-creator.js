const createRestaurantItemTemplate = (restaurant) => {
  const imgUrl = restaurant.pictureId
    ? `https://restaurant-api.dicoding.dev/images/medium/${restaurant.pictureId}`
    : '/images/placeholder-restaurant.jpg';

  return `
    <a href="#/detail/${restaurant.id}" class="restaurant-item">
      <img 
        data-src="${imgUrl}" 
        alt="restoran ${restaurant.name}" 
        class="restaurant-img lazyload"
        loading="lazy"
        onerror="this.onerror=null;this.src='/images/placeholder-restaurant.jpg';"
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
        <p class="restaurant-description">${restaurant.description ? `${restaurant.description.slice(0, 100)}...` : 'No description available'}</p>
      </div>
    </a>
  `;
};

const createRestaurantDetailTemplate = (restaurant) => {
  if (!restaurant) {
    return `
      <div class="error-container">
        <div class="error">
          <i class="fa-solid fa-triangle-exclamation"></i>
          <p>Restaurant data is currently unavailable</p>
          <p>You appear to be offline. Please check your connection and try again.</p>
          <button class="error-button" onclick="location.reload()">
            <i class="fa-solid fa-rotate"></i> Retry
          </button>
        </div>
      </div>
    `;
  }

  const imgUrl = restaurant.pictureId
    ? `https://restaurant-api.dicoding.dev/images/large/${restaurant.pictureId}`
    : '/images/placeholder-restaurant.jpg';

  return `
    <div class="restaurant-detail">
      <div class="detail-hero" style="background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${imgUrl}')">
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

      <div class="detail-content" id="mainContent" tabindex="-1">
        <section class="detail-section">
          <h3><i class="fa-solid fa-utensils"></i> Categories</h3>
          <div class="categories-list">
            ${restaurant.categories ? restaurant.categories.map((category) => `
              <span class="category-tag">${category.name}</span>
            `).join('') : '<span class="category-tag">No categories available</span>'}
          </div>
        </section>

        <section class="detail-section">
          <h3><i class="fa-solid fa-quote-left"></i> Description</h3>
          <p class="restaurant-description">${restaurant.description || 'No description available'}</p>
        </section>

        <section class="detail-section">
          <h3><i class="fa-solid fa-book-open"></i> Menu</h3>
          <div class="menu-container">
            <div class="menu-column">
              <h4><i class="fa-solid fa-bowl-food"></i> Foods</h4>
              <ul class="menu-list">
                ${restaurant.menus && restaurant.menus.foods ? restaurant.menus.foods.map((food) => `
                  <li>${food.name}</li>
                `).join('') : '<li>No food menu available</li>'}
              </ul>
            </div>
            <div class="menu-column">
              <h4><i class="fa-solid fa-glass-water"></i> Drinks</h4>
              <ul class="menu-list">
                ${restaurant.menus && restaurant.menus.drinks ? restaurant.menus.drinks.map((drink) => `
                  <li>${drink.name}</li>
                `).join('') : '<li>No drinks menu available</li>'}
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
            ${restaurant.customerReviews ? restaurant.customerReviews.map((review) => `
              <div class="review-card">
                <div class="review-header">
                  <img 
                    src="https://ui-avatars.com/api/?name=${review.name}&background=random" 
                    alt="${review.name}"
                    class="review-avatar"
                    onerror="this.onerror=null;this.src='/images/default-avatar.jpg';"
                  >
                  <div class="review-info">
                    <p class="review-name">${review.name}</p>
                    <p class="review-date">${review.date}</p>
                  </div>
                </div>
                <p class="review-text">${review.review}</p>
              </div>
            `).join('') : '<p>No reviews available</p>'}
          </div>
        </section>
      </div>
    </div>
  `;
};

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