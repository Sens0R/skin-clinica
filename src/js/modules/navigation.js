import {
  addBackdrop,
  removeBackdrop,
  addAnimation,
  useElementSize,
  elementSizeObserver,
  elementHeight,
} from './functions.js';
import { headerHeight } from './headers.js';
import { lg } from './breakpoints.js';

// Default options
const defaultOptions = {
  mainClass: '.navigation',
  openBtn: '.nav-toggler--open',
  closeBtn: '.nav-toggler--close',
  breakpoint: lg,
  backdrop: false,
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
  let transitionDuration;
  let copySizeEl;

  if (userOptions && 'mainClass' in userOptions) {
    mainElement = document.querySelector(userOptions.mainClass);
  } else mainElement = document.querySelector(defaultOptions.mainClass);

  let transitionDurationComputed = getComputedStyle(
    mainElement
  ).getPropertyValue('transition-duration');

  if (transitionDurationComputed)
    transitionDuration =
      Number(transitionDurationComputed.replace('s', '')) * 1000;

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
    bodyScrollBlock,
    focusElement,
    animationOpen,
    animationClose,
    animationSpeed,
    copySize,
  } = options;

  const openBtnEl = document.querySelector(openBtn);
  const closeBtnEl = document.querySelector(closeBtn);

  const navResizeObs = new ResizeObserver((entries) =>
    entries.forEach((entry) => {
      if (window.innerWidth >= breakpoint) {
        closeElement();
        mainElement.classList.remove('is-changing');
      }

      intersectionObs.observe(aboveHeaderContent);
    })
  );

  const aboveHeaderContent = document.querySelector(
    '.above-header-content-wrapper'
  );
  let aboveHeaderContentVisibleHeight;
  const navigationContent = document.querySelector('.navigation-content');

  const intersectionObs = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        console.log('VIEWPORT HEIGHT: ' + window.innerHeight);
        aboveHeaderContentVisibleHeight = entry.intersectionRect.height;
        console.log(
          'ABOVE HEADER CONTENT VISIBLE HEIGHT: ' +
            aboveHeaderContentVisibleHeight
        );

        let combinedNavContentHeight =
          elementHeight +
          aboveHeaderContentVisibleHeight +
          parseInt(headerHeight, 10);
        console.log(
          `COMBINED NAVIGATION CONTENT HEIGHT (CONTENT HEIGHT: ${elementHeight} + HEADER HEIGHT: ${parseInt(
            headerHeight,
            10
          )} + ABOVE HEADER VISIBLE CONTENT HEIGHT: ${aboveHeaderContentVisibleHeight}): ${combinedNavContentHeight}`
        );

        let navContentMaxAllowedViewportHeight =
          window.innerHeight -
          aboveHeaderContentVisibleHeight -
          parseInt(headerHeight, 10);
        console.log(
          `MAXIMUM ALLOWED VIEWPORT HEIGHT FOR NAVIGATION CONTENT (VIEWPORT HEIGHT: ${
            window.innerHeight
          }  - ABOVE HEADER  CONTENT VISIBLE HEIGHT: ${aboveHeaderContentVisibleHeight} - HEADER HEIGHT: ${parseInt(
            headerHeight,
            10
          )} =
            ${navContentMaxAllowedViewportHeight}`
        );

        if (window.innerHeight - combinedNavContentHeight < 0) {
          mainElement.style.height = navContentMaxAllowedViewportHeight + 'px';
          document.body.style.overflow = 'hidden';
          console.log(
            'CONTENT DOES NOT FIT VIEWPORT, ADDING HEIGHT, MAKING IT SCROLLABLE, BLOCKING BODY SCROLL'
          );
        } else {
          mainElement.style.height = null;
          document.body.style.overflow = null;
          console.log(
            'NAVIGATION CONTENT HAS VIEWPORT SPACE, REMOVING HEIGHT, ALLOWING BODY SCROLL'
          );
        }
        navResizeObs.unobserve(mainElement);
      }),
    { threshold: 1 }
  );

  function intersectionObsStart() {
    console.log('INTERSECTION OBSERVER STARTED');
    intersectionObs.unobserve(aboveHeaderContent);
    intersectionObs.observe(aboveHeaderContent);
  }

  openBtnEl.addEventListener('click', function () {
    navResizeObs.observe(mainElement);

    mainElement.classList.add('_active');
    closeBtnEl.classList.add('_active');
    openBtnEl.classList.remove('_active');

    useElementSize(navigationContent, intersectionObsStart);

    if (copySize) {
      function addStyles() {
        mainElement.style.height = elementHeight;
        mainElement.style.width = elementWidth;
      }

      copySizeEl = document.querySelector(copySize);
      useElementSize(copySizeEl, addStyles);
    }

    if (bodyScrollBlock) {
      document.body.style.overflow = 'hidden';
    }

    if (focusElement) document.querySelector(focusElement).focus();
    if (animationOpen) addAnimation(mainClass, animationOpen, animationSpeed);

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
    mainElement.classList.remove('_active');

    if (copySize) {
      elementSizeObserver.unobserve(copySizeEl);
      mainElement.style.height = null;
      mainElement.style.width = null;
    }

    intersectionObs.unobserve(aboveHeaderContent);
    elementSizeObserver.unobserve(navigationContent);

    navResizeObs.unobserve(mainElement);

    console.log('NAVIGATION CLOSED, REMOVING ALL OBSERVERS');
    closeBtnEl.classList.remove('_active');
    openBtnEl.classList.add('_active');
    if (document.body.style.overflow) document.body.style.overflow = null;
    if (backdrop) removeBackdrop();

    if (transitionDuration > 0) {
      mainElement.classList.add('is-changing');
      setTimeout(function () {
        mainElement.classList.remove('is-changing');
      }, transitionDuration);
    }
  }
}
