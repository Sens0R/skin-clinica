import { addAnimation } from './functions.js';
import { headerHeight } from './headers.js';
import { lg } from './breakpoints.js';
import debounce from 'lodash/debounce.js';

// Default options
const defaultOptions = {
  mainClass: '.navigation',
  openBtn: '.nav-toggler--open',
  closeBtn: '.nav-toggler--close',
  aboveHeaderContent: '.above-header-content-wrapper',
  breakpoint: lg,
  backdrop: false,
  smartBackdrop: false,
  closeOnBackdropClick: false,
  alwaysFullscreen: false,
  smartFullscreen: false,
  scrollBlock: false,
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
  let aboveHeaderContentVisibleHeight = 0;
  let aboveHeaderContentWrapper;
  let contentHeight;
  let availableViewportHeight;
  let visibleContent;

  userOptions && 'mainClass' in userOptions
    ? (mainElement = document.querySelector(userOptions.mainClass))
    : (mainElement = document.querySelector(defaultOptions.mainClass));

  let transitionDurationComputed = getComputedStyle(
    mainElement
  ).getPropertyValue('transition-duration');

  if (transitionDurationComputed)
    transitionDuration =
      Number(transitionDurationComputed.replace('s', '')) * 1000;

  const mainElementDataJSON = mainElement.getAttribute('data-navigation');
  if (mainElementDataJSON) htmlDataOptions = JSON.parse(mainElementDataJSON);

  if (userOptions && mainElementDataJSON)
    options = { ...defaultOptions, ...userOptions, ...htmlDataOptions };

  if (userOptions && !mainElementDataJSON)
    options = { ...defaultOptions, ...userOptions };

  if (!userOptions && mainElementDataJSON)
    options = { ...defaultOptions, ...htmlDataOptions };

  //console.log(options);

  if ('breakpoint' in options) options.breakpoint = eval(options.breakpoint);

  let {
    mainClass,
    aboveHeaderContent,
    openBtn,
    closeBtn,
    breakpoint,
    backdrop,
    smartBackdrop,
    closeOnBackdropClick,
    smartFullscreen,
    alwaysFullscreen,
    scrollBlock,
    focusElement,
    animationOpen,
    animationClose,
    animationSpeed,
    copySize,
  } = options;

  if (!copySize) {
    const content = mainElement.innerHTML;
    visibleContent = '<div class="navigation-content">' + content + '</div>';
    mainElement.innerHTML = visibleContent;
    visibleContent = document.querySelector('.navigation-content');
    if (aboveHeaderContent)
      aboveHeaderContentWrapper = document.querySelector(aboveHeaderContent);
  }

  const openBtnEl = document.querySelector(openBtn);
  const closeBtnEl = document.querySelector(closeBtn);

  if (copySize) copySizeEl = document.querySelector(copySize);

  let elementHeight;
  let elementWidth;
  const copySizeObserver = new ResizeObserver((entries) => {
    console.log('OBSERVING ELEMENT SIZE:');
    entries.forEach((entry) => {
      elementHeight = entry.borderBoxSize[0].blockSize;
      elementWidth = entry.borderBoxSize[0].inlineSize;
      mainElement.style.height = `${elementHeight}px`;
      mainElement.style.width = `${elementWidth}px`;
    });
  });

  const intersectionObs = new IntersectionObserver((entries) =>
    entries.forEach((entry) => {
      aboveHeaderContentVisibleHeight = entry.intersectionRect.height;
      console.log(
        'ABOVE HEADER CONTENT VISIBLE HEIGHT: ' +
          aboveHeaderContentVisibleHeight
      );
      open();
      intersectionObs.unobserve(aboveHeaderContentWrapper);
    })
  );

  const navContentHeightObserver = new ResizeObserver((entries) => {
    entries.forEach((entry) => {
      contentHeight = entry.borderBoxSize[0].blockSize;
      console.log('NAVIGATION CONTENT HEIGHT: ' + contentHeight);
      aboveHeaderContentWrapper
        ? intersectionObs.observe(aboveHeaderContentWrapper)
        : open();

      console.log('ABOVE HEADER CONTENT HEIGHT INTERSECTION OBSERVER STARTED');
    });
  });

  /* ====================   OPEN NAVIGATION   ==================== */

  openBtnEl.addEventListener('click', function () {
    mainElement.classList.add('_active');
    closeBtnEl.classList.add('_active');
    openBtnEl.classList.remove('_active');

    if (!copySize) navContentHeightObserver.observe(visibleContent);
    console.log('NAVIGATION CONTENT HEIGHT RESIZE OBSERVER STARTED');

    if (!copySize)
      window.visualViewport.addEventListener('resize', resizeHandler);

    // navigation options section
    if (backdrop) addBackdrop(backdrop);

    if (closeOnBackdropClick) backdropEl.addEventListener('click', close);

    if (copySize) copySizeObserver.observe(copySizeEl);

    if (scrollBlock) document.body.style.overflow = 'hidden';

    if (focusElement) document.querySelector(focusElement).focus();

    if (animationOpen) addAnimation(mainClass, animationOpen, animationSpeed);
  });

  /* ====================   CLOSE NAVIGATION   ==================== */

  closeBtnEl.addEventListener('click', close);

  if (breakpoint) {
    const mql = window.matchMedia(`(max-width: ${breakpoint}px)`);

    mql.onchange = (e) => {
      if (e.matches) return;
      if (mainElement.classList.contains('_active')) {
        window.visualViewport.removeEventListener('resize', resizeHandler);
        mainElement.classList.remove('is-changing');
        close();
      }
    };
  }

  /* ====================   HELPERS   ==================== */

  function open() {
    availableViewportHeight =
      window.innerHeight -
      aboveHeaderContentVisibleHeight -
      parseInt(headerHeight, 10);
    console.log(
      `AVAILABLE VIEWPORT HEIGHT FOR NAVIGATION CONTENT (VIEWPORT HEIGHT: ${
        window.innerHeight
      }  - ABOVE HEADER VISIBLE CONTENT HEIGHT: ${aboveHeaderContentVisibleHeight} - HEADER HEIGHT: ${parseInt(
        headerHeight,
        10
      )} =
        ${availableViewportHeight})`
    );

    console.log('DIFFERENCE = ' + (availableViewportHeight - contentHeight));

    if (alwaysFullscreen) {
      mainElement.style.height = availableViewportHeight + 'px';
      document.body.style.overflow = 'hidden';
      console.log('USING ALL AVAILABLE VIEWPORT HEIGHT, BLOCKING BODY SCROLL');
      return;
    }

    if (availableViewportHeight - contentHeight < 0) {
      mainElement.style.height = availableViewportHeight + 'px';
      document.body.style.overflow = 'hidden';
      console.log(
        'CONTENT DOES NOT FIT VIEWPORT => ADDING HEIGHT, MAKING IT SCROLLABLE, BLOCKING BODY SCROLL'
      );
      return;
    }

    if (availableViewportHeight - contentHeight < availableViewportHeight / 2) {
      mainElement.style.height = null;
      document.body.style.overflow = 'hidden';

      if (smartFullscreen)
        mainElement.style.height = availableViewportHeight + 'px';

      if (smartBackdrop) {
        removeBackdrop();
        addBackdrop(smartBackdrop);
        backdropEl.addEventListener('click', close);
      }

      console.log(
        'NAVIGATION CONTENT HAS NOT MUCH FREE SPACE FOR SCROLL, ACTIVATING BACKDROP/FULLSCREEN AND LOCKING BODY SCROLL'
      );

      return;
    }

    mainElement.style.height = null;
    if (!scrollBlock) document.body.style.overflow = null;

    console.log(
      'NAVIGATION CONTENT HAS ENOUGH VIEWPORT SPACE, REMOVING HEIGHT, ALLOWING BODY SCROLL'
    );
  }

  function close() {
    if (copySize) {
      copySizeObserver.unobserve(copySizeEl);
      mainElement.style.width = null;
    }

    if (!copySize) {
      navContentHeightObserver.unobserve(visibleContent);
      window.visualViewport.removeEventListener('resize', resizeHandler);
    }

    closeBtnEl.classList.remove('_active');
    openBtnEl.classList.add('_active');

    document.body.style.overflow = null;

    if (backdrop || smartBackdrop) removeBackdrop();

    if (!transitionDuration) mainElement.style.height = null;

    if (transitionDuration) {
      mainElement.classList.add('is-changing');
      setTimeout(() => {
        mainElement.style.height = null;
        mainElement.classList.remove('is-changing');
      }, transitionDuration);
    }

    mainElement.classList.remove('_active');

    console.log('NAVIGATION CLOSED');
  }

  function addBackdrop(backdropClass) {
    const createBackdrop = document.createElement('div');
    createBackdrop.classList.add('nav-backdrop');
    document.querySelector('.page-wrapper').after(createBackdrop);
    backdropEl = document.querySelector('.nav-backdrop');
    backdropEl.classList.add(backdropClass);
  }

  const removeBackdrop = () => {
    if (backdropEl) backdropEl.remove();
  };

  let prevHeight = window.innerHeight;
  const resizeHandler = debounce((ev) => {
    if (breakpoint && window.innerWidth > breakpoint) return;
    if (window.innerHeight !== prevHeight) {
      prevHeight = window.innerHeight;
      open();
      console.log('HEIGHT CHANGED');
    }
  }, 250);
}
