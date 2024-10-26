import RestaurantSource from '../../data/restaurant-source';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const Home = {
  currentTestimonialIndex: 0,

  async render() {
    return `
      <section class="hero" aria-label="hero banner">
          <div class="hero__inner">
              <h2 class="hero__title">Welcome to Cita Rasa</h2>
              <p class="hero__tagline">Discover the finest dining experiences near you</p>
          </div>
      </section>
      <div class="content">
        <h2 class="content__heading">Explore Restaurants</h2>
        <div id="restaurants" class="restaurants">
          <div class="loader-container">
            <div class="loader"></div>
            <p class="loader-text">Loading restaurants...</p>
          </div>
        </div>
      </div>
      <section class="testimonials">
        <h2 class="testimonials__heading">What People Say</h2>
        <div id="testimonialContainer" class="testimonial-container">
          <div class="loader-container">
            <div class="loader"></div>
            <p class="loader-text">Loading testimonials...</p>
          </div>
        </div>
      </section>
    `;
  },

  async afterRender() {
    const restaurantsContainer = document.querySelector('#restaurants');
    const testimonialContainer = document.querySelector('#testimonialContainer');

    try {
      const restaurants = await RestaurantSource.list();

      if (restaurants.length === 0) {
        restaurantsContainer.innerHTML = `
          <div class="restaurant-item__not__found">
            <i class="fa-solid fa-utensils"></i>
            <p>No restaurants found</p>
          </div>
        `;
        return;
      }

      restaurantsContainer.innerHTML = '';
      restaurants.forEach((restaurant) => {
        restaurantsContainer.innerHTML += createRestaurantItemTemplate(restaurant);
      });
    } catch (error) {
      console.error('Error:', error);
      restaurantsContainer.innerHTML = `
        <div class="error">
          <i class="fa-solid fa-triangle-exclamation"></i>
          <p>Failed to load restaurants</p>
          <p>Please check your connection and try again</p>
          <button class="error-button" onclick="location.reload()">
            <i class="fa-solid fa-rotate"></i> Retry
          </button>
        </div>
      `;
    }

    try {
      const response = await fetch('/data/testimoni.json');
      if (!response.ok) throw new Error('Failed to fetch testimonials');

      const data = await response.json();
      const testimonials = data.testimonials;

      const updateTestimonial = () => {
        const testimonial = testimonials[this.currentTestimonialIndex];
        testimonialContainer.innerHTML = `
          <div class="testimonial-card">
            <div class="testimonial-rating">
              ${Array(testimonial.rating).fill('⭐').join('')}
            </div>
            <p class="testimonial-text">"${testimonial.comment}"</p>
            <div class="testimonial-author">
              <p class="author-name">${testimonial.name}</p>
              <p class="testimonial-date">${new Date(testimonial.date).toLocaleDateString('id-ID')}</p>
            </div>
          </div>
          <button id="nextTestimonial" class="testimonial-button" aria-label="Next testimonial">
            <i class="fa-solid fa-arrow-right"></i>
          </button>
        `;

        document.querySelector('#nextTestimonial').addEventListener('click', () => {
          this.currentTestimonialIndex = (this.currentTestimonialIndex + 1) % testimonials.length;
          updateTestimonial();
        });
      };

      updateTestimonial();

    } catch (error) {
      console.error('Error loading testimonials:', error);
      testimonialContainer.innerHTML = `
        <div class="error">
          <i class="fa-solid fa-triangle-exclamation"></i>
          <p>Failed to load testimonials</p>
          <button class="error-button" onclick="location.reload()">
            <i class="fa-solid fa-rotate"></i> Retry
          </button>
        </div>
      `;
    }
  },
};

export default Home;