import {
  addBackdrop,
  removeBackdrop,
  addAnimation,
  closeOnResize,
} from './functions.js';

/*  ---------------------- BURGER VARIABLES -------------------------- */

// default element selectors
let mainElement = '';
let openBtn = '';
let closeBtn = '';
let breakpoint = false;

// default options
let activeBackdrop = false;
let overflow = false;
let focusEl = false;

// default animations
let open = 'slideInDown';
let close = 'slideOutUp';
let speed = 'faster';

/*  ---------------------- RUN BURGER -------------------------- */

export function runSearch(
  targetElement,
  openBtnElement,
  closeBtnElement,
  breakpointSelect,
  backdropStyle,
  bodyOverflow,
  openAnimation,
  closeAnimation,
  animationSpeed,
  focusElement
) {
  if (targetElement) mainElement = document.querySelector(targetElement);
  if (openBtnElement) openBtn = document.querySelector(openBtnElement);
  if (closeBtnElement) closeBtn = document.querySelector(closeBtnElement);
  if (breakpointSelect) breakpoint = breakpointSelect;
  if (backdropStyle) activeBackdrop = true;
  if (bodyOverflow) overflow = true;
  if (openAnimation) open = openAnimation;
  if (closeAnimation) close = closeAnimation;
  if (animationSpeed) speed = animationSpeed;
  if (focusElement) focusEl = focusElement;

  openBtn.addEventListener('click', function () {
    mainElement.classList.add('_active');
    if (overflow) document.body.style.overflow = 'hidden'; // optional overflow
    if (focusEl) document.querySelector(focusElement).focus(); // optional focus
    if (open) addAnimation(mainElement, open, speed);

    if (activeBackdrop) {
      addBackdrop(mainElement, backdropStyle);
      const backdrop = document.querySelector("[data-backdrop='close']");
      backdrop.addEventListener('click', function () {
        closeElement();
        if (close) addAnimation(mainElement, close, speed);
      });
    }
  });

  closeBtn.addEventListener('click', function () {
    closeElement();
    if (close) addAnimation(mainElement, close, speed);
  });

  if (breakpointSelect)
    closeOnResize(breakpointSelect, mainElement, closeElement);
}

/*  ---------------------- HELPER FUNCTIONS -------------------------- */

function closeElement() {
  if (overflow) document.body.style.removeProperty('overflow');
  mainElement.classList.remove('_active');
  if (activeBackdrop) removeBackdrop();
}