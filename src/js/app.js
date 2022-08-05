import './modules/swiper.js';
import { customHeader, fixedHeader } from './modules/headers.js';
import { runNavigation } from './modules/navigation.js';
import { md, lg, sm } from './modules/breakpoints.js';

/* ========================================================================================================================== */
/*  history.scrollRestoration = 'manual';
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};  */

fixedHeader();
//customHeader(lg);

runNavigation({ backdrop: '_active' });

runNavigation({
  mainClass: '.mobile-search',
  openBtn: '.nav-search-buttons__open',
  closeBtn: '.nav-search-buttons__close',
  backdrop: true,
  scrollBlock: false,
  focusElement: '.nav-search-input',
});
