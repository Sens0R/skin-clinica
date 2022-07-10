import {
  addBackdrop,
  removeBackdrop,
  addOpenAnimation,
  addCloseAnimation,
  closeOnResize,
  closeOnClick,
} from './functions.js';

let navigation = '';

/*  ---------------------- BURGER VARIABLES -------------------------- */

let activeBackdrop = false;
const openAnimation = 'slideInDown';
const closeAnimation = 'slideOutUp';
const animationSpeed = 'faster';

/*  ---------------------- RUN BURGER -------------------------- */

export function runBurger(breakpointSelect, backdropStyle) {
  if (backdropStyle) {
    activeBackdrop = true;
  }

  navigation = document.getElementById('navigation');
  const burgerTogglerOpen = document.querySelector('.burger-toggler--open');
  const burgerTogglerClose = document.querySelector('.burger-toggler--close');

  burgerTogglerClose.addEventListener('click', function () {
    closeBurger();
    addCloseAnimation('#navigation', closeAnimation, animationSpeed);
  });

  burgerTogglerOpen.addEventListener('click', function () {
    openBurger();
    addOpenAnimation('#navigation', openAnimation, animationSpeed);
    ifBackdropActive(addBackdrop, backdropStyle);
    ifBackdropActive(
      closeOnClick,
      document.querySelector("[data-backdrop='close']"),
      closeBurger,
      addCloseAnimation,
      '#navigation',
      closeAnimation,
      animationSpeed
    );
  });

  closeOnResize(breakpointSelect, navigation, closeBurger);
}

/*  ---------------------- HELPER FUNCTIONS -------------------------- */

function ifBackdropActive(callbackFunction, ...params) {
  if (activeBackdrop == true) {
    callbackFunction(...params);
  }
}

function openBurger() {
  document.body.style.overflow = 'hidden';
  navigation.classList.add('_active');
}

function closeBurger(animation, ...params) {
  document.body.style.removeProperty('overflow');
  navigation.classList.remove('_active');
  ifBackdropActive(removeBackdrop);
  if (animation) {
    animation(...params);
  }
}
