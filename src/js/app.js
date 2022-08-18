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

tabs.forEach((tab) => {
  const tabNavigation = () => {
    if (tab.classList.contains('_active')) return;

    const target = document.querySelector(tab.dataset.tabTarget);
    tabContents.forEach((tabContent) => tabContent.classList.remove('_active'));
    tabs.forEach((tab) => tab.classList.remove('_active'));

    target.classList.add('_active');
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



const tabMutationObserver = new MutationObserver((mutations) => {
  //const tab1 = document.getElementById('tab-1');
  //let prevClassState = tab1.classList.contains('_active');
  console.log(mutations)
  mutations.forEach((mutation) => {
   
   /*  if (mutation.attributeName !== 'class') return;
    let currentClassState = mutation.target.classList.contains('_active');

    if (prevClassState !== currentClassState) {
      prevClassState = currentClassState;
      if (currentClassState) console.log('class added!');
      else console.log('class removed!');
    } */
  });
});


tabMutationObserver.observe(document.getElementById('tab-1'), { attributes: true });
tabMutationObserver.observe(document.getElementById('tab-2'), { attributes: true });
tabMutationObserver.observe(document.getElementById('tab-3'), { attributes: true });
tabMutationObserver.observe(document.getElementById('tab-4'), { attributes: true });
/* function tabsRender() {
  tabContents.forEach((contentTab) => {
  
    tabMutationObserver.observe(contentTab, { attributes: true });
  });
}

tabsRender(); */

/* tabContents.forEach((tabContent) => {
  prevClassState = tabContent.classList.contains('_active');
  
}); */

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
