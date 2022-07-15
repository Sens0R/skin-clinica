import {
  addBackdrop,
  removeBackdrop,
  addAnimation,
  closeOnResize,
    
} from './functions.js';

const defaultOptions = {
  mainElement: '.navigation',
  openBtn: '.burger-toggler--open',
  closeBtn: '.burger-toggler--close',
  breakpoint: 992,
  backdrop: false,
  scrollBlock: true,
  focusElement: false,
  animationOpen: 'slideInDown',
  animationClose: 'slideOutUp',
  animationSpeed: 'faster',
};

/*  ---------------------- RUN  -------------------------- */

export function runBurger(userOptions = {}) {
  const options = { ...defaultOptions, ...userOptions };

  const {
    mainElement,
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
    document.querySelector(mainElement).classList.add('_active');

    if (scrollBlock) document.body.style.overflow = 'hidden';
    if (focusElement) document.querySelector(focusElement).focus();
    if (animationOpen) addAnimation(mainElement, animationOpen, animationSpeed);
    if (backdrop) {
      addBackdrop(document.querySelector(mainElement), backdrop);
      const backdropClose = document.querySelector("[data-backdrop='close']");
      backdropClose.addEventListener('click', function () {
        closeElement();
        if (animationClose)
          addAnimation(mainElement, animationClose, animationSpeed);
      });
    }
  });

  document.querySelector(closeBtn).addEventListener('click', function () {
    closeElement();
    if (animationClose)
      addAnimation(mainElement, animationClose, animationSpeed);
  });

  if (breakpoint) {
    closeOnResize(
      breakpoint,
      document.querySelector(mainElement),
      closeElement
    );
  }

  /*  ---------------------- HELPERS -------------------------- */

  function closeElement() {
    if (scrollBlock) document.body.style.removeProperty('overflow');
    document.querySelector(mainElement).classList.remove('_active');
    if (backdrop) removeBackdrop();
  }
}
