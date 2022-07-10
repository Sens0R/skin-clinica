import {
  addBackdrop,
  removeBackdrop,
  addOpenAnimation,
  addCloseAnimation,
  closeSearchOnResize,
} from './functions.js';

const openSearchBtn = document.querySelector("[data-search='open']");
const mobileSearchEl = document.querySelector('.mobile-search');
const animatedEl = '.mobile-search';
const openAnimation = 'slideInLeft';
const closeAnimation = 'slideOutRight';
const animationSpeed = 'faster';
const backdropStyle = '_active-transparent';

export function runSearch(breakpoint) {
  openSearchBtn.addEventListener('click', function () {
    mobileSearchEl.classList.add('_active');
    addBackdrop(backdropStyle);
    addOpenAnimation(animatedEl, openAnimation, animationSpeed);
    document.querySelector('.nav-search__body').focus();

    const backdropClick = document.querySelector("[data-backdrop='close']");
    backdropClick.addEventListener('click', function () {
      closeSearch();
    });
  });

  const closeSearchBtn = document.querySelector("[data-search='close']");
  closeSearchBtn.addEventListener('click', function () {
    closeSearch();
  });

  window.addEventListener('resize', () => {
    closeSearchOnResize(breakpoint, mobileSearchEl);
  });
}

function closeSearch() {
  removeBackdrop();
  mobileSearchEl.classList.remove('_active');
  addCloseAnimation(animatedEl, closeAnimation, animationSpeed);
}
