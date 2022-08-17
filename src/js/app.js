import './modules/swiper.js';
import { fixedHeader, headroomHeader } from './modules/headers.js';
import { runNavigation } from './modules/navigation.js';
import { md, lg, sm } from './modules/breakpoints.js';
import { addAnimation } from './modules/functions.js';

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
  const tabNavigation = () => {
    const target = document.querySelector(tab.dataset.tabTarget);
    tabContents.forEach((tabContent) => tabContent.classList.remove('_active'));
    target.classList.add('_active');
    tabItems.forEach((tabItem) => tabItem.classList.remove('_active'));
    tab.classList.add('_active');
  };

  tab.addEventListener('mouseenter', tabNavigation);
  tab.addEventListener('focusin', tabNavigation);
});

const cards = document.querySelector('[data-tab-cards]');
const activeCard = document.getElementsByClassName('tab-card _active');
const activeLink = document.getElementsByClassName(
  'tab-nav-list__item _active'
);

cards.addEventListener('click', () => {
  const currentLink = activeLink[0];
  const nextLink = activeLink[0].nextElementSibling;

  const currentCard = activeCard[0];
  const nextCard = activeCard[0].nextElementSibling;

  if (nextLink && nextCard) {
    currentLink.classList.remove('_active');
    nextLink.classList.add('_active');
    currentCard.classList.remove('_active');
    nextCard.classList.add('_active');
    return;
  }

  if (!nextLink && !nextCard) {
    currentLink.classList.remove('_active');
    currentCard.classList.remove('_active');
    tabContents[0].classList.add('_active');
    tabs[0].classList.add('_active');
  }
});

// tabs mobile intersection 
