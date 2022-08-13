import { addAnimation } from './functions.js';
import { headerHeight } from './headers.js';
import { lg } from './breakpoints.js';

// Default options
const defaultOptions = {
  mainClass: '.navigation',
  navContent: '.navigation-content',
  openBtn: '.nav-toggler--open',
  closeBtn: '.nav-toggler--close',
  aboveHeaderContentWrapper: '.above-header-content-wrapper',
  breakpoint: lg,
  alwaysBackdrop: false,
  smartBackdrop: false,
  alwaysFullscreen: false,
  smartFullscreen: true,
  alwaysScrollBlock: false,
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
  let backdropEl;
  let aboveHeaderContentVisibleHeight;
  let elementSizeObserver;
  let elementHeight;
  let navResizeObs;

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
    navContent,
    aboveHeaderContentWrapper,
    openBtn,
    closeBtn,
    breakpoint,
    alwaysBackdrop,
    smartBackdrop,
    smartFullscreen,
    alwaysFullscreen,
    alwaysScrollBlock,
    focusElement,
    animationOpen,
    animationClose,
    animationSpeed,
    copySize,
  } = options;

  const navigationContent = document.querySelector(navContent);
  const aboveHeaderContent = document.querySelector(aboveHeaderContentWrapper);
  const openBtnEl = document.querySelector(openBtn);
  const closeBtnEl = document.querySelector(closeBtn);

  function mainFunction() {
    //move entersection obsever here
  }

  const intersectionObs = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (alwaysBackdrop || smartBackdrop) removeBackdrop();
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
            ${navContentMaxAllowedViewportHeight})`
        );

        console.log(
          'DIFFERENCE = ' + (window.innerHeight - combinedNavContentHeight)
        );

        if (alwaysFullscreen) {
          mainElement.style.height = navContentMaxAllowedViewportHeight + 'px';
          document.body.style.overflow = 'hidden';

          return;
        }

        if (window.innerHeight - combinedNavContentHeight < 0) {
          mainElement.style.height = navContentMaxAllowedViewportHeight + 'px';
          document.body.style.overflow = 'hidden';

          console.log(
            'CONTENT DOES NOT FIT VIEWPORT, ADDING HEIGHT, MAKING IT SCROLLABLE, BLOCKING BODY SCROLL'
          );

          return;
        }

        if (
          window.innerHeight - combinedNavContentHeight <
          window.innerHeight / 3
        ) {
          mainElement.style.height = null;
          document.body.style.overflow = 'hidden';
          if (smartFullscreen) {
            mainElement.style.height =
              navContentMaxAllowedViewportHeight + 'px';
          }

          if (smartBackdrop) {
            console.log(
              'NAVIGATION CONTENT HAS NOT MUCH FREE SPACE FOR SCROLL, ACTIVATING BACKDROP AND LOCKING BODY SCROLL'
            );
            addBackdrop(smartBackdrop);
            backdropEl.addEventListener('click', function () {
              closeElement();
            });
          }

          return;
        }

        mainElement.style.height = null;
        if (!alwaysScrollBlock) document.body.style.overflow = null;
        if (alwaysBackdrop) {
          addBackdrop(alwaysBackdrop);
          backdropEl.addEventListener('click', function () {
            closeElement();
          });
        }
        console.log(
          'NAVIGATION CONTENT HAS ENOUGH VIEWPORT SPACE, REMOVING HEIGHT, ALLOWING BODY SCROLL'
        );
      }),
    { threshold: 1 }
  );

  /* ====================   OPEN NAVIGATION   ==================== */

  openBtnEl.addEventListener('click', function () {
    navResizeObs.observe(mainElement);

    mainElement.classList.add('_active');
    closeBtnEl.classList.add('_active');
    openBtnEl.classList.remove('_active');

    useElementSize(navigationContent, intersectionObsStart);

    // navigation options section
    if (copySize) {
      function addStyles() {
        mainElement.style.height = elementHeight;
        mainElement.style.width = elementWidth;
      }

      copySizeEl = document.querySelector(copySize);
      useElementSize(copySizeEl, addStyles);
    }
    if (alwaysScrollBlock) {
      document.body.style.overflow = 'hidden';
    }
    if (focusElement) document.querySelector(focusElement).focus();
    if (animationOpen) addAnimation(mainClass, animationOpen, animationSpeed);
  });

  /* ====================   CLOSE NAVIGATION   ==================== */

  closeBtnEl.addEventListener('click', function () {
    closeElement();
  });

  if (breakpoint) {
    const mql = window.matchMedia(`(max-width: ${breakpoint}px)`);

    mql.onchange = (e) => {
      if (e.matches) {
        console.log(
          `This is a narrow screen — less than ${breakpoint}px wide.`
        );
      } else {
        console.log(`This is a wide screen — more than ${breakpoint}px wide.`);
        if (mainElement.classList.contains('_active')) {
          mainElement.style.height = null;
          closeElement();
        }
      }
    };
  }

  /* ====================   HELPERS   ==================== */

  function closeElement() {
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
    document.body.style.overflow = null;
    if (alwaysBackdrop || smartBackdrop) removeBackdrop();

    if (transitionDuration > 0) {
      mainElement.classList.add('is-changing');
      setTimeout(function () {
        mainElement.classList.remove('is-changing');
      }, transitionDuration);
    }
    mainElement.classList.remove('_active');
  }

  function intersectionObsStart() {
    console.log('INTERSECTION OBSERVER STARTED');
    intersectionObs.unobserve(aboveHeaderContent);
    intersectionObs.observe(aboveHeaderContent);
  }

  function addBackdrop(backdropClass) {
    document.body.style.overflow = 'hidden';
    const createBackdrop = document.createElement('div');
    createBackdrop.classList.add('nav-backdrop');
    document.querySelector('header').after(createBackdrop);
    backdropEl = document.querySelector('.nav-backdrop');
    backdropEl.classList.add(backdropClass);
  }

  function removeBackdrop() {
    if (backdropEl) backdropEl.remove();
  }

  navResizeObs = new ResizeObserver((entries) =>
    entries.forEach((entry) => {
      if (window.innerWidth >= breakpoint) {
        closeElement();
        mainElement.classList.remove('is-changing');
      }

      intersectionObs.observe(aboveHeaderContent);
    })
  );

  function useElementSize(observeElement, callback) {
    elementSizeObserver = new ResizeObserver((entries) => {
      console.log('OBSERVING ELEMENT SIZE:');
      console.log(observeElement);
      entries.forEach((entry) => {
        elementHeight = entry.borderBoxSize[0].blockSize;

        console.log('ELEMENT HEIGHT: ' + elementHeight);
        if (callback) callback();
      });
    });

    elementSizeObserver.observe(observeElement);
  }
}
