import 'regenerator-runtime'; 
import '../styles/main.css';
import '../styles/responsive.css';
import DATA from '../public/data/DATA.json';

console.log('Hello Coders! :)');

const renderRestaurants = () => {
    const restaurantsContainer = document.getElementById('restaurants');
    DATA.restaurants.forEach((restaurant) => {
        const restaurantElement = document.createElement('div');
        restaurantElement.className = 'restaurant-item';
        restaurantElement.innerHTML = `
            <div class="restaurant-image-container">
                <img src="${restaurant.pictureId}" alt="${restaurant.name}">
                <span class="restaurant-city">📍 ${restaurant.city}</span>
            </div>
            <div class="restaurant-info">
                <div class="restaurant-header">
                    <h2 class="restaurant-name">${restaurant.name}</h2>
                    <p class="restaurant-rating">⭐ ${restaurant.rating}</p>
                </div>
                <p class="restaurant-description">${restaurant.description.slice(0, 150)}...</p>
            </div>
        `;
        restaurantsContainer.appendChild(restaurantElement);
    });
};

document.addEventListener('DOMContentLoaded', () => {
    const drawerToggle = document.querySelector('.drawer-toggle');
    const drawerClose = document.querySelector('.drawer-close');
    const navMenu = document.querySelector('.nav-menu');

    drawerToggle.addEventListener('click', () => {
        navMenu.classList.add('active');
    });

    drawerClose.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });

    document.addEventListener('click', (event) => {
        if (!navMenu.contains(event.target) && !drawerToggle.contains(event.target)) {
            navMenu.classList.remove('active');
        }
    });

    renderRestaurants();
});