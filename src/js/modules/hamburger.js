const defaultOptions = {
  mainElement: '[data-nav]',
  toggler: '[data-nav-btn]',
  hamburgerId: 'navigation',
  adjustViewport: false,
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

export function hamburger(userOptions) {
  let options = defaultOptions;
  let mainElement;
  let headerHeight;
  let content;

  userOptions && 'mainElement' in userOptions
    ? (mainElement = document.querySelector(userOptions.mainElement))
    : (mainElement = document.querySelector(defaultOptions.mainElement));

  if (userOptions) options = { ...defaultOptions, ...userOptions };

  // destructor
  let {
    notification,
    toggler,
    hamburgerId,
    adjustViewport,
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

  toggler = document.querySelector(toggler);
  mainElement.id = hamburgerId;
  toggler.type = 'button';
  toggler.setAttribute('aria-expanded', 'false');
  toggler.setAttribute('aria-hasPopup', 'true');
  toggler.setAttribute('aria-label', `Toggle ${hamburgerId}`);
  toggler.setAttribute('aria-controls', hamburgerId);

  const firstFocusableEl = mainElement.querySelectorAll(
    'button, [href]:not(use), input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )[0];

  let contentHasTransition = getComputedStyle(mainElement).getPropertyValue(
    'transition-duration'
  );

  if (contentHasTransition === '0s') contentHasTransition = false;

  if (adjustViewport) {
    headerHeight = document.querySelector('header').scrollHeight;
    content = document.querySelector(adjustViewport);
  }

  if (notification) {
    notification = document.querySelector(notification);
  }

  if (stopTransition) mainElement.classList.add('stop-transition');

  // add error check here for missing elements - mainElement, openBtn, closeBtn, notification, content

  toggler.addEventListener('click', open);
  toggler.addEventListener('keydown', keyboardNavigation);

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
    if (mainElement.classList.contains('active')) return close();
    mainElement.classList.add('active');
    mainElement.setAttribute('aria-modal', 'true');
    mainElement.setAttribute('role', 'dialog');

    toggler.classList.add('active');
    toggler.setAttribute('aria-expanded', 'true');

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', closeWithEsc);

    if (adjustViewport) {
      calcContentHeight();
      window.visualViewport.addEventListener('resize', calcContentHeight); // mobile browser header fix
    }

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
    mainElement.style.height = null;
    mainElement.removeAttribute('aria-modal');
    mainElement.removeAttribute('role');

    toggler.classList.remove('active');
    toggler.setAttribute('aria-expanded', 'false');

    document.body.style.overflow = null;
    document.removeEventListener('keyup', closeWithEsc);

    if (adjustViewport) {
      window.visualViewport.removeEventListener('resize', calcContentHeight);
    }

    if (backdrop || smartBackdrop) removeBackdrop();

    if (stopTransition) {
      mainElement.addEventListener(
        'transitionend',
        () => mainElement.classList.add('stop-transition'),
        { once: true }
      );
    }
  }

  function keyboardNavigation() {
    if (!contentHasTransition) return firstFocusableEl.focus();

    mainElement.addEventListener(
      'transitionend',
      () => firstFocusableEl.focus(),
      {
        once: true,
      }
    );

    mainElement.addEventListener('focusout', focusOut);
  }

  function focusOut() {
    setTimeout(() => {
      if (!mainElement.contains(document.activeElement)) {
        mainElement.removeEventListener('focusout', focusOut);
        close();
        //openBtn.focus();
        toggler.focus();
      }
    }, 25);
  }

  function closeWithEsc(e) {
    if (e.key === 'Escape' || e.key === 'Esc' || e.code === 27) {
      close();
      //openBtn.focus();
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
