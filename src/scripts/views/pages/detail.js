import UrlParser from '../../routes/url-parser';
import RestaurantSource from '../../data/restaurant-source';
import { createRestaurantDetailTemplate } from '../templates/template-creator';

const Detail = {
  async render() {
    return `
      <div id="restaurant" class="restaurant"></div>
    `;
  },

  async afterRender() {
    try {
      const url = UrlParser.parseActiveUrlWithoutCombiner();
      const restaurant = await RestaurantSource.detailRestaurant(url.id);
      const restaurantContainer = document.querySelector('#restaurant');
      restaurantContainer.innerHTML = createRestaurantDetailTemplate(restaurant);
    } catch (error) {
      console.error('Error:', error);
      const restaurantContainer = document.querySelector('#restaurant');
      restaurantContainer.innerHTML = `
        <div class="error">
          <p>Error loading restaurant details. Please try again later.</p>
        </div>
      `;
    }
  },
};

export default Detail;