import './modules/swiper.js';
import { headroom } from './modules/headroom.js';
import { breakpoint } from './modules/functions.js';
import { runBurger } from './modules/burger.js';

const { sm, md, lg, xl } = breakpoint;
headroom.init();

const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  if (window.scrollY === 0) {
    header.classList.remove('headroom-slideDown');
  }
  if (
    window.scrollY + window.innerHeight >=
    document.documentElement.scrollHeight - 50
  ) {
    header.classList.remove('headroom-slideUp');
  }
});

runBurger({ backdrop: '_active', focusElement: '.nav-menu__shop-link' });

runBurger({
  mainClass: '.mobile-search',
  openBtn: '.nav-search-buttons__open',
  closeBtn: '.nav-search-buttons__close',
  backdrop: true,
  scrollBlock: false,
  focusElement: '.nav-search-input',
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
