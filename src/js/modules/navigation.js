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
  //copySize: false,
};

/*  ---------------------- RUN  -------------------------- */

export function runNavigation(userOptions) {
  let htmlDataOptions;
  let options = defaultOptions;
  let mainElement;
  let transitionDuration;
  //let copySizeEl;
  let backdropEl;
  let aboveHeaderContentVisibleHeight = 0;
  let aboveHeaderContentWrapper;
  let contentHeight;
  let availableViewportHeight;
  let visibleContent;

  userOptions && 'mainClass' in userOptions
    ? (mainElement = document.querySelector(userOptions.mainClass))
    : (mainElement = document.querySelector(defaultOptions.mainClass));

  //mainElement.classList.add('stop-transition');

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
    copySize,
  } = options;

  const openBtnEl = document.querySelector(openBtn);
  const closeBtnEl = document.querySelector(closeBtn);

  /*  let elementHeight;
  let elementWidth;

  const copySizeObserver = new ResizeObserver((entries) => {
    //console.log('OBSERVING ELEMENT SIZE:');
    entries.forEach((entry) => {
      elementHeight = entry.borderBoxSize[0].blockSize;
      elementWidth = entry.borderBoxSize[0].inlineSize;
      mainElement.style.height = `${elementHeight}px`;
      mainElement.style.width = `${elementWidth}px`;
    });
  }); */

  /*   const content = mainElement.innerHTML;
  visibleContent =
    '<div class="navigation-content-wrapper">' + content + '</div>';
  mainElement.innerHTML = visibleContent;
  visibleContent = document.querySelector('.navigation-content-wrapper'); */
  if (aboveHeaderContent)
    aboveHeaderContentWrapper = document.querySelector(aboveHeaderContent);

  //if (copySize) copySizeEl = document.querySelector(copySize);

  /*  const intersectionObs = new IntersectionObserver((entries) =>
    entries.forEach((entry) => {
      aboveHeaderContentVisibleHeight = entry.intersectionRect.height;
       console.log(
        'ABOVE HEADER CONTENT VISIBLE HEIGHT: ' +
          aboveHeaderContentVisibleHeight
      ); 
      open();
      intersectionObs.unobserve(aboveHeaderContentWrapper);
    })
  ); */

  /*   const navContentHeightObserver = new ResizeObserver((entries) => {
    entries.forEach((entry) => {
      contentHeight = entry.borderBoxSize[0].blockSize;
      console.log('CONTENT HEIGHT: ' + contentHeight);
      aboveHeaderContentWrapper
        ? intersectionObs.observe(aboveHeaderContentWrapper)
        : open();
    });
  }); */

  /* ====================   OPEN NAVIGATION   ==================== */
  visibleContent = document.querySelector('.navigation-content-wrapper');
  const headerHeight = document.querySelector('.header').scrollHeight;

  openBtnEl.addEventListener('click', () => {
    //mainElement.classList.remove('stop-transition');
    mainElement.classList.add('_active');
    closeBtnEl.classList.add('_active');
    openBtnEl.classList.remove('_active');
   
    visibleContent.style.maxHeight = `${
      window.innerHeight -
      headerHeight -
      aboveHeaderContentWrapper.scrollHeight
    }px`;
    
    //visibleContent.style.overflowY = 'auto'
    document.body.style.overflow = 'hidden';
    //if (copySize) copySizeObserver.observe(copySizeEl);

    //aboveHeaderContentWrapper.style.maxHeight = '0px';
    if (!copySize) {
      //navContentHeightObserver.observe(visibleContent);
      window.visualViewport.addEventListener('resize', resizeHandler);
    }

    if (backdrop) addBackdrop(backdrop);

    if (closeOnBackdropClick) backdropEl.addEventListener('click', close);

    if (scrollBlock) document.body.style.overflow = 'hidden';

    if (focusElement) document.querySelector(focusElement).focus();
    mainElement.addEventListener(
      'transitionend',
      () => {
        if (focusElement) document.querySelector(focusElement).focus();
      },
      { once: true }
    );
  });

  /* ====================   CLOSE NAVIGATION   ==================== */

  closeBtnEl.addEventListener('click', close);

  if (breakpoint) {
    const mql = window.matchMedia(`(max-width: ${breakpoint}px)`);

    mql.onchange = (e) => {
      if (e.matches) return;
      if (mainElement.classList.contains('_active')) {
        close();
        setTimeout(() => {
          document.body.style.overflow = null;
          mainElement.style.height = null;
          window.visualViewport.removeEventListener('resize', resizeHandler);
          //mainElement.classList.add('stop-transition');
          //console.log('CLOSED');
        }, 250);
      }
    };
  }

  /* ====================   HELPERS   ==================== */

  function open() {
    availableViewportHeight =
      window.innerHeight -
      aboveHeaderContentVisibleHeight -
      parseInt(headerHeight, 10);

    if (alwaysFullscreen) {
      mainElement.style.height = availableViewportHeight + 'px';
      document.body.style.overflow = 'hidden';
      //console.log('USING ALL AVAILABLE VIEWPORT HEIGHT, BLOCKING BODY SCROLL');
      return;
    }

    if (availableViewportHeight - contentHeight < 0) {
      mainElement.style.height = availableViewportHeight + 'px';
      document.body.style.overflow = 'hidden';
      /*   console.log(
        'CONTENT DOES NOT FIT VIEWPORT => ADDING HEIGHT, MAKING IT SCROLLABLE, BLOCKING BODY SCROLL'
      ); */
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

      /* console.log(
        'NAVIGATION CONTENT HAS NOT MUCH FREE SPACE FOR SCROLL, ACTIVATING BACKDROP/FULLSCREEN AND LOCKING BODY SCROLL'
      ); */

      return;
    }

    mainElement.style.height = null;
    if (!scrollBlock) document.body.style.overflow = null;

    /* console.log(
      'NAVIGATION CONTENT HAS ENOUGH VIEWPORT SPACE, REMOVING HEIGHT, ALLOWING BODY SCROLL'
    ); */
  }

  function close() {
   
    mainElement.addEventListener(
      'transitionend',
      () => {
        //mainElement.classList.add('stop-transition');
        if (focusElement) document.querySelector(focusElement).focus();
      },
      { once: true }
    );

    mainElement.classList.remove('_active');
    closeBtnEl.classList.remove('_active');
    openBtnEl.classList.add('_active');
    document.body.style.overflow = null;

    if (copySize) {
      //copySizeObserver.unobserve(copySizeEl);
      //mainElement.style.width = null;
    }

    /*    if (!copySize) {
      navContentHeightObserver.unobserve(visibleContent);
      window.visualViewport.removeEventListener('resize', resizeHandler);
    }
 */
    if (backdrop || smartBackdrop) removeBackdrop();

    if (!transitionDuration) return (mainElement.style.height = null);

    mainElement.style.height = null;
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
    if (window.innerHeight !== prevHeight) {
      prevHeight = window.innerHeight;
      open();
    }
  }, 250);
}
