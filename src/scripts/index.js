import 'regenerator-runtime'; 
import '../styles/main.css';
import '../styles/responsive.css';
import DATA from '../public/data/DATA.json';

const renderRestaurants = () => {
    const restaurantsContainer = document.getElementById('restaurants');
    DATA.restaurants.forEach((restaurant) => {
        const restaurantElement = document.createElement('div');
        restaurantElement.className = 'restaurant-item';
        restaurantElement.innerHTML = `
            <div class="restaurant-image-container">
                <img src="${restaurant.pictureId}" alt="Gambar restoran ${restaurant.name}">
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
    const navMenu = document.querySelector('.nav-menu');

    const toggleMenu = () => {
        const isExpanded = drawerToggle.getAttribute('aria-expanded') === 'true';
        drawerToggle.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('active');
    };

    drawerToggle.addEventListener('click', toggleMenu);

    drawerToggle.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggleMenu();
        }
    });

    document.addEventListener('click', (event) => {
        if (!navMenu.contains(event.target) && !drawerToggle.contains(event.target)) {
            navMenu.classList.remove('active');
            drawerToggle.setAttribute('aria-expanded', 'false');
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            drawerToggle.setAttribute('aria-expanded', 'false');
            drawerToggle.focus();
        }
    });

    navMenu.addEventListener('keydown', (event) => {
        if (event.key === 'Tab') {
            const focusableElements = navMenu.querySelectorAll('a, button');
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (event.shiftKey && document.activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus();
            } else if (!event.shiftKey && document.activeElement === lastElement) {
                event.preventDefault();
                firstElement.focus();
            }
        }
    });

    renderRestaurants();
});