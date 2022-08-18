import './modules/swiper.js';
import { fixedHeader, headroomHeader } from './modules/headers.js';
import { runNavigation } from './modules/navigation.js';
import { md, lg, sm } from './modules/breakpoints.js';
import { addAnimation } from './modules/functions.js';
import { set } from 'lodash';

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

tabs.forEach((tab) => {
  const tabNavigation = () => {
    if (tab.classList.contains('_active')) return;

    const target = document.querySelector(tab.dataset.tabTarget);
    tabContents.forEach((tabContent) => tabContent.classList.remove('_active'));
    tabs.forEach((tab) => tab.classList.remove('_active'));
    tab.classList.add('_active');

    if (target.classList.contains('_static')) {
      setTimeout(() => {
        target.classList.add('_active');
      }, 5);
      return;
    }
    
    target.classList.add('_active');
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

function mutationObserver(targetEl) {
  const targetElement = document.getElementById(targetEl);
  let prevClassState = targetElement.classList.contains('_active');
  const tabMutationObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName !== 'class') return;
      const currentClassState = mutation.target.classList.contains('_active');
      if (prevClassState !== currentClassState) {
        prevClassState = currentClassState;

        if (!currentClassState) {
          tabContents.forEach((tabContent) =>
            tabContent.classList.remove('_static')
          );

          mutation.target.classList.add('_static');
        }
      }
    });
  });

  tabMutationObserver.observe(targetElement, { attributes: true });
}

mutationObserver('tab-1');
mutationObserver('tab-2');
mutationObserver('tab-3');
mutationObserver('tab-4');

/* function tabsRender() {
  tabContents.forEach((contentTab) => {
    tabMutationObserver.observe(contentTab, { attributes: true });
  });
}

tabsRender(); */

/* tabContents.forEach((tabContent) => {
  prevClassState = tabContent.classList.contains('_active');
  
}); */

/* ====================   INTERSECTION OBSERVER   ==================== */

/* let tabsObserverOptions = {
  rootMargin: '0px',
  threshold: 0.75,
};

// tabs mobile intersection
let cardChangeInterval;
const tabNav = document.querySelector('.tab-nav');

const tabNavStopInterval = (e) => {
  console.log('timer stopped');
  clearInterval(cardChangeInterval);
  e.stopPropagation();
};
const tabNavResumeInterval = () => {
  console.log('timer resumed');
  cardChangeInterval = setInterval(() => cards.click(), 3000);
};

const tabsIntersectionObserver = new IntersectionObserver(
  (entries) =>
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        console.log(entry.isIntersecting);
        cardChangeInterval = setInterval(() => cards.click(), 3000);
        tabNav.addEventListener('mouseenter', tabNavStopInterval);
        tabNav.addEventListener('mouseleave', tabNavResumeInterval);
      } else {
        console.log(entry.isIntersecting);
        clearInterval(cardChangeInterval);
        tabNav.removeEventListener('mouseenter', tabNavStopInterval);
        tabNav.removeEventListener('mouseleave', tabNavResumeInterval);
      }
    }),
  tabsObserverOptions
);

tabsIntersectionObserver.observe(cards);
 */
