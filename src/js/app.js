import { isWebP } from './modules/functions.js';
import { burger, animateCSS } from './modules/burger.js';
import './modules/swiper.js';

isWebP();
burger();

const openSearch = document.querySelector("[data-search='open']");
const closeSearch = document.querySelector("[data-search='close']");

openSearch.addEventListener('click', function () {
  const mobileSearch = document.querySelector('.mobile-search');
  mobileSearch.classList.add('_active');
  animateCSS('.mobile-search', 'slideInLeft');
  animateCSS('.mobile-search', 'faster');
  document.querySelector('.nav-search__body').focus();

  closeSearch.addEventListener('click', function () {
    mobileSearch.classList.remove('_active');
    animateCSS('.mobile-search', 'slideOutRight');
    animateCSS('.mobile-search', 'faster');
  });
});

// TODO MAKE GLOBAL RESIZE FUNCTIONS
// TODO MAKE GLOBAL BACKDROP FUNCTION
// TODO MAKE GLOBAL ANIMATION FUNCTION
