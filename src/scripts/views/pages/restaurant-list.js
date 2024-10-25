import RestaurantSource from '../../data/restaurant-source';
import { createRestaurantItemTemplate } from '../templates/template-creator';
import Testimonials from '../components/testimonials';

const RestaurantList = {
  async render() {
    return `
      <section class="hero" aria-label="Hero banner">
        <div class="hero-content">
          <h2>Temukan Restoran Menakjubkan</h2>
          <p>Temukan pengalaman bersantap terbaik di daerah Anda dengan Cita Rasa, pencari restoran terbaik Anda.</p>
        </div>
      </section>

      <section class="content">
        <div class="content-label">
          <h2>Jelajahi Restoran</h2>
        </div>
        <div id="restaurants" class="restaurants">
        </div>
      </section>

      <section class="testimonials" id="testimonials">
        <div class="content-label">
          <h2>Apa Kata Pengguna Kami</h2>
        </div>
        <div id="testimonialsContainer"></div>
      </section>
    `;
  },

  async afterRender() {
    await this._renderRestaurants();
    this._initTestimonials();
  },

  async _renderRestaurants() {
    try {
      const restaurants = await RestaurantSource.restaurantList();
      const restaurantsContainer = document.querySelector('#restaurants');
      restaurants.forEach((restaurant) => {
        restaurantsContainer.innerHTML += createRestaurantItemTemplate(restaurant);
      });
    } catch (error) {
      console.error('Error loading restaurants:', error);
    }
  },

  _initTestimonials() {
    const testimonialsContainer = document.querySelector('#testimonialsContainer');
    const testimonials = new Testimonials({
      container: testimonialsContainer,
    });
    testimonials.init();
  },
};

export default RestaurantList;