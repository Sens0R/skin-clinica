import { isWebP } from './modules/webP.js';
import { runBurger } from './modules/burger.js';
import './modules/swiper.js';
import { breakpoint } from './modules/functions.js';

isWebP();

runBurger();

runBurger(
  '.mobile-search',
  '.nav-search-btn-open',
  '.nav-search-btn-close',
  breakpoint.lg,
  true,
  false,
  '.nav-search__body',
  'slideInDown',
  'slideOutUp',
  'faster'
);

/* runBurger(
  targetElement,   // Main element class
  openBtnElement,  // Class that will open
  closeBtnElement, // Class that will close
  false, // media closing breakpoint. use breakpoint object
  false, // true == backdrop default style (transparent), class if you want different backdrop style or animations
  bodyOverflow, // scroll lock on other elements
  openAnimation, // opening animation
  closeAnimation, // closing animation
  animationSpeed, // animation speed
  focusElement // focus on element when you open
); */
