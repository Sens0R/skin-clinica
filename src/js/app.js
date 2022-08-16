import './modules/swiper.js';
import { fixedHeader, headroomHeader } from './modules/headers.js';
import { runNavigation } from './modules/navigation.js';
import { md, lg, sm } from './modules/breakpoints.js';
import { useElementSize } from './modules/functions.js';

//fixedHeader();
fixedHeader(lg);
runNavigation({ smartFullscreen: true });

runNavigation({
  mainClass: '.mobile-search',
  openBtn: '.nav-search-buttons__open',
  closeBtn: '.nav-search-buttons__close',
  focusElement: '.nav-search-input',
  animationOpen: 'fadeIn',
  animationSpeed: 'faster',
  copySize: '.header',
});

// tabs 

const tabs = document.querySelectorAll('[data-tab-target');
const tabContents = document.querySelectorAll('[data-tab-content]');
const tabItems = document.querySelectorAll('.tab-nav-list__item');

tabs.forEach((tab) => {
  tab.addEventListener('mouseenter', () => {
    const target = document.querySelector(tab.dataset.tabTarget);
    tabContents.forEach((tabContent) => tabContent.classList.remove('_active'));
    target.classList.add('_active');
    tabItems.forEach((tabItem) => tabItem.classList.remove('_active'));
    tab.classList.add('_active');
  });
});
