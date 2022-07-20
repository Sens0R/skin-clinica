import Swiper, { Navigation, Pagination, Keyboard, Autoplay } from 'swiper';

const swiper = new Swiper('.swiper', {
  // configure Swiper to use modules
  modules: [Navigation, Pagination, Keyboard, Autoplay],
  // Optional parameters
  direction: 'horizontal',

  grabCursor: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-btn--right',
    prevEl: '.swiper-btn--left',
  },

  keyboard: {
    enabled: true,
    onlyVisible: true,
    pageUpDown: true,
  },
});
