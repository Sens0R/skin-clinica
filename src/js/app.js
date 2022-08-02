import './modules/swiper.js';
import { headroomHeader } from './modules/headroom.js';
import { runNavigation } from './modules/navigation.js';
import { headerHeight } from './modules/on-resize.js';
import { md, lg } from './modules/breakpoints.js';

/* ========================================================================================================================== */

headerHeight();

headroomHeader(lg);

runNavigation({ backdrop: '_active', focusElement: '.nav-menu__shop-link' });

runNavigation({
  mainClass: '.mobile-search',
  openBtn: '.nav-search-buttons__open',
  closeBtn: '.nav-search-buttons__close',
  backdrop: true,
  scrollBlock: false,
  focusElement: '.nav-search-input',
});
