import Swiper, { Navigation, Pagination, Keyboard, Autoplay } from 'swiper';

const swiperShop = new Swiper('.swiper.swiper-shop', {
  modules: [Navigation, Pagination, Keyboard],
  pagination: {
    el: '.swiper-pagination-shop',
    clickable: true,
  },
  loop: true,

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-btn--right-shop',
    prevEl: '.swiper-btn--left-shop',
  },

  // Default parameters
  slidesPerView: 1,

  // Responsive breakpoints
  breakpoints: {
    // when window width is >=  575.98px
    575.98: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    // when window width is >= 767.98px
    767.98: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    // when window width is >= 767.98px
    1199.98: {
      slidesPerView: 4,
      spaceBetween: 40,
    },
  },

  direction: 'horizontal',

  pagination: {
    el: '.swiper-pagination-shop',
    clickable: true,
  },

  keyboard: {
    enabled: true,
    onlyVisible: true,
    pageUpDown: true,
  },
});

const swiper = new Swiper('.swiper.swiper-testimonials', {
  // configure Swiper to use modules
  modules: [Navigation, Pagination, Keyboard, Autoplay],
  // Optional parameters
  direction: 'horizontal',
  grabCursor: true,
  loop: true,

  autoplay: {
    delay: 5000,
  },

  // If we need pagination
  pagination: {
    el: '.swiper-pagination-testimonials',
    clickable: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-btn--right-testimonials',
    prevEl: '.swiper-btn--left-testimonials',
  },

  keyboard: {
    enabled: true,
    onlyVisible: true,
    pageUpDown: true,
  },
});
