import { lg } from './breakpoints.js';

// Default options
const defaultOptions = {
  mainClass: '[data-nav]',
  openBtn: '[data-nav-btn="open"]',
  closeBtn: '[data-nav-btn="close"]',
  notification: false,
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
  let notificationEl;
  let visibleContent;
  let notificationBtn;

  userOptions && 'mainClass' in userOptions
    ? (mainElement = document.querySelector(userOptions.mainClass))
    : (mainElement = document.querySelector(defaultOptions.mainClass));

  if (userOptions) options = { ...defaultOptions, ...userOptions };

  if ('breakpoint' in options) options.breakpoint = eval(options.breakpoint);

  let {
    notification,
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

  if (notification) {
    notificationEl = document.querySelector(notification);
    visibleContent = document.querySelector('[data-nav-content]');
    notificationBtn = document.querySelector('[data-close-notification-btn]');
  }

  /* ====================   OPEN NAVIGATION   ==================== */

  const headerHeight = document.querySelector('.header').scrollHeight;

  openBtnEl.addEventListener('click', open);

  /* ====================   OPEN NAVIGATION   ==================== */

  /* ====================   CLOSE NAVIGATION   ==================== */

  closeBtnEl.addEventListener('click', close);

  if (breakpoint) {
    const mql = window.matchMedia(`(max-width: ${breakpoint}px)`);

    mql.onchange = (e) => {
      if (e.matches) return;
      if (mainElement.classList.contains('active')) {
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

  /* ====================   FUNCTIONS   ==================== */

  function open() {
    //mainElement.classList.remove('stop-transition');

    mainElement.classList.add('active');
    closeBtnEl.classList.add('active');
    openBtnEl.classList.remove('active');

    document.body.style.overflow = 'hidden'; // fix later

    if (notification) {
      notificationBtn.click();
      visibleContent.style.maxHeight = `${window.innerHeight - headerHeight}px`;
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
  }

  function close() {
    if (notification) {
      notificationBtn.click();
    }
    
    mainElement.addEventListener(
      'transitionend',
      () => {
        //mainElement.classList.add('stop-transition');
        if (focusElement) document.querySelector(focusElement).focus();
      },
      { once: true }
    );

    mainElement.classList.remove('active');
    closeBtnEl.classList.remove('active');
    openBtnEl.classList.add('active');
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

  function removeBackdrop() {
    if (backdropEl) backdropEl.remove();
  }

  function removeLater() {
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
}
