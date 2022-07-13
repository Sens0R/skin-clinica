import {
  addBackdrop,
  removeBackdrop,
  addAnimation,
  closeOnResize,
} from './functions.js';

/*  ---------------------- SEARCH VARIABLES -------------------------- */

let activeBackdrop = false;
const mobileSearchEl = document.querySelector('.mobile-search');
const openSearchBtn = document.querySelector("[data-search='open']");
const closeSearchBtn = document.querySelector("[data-search='close']");

// Default animations
let open = 'slideInLeft';
let close = 'slideOutRight';
let speed = 'faster';

/*  ---------------------- RUN SEARCH -------------------------------- */

export function runSearch(
  breakpointSelect,
  backdropStyle,
  openAnimation,
  closeAnimation,
  animationSpeed
) {
  if (openAnimation) open = openAnimation;
  if (closeAnimation) close = closeAnimation;
  if (animationSpeed) speed = animationSpeed;

  if (backdropStyle) activeBackdrop = true;

  openSearchBtn.addEventListener('click', function () {
    mobileSearchEl.classList.add('_active');
    addAnimation('.mobile-search', open, speed);
    document.querySelector('.nav-search__body').focus(); // optional focus on search input

    if (activeBackdrop) {
      addBackdrop(mobileSearchEl, backdropStyle);
      const backdrop = document.querySelector("[data-backdrop='close']");
      backdrop.addEventListener('click', function () {
        closeSearch();
        if (close) addAnimation('.mobile-search', close, speed);
      });
    }
  });

  closeSearchBtn.addEventListener('click', function () {
    closeSearch();
    if (close) addAnimation('.mobile-search', close, speed);
  });

  closeOnResize(breakpointSelect, mobileSearchEl, closeSearch);
}

/*  ---------------------- HELPER FUNCTIONS -------------------------- */

function closeSearch() {
  mobileSearchEl.classList.remove('_active');
  if (activeBackdrop) removeBackdrop();
}
