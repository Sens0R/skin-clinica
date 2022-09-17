const defaultOptions = {
  mainElement: '[data-search]',
  openBtn: '[data-search-btn="open"]',
  closeBtn: '[data-search-btn="close"]',
  searchId: 'nav-search',
  breakpoint: 992,
  stopTransition: false,
};

/*  ---------------------- RUN  -------------------------- */

export function search(userOptions) {
  let options = defaultOptions;
  let mainElement;
  
  userOptions && 'mainElement' in userOptions
    ? (mainElement = document.querySelector(userOptions.mainElement))
    : (mainElement = document.querySelector(defaultOptions.mainElement));

  if (userOptions) options = { ...defaultOptions, ...userOptions };

  // destructor
  let {
    openBtn,
    closeBtn,
    breakpoint,
    stopTransition,
    searchId,
  } = options;


  openBtn = document.querySelector(openBtn);
  closeBtn = document.querySelector(closeBtn);
  /*   mainElement.id = hamburgerId;
  
  toggler.type = 'button';
  toggler.setAttribute('aria-expanded', 'false');
  toggler.setAttribute('aria-hasPopup', 'true');
  toggler.setAttribute('aria-label', `Toggle ${hamburgerId}`);
  toggler.setAttribute('aria-controls', hamburgerId); */

  const firstFocusableEl = mainElement.querySelectorAll(
    'button, [href]:not(use), input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )[0];

  let contentHasTransition = getComputedStyle(mainElement).getPropertyValue(
    'transition-duration'
  );

  if (contentHasTransition === '0s') contentHasTransition = false;

  if (stopTransition) mainElement.classList.add('stop-transition');

  // add error check here for missing elements - mainElement, openBtn, closeBtn, notification, content

  openBtn.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
  openBtn.addEventListener('keydown', keyboardNavigation);

  // close on resize
  if (breakpoint) {
    window.matchMedia(`(max-width: ${breakpoint}px)`).onchange = (e) => {
      if (mainElement.classList.contains('active') && !e.matches) close();
    };
  }

  /* ====================   FUNCTIONS   ==================== */

  function open() {
    mainElement.classList.add('active');
   
   
    if (stopTransition) mainElement.classList.remove('stop-transition');
  }

  function close() {
    mainElement.classList.remove('active');
    
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
        toggler.focus();
      }
    }, 25);
  }
  
}
