import {
  addBackdrop,
  removeBackdrop,
  addAnimation,
  closeOnResize,
  breakpoint,
} from './functions.js';

const { sm, md, lg, xl } = breakpoint;

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

  if (userOptions && userOptions.mainClass) {
    dataParse(userOptions);
  } else {
    dataParse(defaultOptions);
  }

  if (htmlDataOptions.breakpoint)
    htmlDataOptions.breakpoint = eval(htmlDataOptions.breakpoint);

  const options = { ...defaultOptions, ...userOptions, ...htmlDataOptions };
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

  console.log(`${options.mainClass} = ${JSON.stringify(options, undefined, 2)}`);

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
    mainElement.classList.remove('_active');
    if (backdrop) removeBackdrop();
  }

  function dataParse(optionsObject) {
    const mainElData = document.querySelector(optionsObject.mainClass);
    const mainElJSON = mainElData.getAttribute('data-burger');
    if (mainElJSON) htmlDataOptions = JSON.parse(mainElJSON);
  }
}
