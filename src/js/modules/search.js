const defaultOptions = {
  mainElement: '[data-search]',
  toggler: '[data-nav-btn]',
  ariaControls: 'navigation',
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

export function search(userOptions) {
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
    ariaControls,
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

  ariaControls = document.getElementById('navigation');
  console.log(ariaControls)
  toggler = document.querySelector(toggler);
  toggler.ariaExpanded = false;
  toggler.ariaHasPopup = true;

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
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', closeWithEsc);

    toggler.classList.add('active');
    toggler.ariaExpanded = true;

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
    document.body.style.overflow = null;
    mainElement.style.height = null;
    document.removeEventListener('keyup', closeWithEsc);
    toggler.classList.remove('active');
    toggler.ariaExpanded = false;

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
}
