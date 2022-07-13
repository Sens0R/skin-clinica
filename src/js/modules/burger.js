import {
  addBackdrop,
  removeBackdrop,
  addAnimation,
  closeOnResize,
  breakpoint,
} from './functions.js';

export function runBurger(
  targetElement,
  openBtnElement,
  closeBtnElement,
  breakpointSelect,
  backdropStyle,
  bodyOverflow,
  focusElement,
  openAnimation,
  closeAnimation,
  animationSpeed
) {
  /*  ---------------------- VARIABLES -------------------------- */

  // default element selectors
  let mainElement = document.querySelector('.navigation');
  let openBtn = document.querySelector('.burger-toggler--open');
  let closeBtn = document.querySelector('.burger-toggler--close');

  // default options
  let mediaBreakpoint = breakpoint.lg;
  let activeBackdrop = '_active';
  let overflow = true;
  let focusEl = false;

  // default animations
  let open = 'slideInDown';
  let close = 'slideOutUp';
  let speed = 'faster';

  /*  ---------------------- RUN  -------------------------- */

  if (targetElement) mainElement = document.querySelector(targetElement);
  if (openBtnElement) openBtn = document.querySelector(openBtnElement);
  if (closeBtnElement) closeBtn = document.querySelector(closeBtnElement);
  if (breakpointSelect) mediaBreakpoint = breakpointSelect;
  if (backdropStyle) activeBackdrop = backdropStyle;
  if (bodyOverflow !== undefined) overflow = bodyOverflow;
  if (focusElement) focusEl = focusElement;
  if (openAnimation) open = openAnimation;
  if (closeAnimation) close = closeAnimation;
  if (animationSpeed) speed = animationSpeed;

  openBtn.addEventListener('click', function () {
    mainElement.classList.add('_active');

    if (overflow || overflow == undefined)
      document.body.style.overflow = 'hidden';
    if (focusEl) document.querySelector(focusElement).focus();
    if (open) addAnimation(mainElement, open, speed);
    if (activeBackdrop) {
      addBackdrop(mainElement, activeBackdrop);
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

  if (breakpointSelect == undefined || breakpointSelect) {
    closeOnResize(mediaBreakpoint, mainElement, closeElement);
  }

  /*  ---------------------- HELPERS -------------------------- */

  function closeElement() {
    if (overflow) document.body.style.removeProperty('overflow');
    mainElement.classList.remove('_active');
    if (activeBackdrop) removeBackdrop();
  }
}
