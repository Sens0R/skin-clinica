import { main } from '@popperjs/core';

const defaultOptions = {
  mainElement: '[data-search]',
  openBtn: '[data-search-btn="open"]',
  closeBtn: '[data-search-btn="close"]',
  inputId: '[data-search] input',
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
  let { openBtn, closeBtn, submitBtn, breakpoint, stopTransition, inputId } =
    options;

  openBtn = document.querySelector(openBtn);
  //openBtn.setAttribute('aria-hasPopup', 'true');

  closeBtn = document.querySelector(closeBtn);
  submitBtn = document.querySelector(submitBtn);
  const searchInput = document.querySelector(inputId);

  /*   mainElement.id = hamburgerId;
  
  toggler.type = 'button';
  toggler.setAttribute('aria-expanded', 'false');
  
  toggler.setAttribute('aria-label', `Toggle ${hamburgerId}`);
  toggler.setAttribute('aria-controls', hamburgerId); */

  let contentHasTransition = getComputedStyle(mainElement).getPropertyValue(
    'transition-duration'
  );

  if (contentHasTransition === '0s') contentHasTransition = false;

  if (stopTransition) mainElement.classList.add('stop-transition');

  // add error check here for missing elements - mainElement, openBtn, closeBtn, notification, content

  openBtn.addEventListener('click', open);
  openBtn.addEventListener('keydown', keyboardNavigation);
  closeBtn.addEventListener('click', close);

  // close on resize
  if (breakpoint) {
    window.matchMedia(`(max-width: ${breakpoint}px)`).onchange = (e) => {
      if (mainElement.classList.contains('active') && !e.matches) close();
    };
  }

  /* ====================   FUNCTIONS   ==================== */

  function open() {
    mainElement.classList.add('active');
    //mainElement.setAttribute('aria-expanded', 'true');
    if (stopTransition) mainElement.classList.remove('stop-transition');
    focusInput();
  }

  function close() {
    mainElement.classList.remove('active');
    document.activeElement.blur();

    if (stopTransition) {
      mainElement.addEventListener(
        'transitionend',
        () => mainElement.classList.add('stop-transition'),
        { once: true }
      );
    }
  }

  function focusInput() {
    if (!contentHasTransition) searchInput.focus();
    if (contentHasTransition)
      mainElement.addEventListener('transitionend', () => searchInput.focus(), {
        once: true,
      });
  }

  function keyboardNavigation() {
    mainElement.addEventListener('focusout', focusOut);
  }

  function focusOut() {
    setTimeout(() => {
      if (!mainElement.contains(document.activeElement)) {
        mainElement.removeEventListener('focusout', focusOut);
        close();
        openBtn.focus();
      }
    }, 25);
  }
}
