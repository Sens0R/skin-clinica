import {
  addBackdrop,
  removeBackdrop,
  addOpenAnimation,
  addCloseAnimation,
  closeOnResize,
  closeOnClick,
} from './functions.js';

const openSearchBtn = document.querySelector("[data-search='open']");
const mobileSearchEl = document.querySelector('.mobile-search');
const animatedEl = '.mobile-search';
const openAnimation = 'slideInLeft';
const closeAnimation = 'slideOutRight';
const animationSpeed = 'faster';

export function runSearch(breakpointSelect, backdropStyle) {
  openSearchBtn.addEventListener('click', function () {
    mobileSearchEl.classList.add('_active');
    addBackdrop(backdropStyle);
    addOpenAnimation(animatedEl, openAnimation, animationSpeed);
    document.querySelector('.nav-search__body').focus(); // optional focus on search input

    closeOnClick(
      document.querySelector("[data-backdrop='close']"),
      closeSearch
    );
  });

  closeOnClick(document.querySelector("[data-search='close']"), closeSearch);
  closeOnResize(breakpointSelect, mobileSearchEl, removeBackdrop);
}

function closeSearch() {
  removeBackdrop();
  mobileSearchEl.classList.remove('_active');
  addCloseAnimation(animatedEl, closeAnimation, animationSpeed);
}
