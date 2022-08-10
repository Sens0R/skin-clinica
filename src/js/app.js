import './modules/swiper.js';
import { fixedHeader, headroomHeader } from './modules/headers.js';
import { runNavigation } from './modules/navigation.js';
import { md, lg, sm } from './modules/breakpoints.js';

//fixedHeader();
fixedHeader(lg);
runNavigation({mobileScrollBlock: true});

runNavigation({
  mainClass: '.mobile-search',
  openBtn: '.nav-search-buttons__open',
  closeBtn: '.nav-search-buttons__close',
  focusElement: '.nav-search-input',
  animationOpen: 'fadeIn',
  animationSpeed: 'faster',
});
