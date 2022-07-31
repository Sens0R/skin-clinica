import {
  addBackdrop,
  removeBackdrop,
  addAnimation,
  closeOnResize,
  breakpoint,
} from './functions.js';

const { sm, md, lg, xl } = breakpoint;

// Default options
const defaultOptions = {
  mainClass: '.navigation',
  openBtn: '.burger-toggler--open',
  closeBtn: '.burger-toggler--close',
  breakpoint: lg,
  backdrop: false,
  scrollBlock: true,
  focusElement: false,
  animationOpen: false,
  animationClose: false,
  animationSpeed: false,
};

/*  ---------------------- RUN  -------------------------- */

export function runBurger(userOptions) {
  let htmlDataOptions = '';
  let options = defaultOptions;

  let mainElement = '';
  if (userOptions && 'mainClass' in userOptions) {
    mainElement = document.querySelector(userOptions.mainClass);
  } else mainElement = document.querySelector(defaultOptions.mainClass);

  const mainElementDataJSON = mainElement.getAttribute('data-burger');
  if (mainElementDataJSON) htmlDataOptions = JSON.parse(mainElementDataJSON);

  if (userOptions && mainElementDataJSON) {
    options = { ...defaultOptions, ...userOptions, ...htmlDataOptions };
  }

  if (userOptions && !mainElementDataJSON) {
    options = { ...defaultOptions, ...userOptions };
  }

  if (!userOptions && mainElementDataJSON) {
    options = { ...defaultOptions, ...htmlDataOptions };
  }
  console.log(options);

  if ('breakpoint' in options) options.breakpoint = eval(options.breakpoint);

  const {
    mainClass,
    openBtn,
    closeBtn,
    breakpoint,
    backdrop,
    scrollBlock,
    focusElement,
    animationOpen,
    animationClose,
    animationSpeed,
  } = options;

  document.querySelector(openBtn).addEventListener('click', function () {
    transitionDuration();
    mainElement.classList.add('_active');
    if (scrollBlock) document.body.style.overflow = 'hidden';
    if (focusElement) document.querySelector(focusElement).focus();
    if (animationOpen) addAnimation(mainClass, animationOpen, animationSpeed);
    setTimeout(function () {
      addAnimation(closeBtn, 'heartBeat', animationSpeed);
    }, 300);

    if (backdrop) {
      addBackdrop(mainElement, backdrop);
      const backdropClose = document.querySelector("[data-backdrop='close']");
      backdropClose.addEventListener('click', function () {
        closeElement();
        if (animationClose)
          addAnimation(mainClass, animationClose, animationSpeed);
      });
    }
  });

  document.querySelector(closeBtn).addEventListener('click', function () {
    closeElement();
    if (animationClose) addAnimation(mainClass, animationClose, animationSpeed);
  });

  if (breakpoint) {
    closeOnResize(breakpoint, mainElement, closeElement);
  }

  /*  ---------------------- HELPERS -------------------------- */

  function transitionDuration() {
    mainElement.classList.add('is-changing');
    let transitionDuration = getComputedStyle(mainElement).getPropertyValue(
      'transition-duration'
    );
    transitionDuration = Number(transitionDuration.replace('s', '')) * 1000;
    setTimeout(function () {
      mainElement.classList.remove('is-changing');
    }, transitionDuration);
  }

  function closeElement() {
    if (scrollBlock) document.body.style.removeProperty('overflow');
    if (backdrop) removeBackdrop();
    transitionDuration();
    mainElement.classList.remove('_active');
  }
}
