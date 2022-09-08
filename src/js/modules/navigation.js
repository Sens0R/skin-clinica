const defaultOptions = {
  mainElement: '[data-nav]',
  openBtn: '[data-nav-btn="open"]',
  closeBtn: '[data-nav-btn="close"]',
  notification: false,
  breakpoint: 992,
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
  const headerHeight = document.querySelector('header').scrollHeight;
  const content = document.querySelector('[data-nav-content]');

  let options = defaultOptions;
  let mainElement;

  userOptions && 'mainElement' in userOptions
    ? (mainElement = document.querySelector(userOptions.mainElement))
    : (mainElement = document.querySelector(defaultOptions.mainElement));

  if (userOptions) options = { ...defaultOptions, ...userOptions };

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
    stopTransition,
  } = options;

  openBtn = document.querySelector(openBtn);
  closeBtn = document.querySelector(closeBtn);

  if (notification) {
    notification = document.querySelector(notification);
  }

  if (stopTransition) mainElement.classList.add('stop-transition');

  // add content to default options
  // add error check here for missing elements - mainElement, openBtn, closeBtn, notification, content

  openBtn.addEventListener('click', open);
  closeBtn.addEventListener('click', close);

  // adjust height on orientation change
  window.matchMedia('(orientation: landscape)').onchange = () => {
    if (mainElement.classList.contains('active')) calcContentHeight();
  };

  // close on resize
  if (breakpoint) {
    window.matchMedia(`(max-width: ${breakpoint}px)`).onchange = (e) => {
      if (mainElement.classList.contains('active') && !e.matches) close();
    };
  }

  /* ====================   FUNCTIONS   ==================== */

  function open() {
    mainElement.classList.add('active');
    closeBtn.classList.add('active');
    openBtn.classList.remove('active');
    document.body.style.overflow = 'hidden';
    calcContentHeight();
    window.visualViewport.addEventListener('resize', calcContentHeight); // mobile browser header fix

    if (stopTransition) mainElement.classList.remove('stop-transition');

    if (notification) notification.click();

    if (backdrop) addBackdrop(backdrop);

    if (closeOnBackdropClick) backdrop.addEventListener('click', close);

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
    mainElement.classList.remove('active');
    closeBtn.classList.remove('active');
    openBtn.classList.add('active');
    document.body.style.overflow = null;
    mainElement.style.height = null;
    window.visualViewport.removeEventListener('resize', calcContentHeight);

    if (backdrop || smartBackdrop) removeBackdrop();

    if (stopTransition) {
      mainElement.addEventListener(
        'transitionend',
        () => mainElement.classList.add('stop-transition'),
        { once: true }
      );
    }
  }

   function calcContentHeight() {
    content.style.maxHeight = `${window.innerHeight - headerHeight}px`;
  } 

  function addBackdrop(backdropClass) {
    const createBackdrop = document.createElement('div');
    createBackdrop.classList.add('nav-backdrop');
    document.querySelector('.page-wrapper').after(createBackdrop);
    backdrop = document.querySelector('.nav-backdrop');
    backdrop.classList.add(backdropClass);
  }

  function removeBackdrop() {
    backdrop.remove();
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
