import {
  addBackdrop,
  removeBackdrop,
  addAnimation,
  useElementSize,
  elementSizeObserver,
} from './functions.js';

import { lg } from './breakpoints.js';

// Default options
const defaultOptions = {
  mainClass: '.navigation',
  openBtn: '.nav-toggler--open',
  closeBtn: '.nav-toggler--close',
  breakpoint: lg,
  backdrop: false,
  mobileScrollBlock: true,
  bodyScrollBlock: false,
  focusElement: false,
  copySize: false,
  animationOpen: false,
  animationClose: false,
  animationSpeed: false,
};

/*  ---------------------- RUN  -------------------------- */

export function runNavigation(userOptions) {
  let htmlDataOptions;
  let options = defaultOptions;
  let mainElement;
  let transition;
  let copySizeEl;

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

  //console.log(options);

  if ('breakpoint' in options) options.breakpoint = eval(options.breakpoint);

  let {
    mainClass,
    openBtn,
    closeBtn,
    breakpoint,
    backdrop,
    mobileScrollBlock,
    bodyScrollBlock,
    focusElement,
    animationOpen,
    animationClose,
    animationSpeed,
    copySize,
  } = options;

  const openBtnEl = document.querySelector(openBtn);
  const closeBtnEl = document.querySelector(closeBtn);

  if (bodyScrollBlock) mobileScrollBlock = false;
  if (mobileScrollBlock) bodyScrollBlock = false;

  const navResizeObs = new ResizeObserver((entries) =>
    entries.forEach((entry) => {
      if (window.innerWidth >= breakpoint) {
        closeElement();
        mainElement.classList.remove('is-changing');
      }

      if (mobileScrollBlock) {
        if (window.innerWidth < 768 || window.innerHeight < 576) {
          document.body.style.overflow = 'hidden';
        }

        if (window.innerWidth >= 768 && window.innerHeight >= 576) {
          document.body.style.overflow = null;
        }
      }
    })
  );

  openBtnEl.addEventListener('click', function () {
    navResizeObs.observe(mainElement);

/*     const headerWrapperObserver = new ResizeObserver((entries) => {
      let elementHeight;
      entries.forEach((entry) => {
        elementHeight = entry.borderBoxSize[0].blockSize;
        console.log('Window height: ' + window.innerHeight);
        console.log('Wrapper height: ' + elementHeight);
        console.log(100 / window.innerHeight);
        //if (window.innerHeight > elementHeight) console.log('true');
        mainElement.style.height = window.innerHeight - elementHeight + 'px';
      });
    });
    headerWrapperObserver.observe(document.querySelector('.header-wrapper')); */

    console.log('NAVIGATION OPENED, OBSERVING');
    mainElement.classList.add('_active');
    closeBtnEl.classList.add('_active');
    openBtnEl.classList.remove('_active');

    if (copySize) {
      copySizeEl = document.querySelector(copySize);
      useElementSize(copySizeEl, mainElement);
    }

    if (bodyScrollBlock) {
      document.body.style.overflow = 'hidden';
    }

    if (focusElement) document.querySelector(focusElement).focus();
    if (animationOpen) addAnimation(mainClass, animationOpen, animationSpeed);
    /*     setTimeout(function () {
      addAnimation(closeBtn, 'heartBeat', animationSpeed);
    }, 300); // TEST ANIMATION */

    if (backdrop) {
      addBackdrop(mainElement, backdrop);
      const backdropClose = document.querySelector("[data-backdrop='close']");
      backdropClose.addEventListener('click', function () {
        closeElement();
      });
    }
  });

  closeBtnEl.addEventListener('click', function () {
    closeElement();
  });

  /*  ---------------------- HELPERS -------------------------- */

  function closeElement() {
    if (copySize) {
      elementSizeObserver.unobserve(copySizeEl);
      mainElement.style.height = null;
      mainElement.style.width = null;
    }

    navResizeObs.unobserve(mainElement);
    console.log('NAVIGATION CLOSED, NOT OBSERVING');
    closeBtnEl.classList.remove('_active');
    openBtnEl.classList.add('_active');
    if (document.body.style.overflow) document.body.style.overflow = null;
    if (backdrop) removeBackdrop();

    if (transition > 0) {
      mainElement.classList.add('is-changing');
      setTimeout(function () {
        mainElement.classList.remove('is-changing');
      }, transition);
    }

    //if (animationClose) addAnimation('.is-changing', animationClose, animationSpeed);

    mainElement.classList.remove('_active');
  }
}
