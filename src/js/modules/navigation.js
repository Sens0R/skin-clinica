import { lg } from './breakpoints.js';

// Default options
const defaultOptions = {
  mainElement: '[data-nav]',
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
  focus: false,
  stopTransition: false,
};

/*  ---------------------- RUN  -------------------------- */

export function runNavigation(userOptions) {
  let options = defaultOptions;
  let mainElement;
  let backdropEl;
  let notificationEl;
  let visibleContent;
  let notificationBtn;

  userOptions && 'mainElement' in userOptions
    ? (mainElement = document.querySelector(userOptions.mainElement))
    : (mainElement = document.querySelector(defaultOptions.mainElement));

  if (userOptions) options = { ...defaultOptions, ...userOptions };

  if ('breakpoint' in options) options.breakpoint = eval(options.breakpoint);

  // destructor
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
    focus,
    stopTransition
  } = options;

  const openBtnEl = document.querySelector(openBtn);
  const closeBtnEl = document.querySelector(closeBtn);
  const headerHeight = document.querySelector('.header').scrollHeight;

  if (notification) {
    notificationEl = document.querySelector(notification);
    visibleContent = document.querySelector('[data-nav-content]');
    notificationBtn = document.querySelector('[data-close-notification-btn]');
  }

  if (stopTransition) mainElement.classList.add('stop-transition');

  openBtnEl.addEventListener('click', open);
  closeBtnEl.addEventListener('click', close);

  if (breakpoint) {
    window.matchMedia(`(max-width: ${breakpoint}px)`).onchange = (e) => {
      if (mainElement.classList.contains('active') && !e.matches) close();
    };
  }

  /* ====================   FUNCTIONS   ==================== */

  function open() {
    if (stopTransition) mainElement.classList.remove('stop-transition');

    mainElement.classList.add('active');
    closeBtnEl.classList.add('active');
    openBtnEl.classList.remove('active');

    if (notification) {
      notificationBtn.click();
      visibleContent.style.maxHeight = `${window.innerHeight - headerHeight}px`;
    }

    if (backdrop) addBackdrop(backdrop);

    if (closeOnBackdropClick) backdropEl.addEventListener('click', close);

    if (scrollBlock) document.body.style.overflow = 'hidden';

    if (focus) {
      const focusEl = document.querySelector(focus);
      focusEl.focus();
      mainElement.addEventListener('transitionend', () => focusEl.focus(), {
        once: true,
      });
    }
  }

  function close() {
    if (notification) {
      notificationBtn.click();
    }

    if (stopTransition) {
      mainElement.addEventListener(
        'transitionend',
        () => {
          mainElement.classList.add('stop-transition');
        },
        { once: true }
      );
    }

    mainElement.classList.remove('active');
    closeBtnEl.classList.remove('active');
    openBtnEl.classList.add('active');
    document.body.style.overflow = null;
    mainElement.style.height = null;
    if (backdrop || smartBackdrop) removeBackdrop();
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

  
  /* function removeLater() {
     (alwaysFullscreen) {
      mainElement.style.height = availableViewportHeight + 'px';
      document.body.style.overflow = 'hidden';
      //console.log('USING ALL AVAILABLE VIEWPORT HEIGHT, BLOCKING BODY SCROLL');
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
  } */
}
