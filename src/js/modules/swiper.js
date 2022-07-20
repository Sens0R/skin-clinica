import Swiper, {
  Navigation,
  Pagination,
  Keyboard,
  Autoplay,
  EffectFade
} from 'swiper';

const swiper = new Swiper('.swiper', {
  // configure Swiper to use modules
  modules: [Navigation, Pagination, Keyboard, Autoplay, EffectFade],
  // Optional parameters
  direction: 'horizontal',
  
  grabCursor: true,
  speed: 500,
  autoplay: {
    delay: 4000,
  },
  effect: 'fade',
  fadeEffect: {
    crossFade: true
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
