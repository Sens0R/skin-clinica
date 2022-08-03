import {
  addBackdrop,
  removeBackdrop,
  addAnimation,
  resize,
} from './functions.js';

import { lg } from './breakpoints.js';


// Default options
const defaultOptions = {
  mainClass: '.navigation',
  openBtn: '.nav-toggler--open',
  closeBtn: '.nav-toggler--close',
  breakpoint: lg,
  backdrop: false,
  scrollBlock: true,
  focusElement: false,
  animationOpen: false,
  animationClose: false,
  animationSpeed: false,
};

/*  ---------------------- RUN  -------------------------- */

export function runNavigation(userOptions) {
  let htmlDataOptions = '';
  let options = defaultOptions;
  let mainElement = '';
  let transition = 0;

  if (userOptions && 'mainClass' in userOptions) {
    mainElement = document.querySelector(userOptions.mainClass);
  } else mainElement = document.querySelector(defaultOptions.mainClass);

  let transitionDuration = getComputedStyle(mainElement).getPropertyValue(
    'transition-duration'
  );

  if (transitionDuration)
    transition = Number(transitionDuration.replace('s', '')) * 1000;

  const mainElementDataJSON = mainElement.getAttribute('data-navigation');
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
    mainElement.classList.add('_active');
    if (scrollBlock) document.body.style.overflow = 'hidden';
    if (focusElement) document.querySelector(focusElement).focus();
     if (animationOpen) addAnimation(mainClass, animationOpen, animationSpeed);
    setTimeout(function () {
      addAnimation(closeBtn, 'heartBeat', animationSpeed);
    }, 300); // TEST ANIMATION 

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
    resize(breakpoint, closeElement, mainElement);
  }

  /*  ---------------------- HELPERS -------------------------- */

  function closeElement() {
    if (scrollBlock) document.body.style.removeProperty('overflow');
    if (backdrop) removeBackdrop();
  
     if (transition > 0) {
      mainElement.classList.add('is-changing');
      setTimeout(function () {
        mainElement.classList.remove('is-changing');
      }, transition);
    }
 
    mainElement.classList.remove('_active');
  }
}
