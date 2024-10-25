import TESTIMONI from '../../../public/data/TESTIMONI.json';

class Testimonials {
  constructor({ container }) {
    this.container = container;
    this.testimonials = TESTIMONI.testimonials;
    this.currentIndex = 0;
    this.autoAdvanceInterval = null;
  }

  init() {
    this._render();
    this._initControls();
    this._startAutoAdvance();
  }

  _render() {
    this.container.innerHTML = `
      <div class="testimonials-carousel">
        <div id="testimonialContent"></div>
        <div class="testimonial-navigation">
          <button class="prev-testimonial" aria-label="Previous testimonial">
            <i class="fa-solid fa-chevron-left"></i>
          </button>
          <button class="next-testimonial" aria-label="Next testimonial">
            <i class="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </div>
    `;
    this._renderTestimonial();
  }

  _renderTestimonial() {
    const testimonial = this.testimonials[this.currentIndex];
    const testimonialContent = this.container.querySelector('#testimonialContent');

    testimonialContent.innerHTML = `
      <div class="testimonial-item">
        <img 
          src="https://picsum.photos/seed/${testimonial.name}/200" 
          alt="Photo of ${testimonial.name}" 
          class="testimonial-avatar"
          loading="lazy"
        >
        <p class="testimonial-comment">"${testimonial.comment}"</p>
        <div class="testimonial-info">
          <p class="testimonial-name">${testimonial.name}</p>
          <p class="testimonial-rating">
            ${this._createRatingStars(testimonial.rating)}
          </p>
          <p class="testimonial-date">${this._formatDate(testimonial.date)}</p>
        </div>
      </div>
    `;
  }

  _initControls() {
    const prevButton = this.container.querySelector('.prev-testimonial');
    const nextButton = this.container.querySelector('.next-testimonial');
    const carousel = this.container.querySelector('.testimonials-carousel');

    prevButton.addEventListener('click', () => this._prev());
    nextButton.addEventListener('click', () => this._next());

    carousel.addEventListener('mouseenter', () => this._stopAutoAdvance());
    carousel.addEventListener('mouseleave', () => this._startAutoAdvance());
    carousel.addEventListener('keydown', (event) => this._handleKeyboard(event));
  }

  _prev() {
    this.currentIndex = (this.currentIndex - 1 + this.testimonials.length) % this.testimonials.length;
    this._renderTestimonial();
  }

  _next() {
    this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
    this._renderTestimonial();
  }

  _startAutoAdvance() {
    this.autoAdvanceInterval = setInterval(() => this._next(), 5000);
  }

  _stopAutoAdvance() {
    clearInterval(this.autoAdvanceInterval);
  }

  _handleKeyboard(event) {
    if (event.key === 'ArrowLeft') {
      this._prev();
    } else if (event.key === 'ArrowRight') {
      this._next();
    }
  }

  _createRatingStars(rating) {
    const fullStar = '<i class="fa-solid fa-star"></i>';
    const emptyStar = '<i class="fa-regular fa-star"></i>';
    return Array(5).fill('').map((_, index) =>
      index < rating ? fullStar : emptyStar
    ).join('');
  }

  _formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  }
}

export default Testimonials;