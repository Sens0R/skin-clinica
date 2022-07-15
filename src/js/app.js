import './modules/swiper.js';
import { isWebP } from './modules/webP.js';
import { runBurger } from './modules/burger.js';
import { breakpoints } from './modules/functions.js';
const { sm, md, lg, xl } = breakpoints;

isWebP();

runBurger();

runBurger({
  mainElement: '.mobile-search',
  openBtn: '.nav-search-btn-open',
  closeBtn: '.nav-search-btn-close',
  breakpoint: md,
  backdrop: true,
  scrollBlock: false,
  focusElement: '.nav-search__body',
});


/*  
  mainElement: // Main element class
  openBtn: // Class that will open main element
  closeBtn: // Class that will close main element
  breakpoint: // media closing breakpoint. use breakpoint object
  backdrop: // true == backdrop default style (transparent), class if you want different backdrop style
  scrollBlock: // body scroll block
  focusElement: // opening animation
  animationOpen: // closing animation
  animationClose: // animation speed
  animationSpeed: // focus on element when you open main element 
  */
