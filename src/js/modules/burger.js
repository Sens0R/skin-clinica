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
  scrollBlock: false,
  focusElement: false,
  animationOpen: 'slideInDown',
  animationClose: 'slideOutUp',
  animationSpeed: 'faster',
};

/*  ---------------------- RUN  -------------------------- */

export function runBurger(userOptions) {
  let htmlDataOptions = '';
  let options = defaultOptions;

  optionsHandler();

  if (options.breakpoint) options.breakpoint = eval(options.breakpoint);

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

  const mainElement = document.querySelector(mainClass);

  document.querySelector(openBtn).addEventListener('click', function () {
    mainElement.classList.add('_active');

    if (scrollBlock) document.body.style.overflow = 'hidden';
    if (focusElement) document.querySelector(focusElement).focus();
    if (animationOpen) addAnimation(mainClass, animationOpen, animationSpeed);
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

  function closeElement() {
    if (scrollBlock) document.body.style.removeProperty('overflow');
    if (backdrop) removeBackdrop();
    mainElement.classList.remove('_active');
  }

  function optionsHandler() {
    let mainElement = '';
    if (userOptions && 'mainClass' in userOptions) {
      mainElement = document.querySelector(userOptions.mainClass);
    } else mainElement = document.querySelector(defaultOptions.mainClass);

    const mainElementDataJSON = mainElement.getAttribute('data-burger');
    if (mainElementDataJSON) htmlDataOptions = JSON.parse(mainElementDataJSON);

    if (userOptions && mainElementDataJSON) {
      options = { ...defaultOptions, ...userOptions, ...htmlDataOptions };
      console.log(options);
      return;
    }

    if (userOptions && !mainElementDataJSON) {
      options = { ...defaultOptions, ...userOptions };
      console.log(options);
      return;
    }

    if (!userOptions && mainElementDataJSON) {
      options = { ...defaultOptions, ...htmlDataOptions };
      console.log(options);
      return;
    }
    console.log(options);
  }
}
