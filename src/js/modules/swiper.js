import Swiper, { Navigation, Pagination, Keyboard, Autoplay } from 'swiper';

const swiperShop = new Swiper('.swiper.swiper-shop', {
  modules: [Navigation, Pagination, Keyboard, Autoplay],
  pagination: {
    el: '.swiper-pagination-shop',
    clickable: true,
  },
  loop: true,

  autoplay: {
    delay: 4000,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-btn--right-shop',
    prevEl: '.swiper-btn--left-shop',
  },

  // Default parameters
  slidesPerView: 1,
  spaceBetween: 10,
  // Responsive breakpoints
  breakpoints: {
    // when window width is >=  575.98px
    575.98: {
      slidesPerView: 4,
      slidesPerGroup: 4,
      spaceBetween: 10,
      speed: 500,
    },

    // when window width is >= 767.98px
    1199.98: {
      slidesPerView: 4,
      slidesPerGroup: 4,
      spaceBetween: 30,
      speed: 2000,
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
    delay: 4000,
  },
  speed: 1000,
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
