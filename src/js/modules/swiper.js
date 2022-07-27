import Swiper, { Navigation, Pagination, Keyboard, Autoplay } from 'swiper';

const swiper = new Swiper('.swiper', {
  // configure Swiper to use modules
  modules: [Navigation, Pagination, Keyboard, Autoplay],
  // Optional parameters
  direction: 'horizontal',
  grabCursor: true,
  loop: true,
  autoHeight: true,

  autoplay: {
    delay: 5000,
  },

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
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
