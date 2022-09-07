import { lg } from './breakpoints.js';

// Default options
const defaultOptions = {
  mainClass: '[data-nav]',
  openBtn: '[data-nav-btn="open"]',
  closeBtn: '[data-nav-btn="close"]',
  aboveHeader: false,
  breakpoint: lg,
  backdrop: false,
  smartBackdrop: false,
  closeOnBackdropClick: false,
  alwaysFullscreen: false,
  smartFullscreen: false,
  scrollBlock: false,
  focusElement: false,
};

/*  ---------------------- RUN  -------------------------- */

export function runNavigation(userOptions) {
  let options = defaultOptions;
  let mainElement;
  let backdropEl;
  let aboveHeaderWrapper;
  let contentHeight;
  let availableViewportHeight;
  let visibleContent;

  userOptions && 'mainClass' in userOptions
    ? (mainElement = document.querySelector(userOptions.mainClass))
    : (mainElement = document.querySelector(defaultOptions.mainClass));

  if (userOptions) options = { ...defaultOptions, ...userOptions };

  if ('breakpoint' in options) options.breakpoint = eval(options.breakpoint);

  let {
    aboveHeader,
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
  } = options;

  const openBtnEl = document.querySelector(openBtn);
  const closeBtnEl = document.querySelector(closeBtn);

  if (aboveHeader) {
    aboveHeaderWrapper = document.querySelector(aboveHeader);
    visibleContent = document.querySelector('[data-nav-content]');
  }

  /* ====================   OPEN NAVIGATION   ==================== */

  const headerHeight = document.querySelector('.header').scrollHeight;

  openBtnEl.addEventListener('click', () => {
    //mainElement.classList.remove('stop-transition');

    mainElement.classList.add('_active');
    closeBtnEl.classList.add('_active');
    openBtnEl.classList.remove('_active');

    document.body.style.overflow = 'hidden'; // fix later

    if (aboveHeader) {
      visibleContent.style.maxHeight = `${
        window.innerHeight - headerHeight - aboveHeaderWrapper.scrollHeight
      }px`;
    }

    if (backdrop) addBackdrop(backdrop);

    if (closeOnBackdropClick) backdropEl.addEventListener('click', close);

    if (scrollBlock) document.body.style.overflow = 'hidden';

    if (focusElement) {
      document.querySelector(focusElement).focus();
      mainElement.addEventListener(
        'transitionend',
        () => {
          if (focusElement) document.querySelector(focusElement).focus();
        },
        { once: true }
      );
    }
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

          //mainElement.classList.add('stop-transition');
          //console.log('CLOSED');
        }, 250);
      }
    };
  }

  /* ====================   HELPERS   ==================== */

  function open() {
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

    if (backdrop || smartBackdrop) removeBackdrop();

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
}
