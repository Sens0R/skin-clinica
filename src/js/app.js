import './modules/swiper.js';
import { isWebP } from './modules/webP.js';
import { breakpoint } from './modules/functions.js';
import { runBurger } from './modules/burger.js';
const { sm, md, lg, xl } = breakpoint;

isWebP();

runBurger();

runBurger({
  mainClass: '.mobile-search',
  openBtn: '.nav-search-btn-open',
  closeBtn: '.nav-search-btn-close',
  backdrop: true,
  focusElement: '.nav-search__body',
});

/*  
  mainClass: // Main element class
  openBtn: // Class that will open main element
  closeBtn: // Class that will close main element
  breakpoint: // media closing breakpoint - sm, md, lg, xl variables
  backdrop: // true == backdrop default style (transparent), class if you want different backdrop style
  scrollBlock: // body scroll block
  focusElement: // opening animation
  animationOpen: // closing animation
  animationClose: // animation speed
  animationSpeed: // focus on element when you open main element 
  */
