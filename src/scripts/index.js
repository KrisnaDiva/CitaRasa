import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.css';
import '../styles/responsive.css';

console.log('Hello Coders! :)');

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

    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
        if (!navMenu.contains(event.target) && !drawerToggle.contains(event.target)) {
            navMenu.classList.remove('active');
        }
    });
});