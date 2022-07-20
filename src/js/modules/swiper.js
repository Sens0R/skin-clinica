import Swiper, { Navigation, Pagination, Keyboard, Autoplay } from 'swiper';

const swiper = new Swiper('.swiper', {
  // configure Swiper to use modules
  modules: [Navigation, Pagination, Keyboard, Autoplay],
  // Optional parameters
  direction: 'horizontal',
  cssMode: true,
  longSwipes: false,
  autoplay: {
    delay: 5000,
   
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
