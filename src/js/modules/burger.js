import {
  addBackdrop,
  removeBackdrop,
  addAnimation,
  closeOnResize,
} from './functions.js';

/*  ---------------------- BURGER VARIABLES -------------------------- */

let activeBackdrop = false;
const navigationEl = document.getElementById('navigation');
const openBurgerBtn = document.querySelector('.burger-toggler--open');
const closeBurgerBtn = document.querySelector('.burger-toggler--close');

// Default animations
let open = 'slideInDown';
let close = 'slideOutUp';
let speed = 'faster';

/*  ---------------------- RUN BURGER -------------------------- */

export function runBurger(
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

  openBurgerBtn.addEventListener('click', function () {
    document.body.style.overflow = 'hidden'; // optional overflow
    navigationEl.classList.add('_active');
    if (open) addAnimation('#navigation', open, speed);

    if (activeBackdrop) {
      addBackdrop(navigationEl, backdropStyle);
      const backdrop = document.querySelector("[data-backdrop='close']");
      backdrop.addEventListener('click', function () {
        closeBurger();
        if (close) addAnimation('#navigation', close, speed);
      });
    }
  });

  closeBurgerBtn.addEventListener('click', function () {
    closeBurger();
    if (close) addAnimation('#navigation', close, speed);
  });

  closeOnResize(breakpointSelect, navigationEl, closeBurger);
}

/*  ---------------------- HELPER FUNCTIONS -------------------------- */

function closeBurger() {
  document.body.style.removeProperty('overflow'); // optional overflow
  navigationEl.classList.remove('_active');
  if (activeBackdrop) removeBackdrop();
}
