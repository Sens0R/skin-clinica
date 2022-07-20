import Swiper, {
  Navigation,
  Pagination,
  Keyboard,
  Autoplay,
 
} from 'swiper';

const swiper = new Swiper('.swiper', {
  // configure Swiper to use modules
  modules: [Navigation, Pagination, Keyboard, Autoplay],
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  grabCursor: true,
  speed: 500,
  autoplay: {
    delay: 4000,
  },
 
  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-btn--left',
    prevEl: '.swiper-btn--right',
  },

  keyboard: {
    enabled: true,
    onlyVisible: true,
    pageUpDown: true,
  },
});
