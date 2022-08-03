import './modules/swiper.js';
import { headroomHeader } from './modules/headroom.js';
import { runNavigation } from './modules/navigation.js';
import { headerHeight } from './modules/functions.js';
import { md, lg } from './modules/breakpoints.js';

/* ========================================================================================================================== */
history.scrollRestoration = "manual";
window.onbeforeunload = function () {
  window.scrollTo(0,0);
};


headerHeight();

headroomHeader(lg);

runNavigation({ backdrop: '_active' });

runNavigation({
  mainClass: '.mobile-search',
  openBtn: '.nav-search-buttons__open',
  closeBtn: '.nav-search-buttons__close',
  backdrop: true,
  scrollBlock: false,
  focusElement: '.nav-search-input',
});

