/* ====================   REFRESH SITE ON TOP   ==================== */

export function refreshSiteOnTOp() {
  history.scrollRestoration = 'manual';
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };
}

/* ====================   ELEMENT SIZE OBSERVER   ==================== */

export let elementSizeObserver;
export let elementHeight;
export let elementWidth;
export function useElementSize(observeElement, callback) {
  console.log(observeElement);

  elementSizeObserver = new ResizeObserver((entries) => {
    console.log('CONTENT HEIGHT OBSERVER FROM FUNCTIONS STARTED');
    entries.forEach((entry) => {
      elementHeight = entry.borderBoxSize[0].blockSize;
      elementWidth = entry.borderBoxSize[0].inlineSize;
      console.log('Height: ' + elementHeight + ' Width: ' + elementWidth);
      if (callback) callback();
    });
  });

  elementSizeObserver.observe(observeElement);
}

/*  ============================= BACKDROP ========================= */

export let backdropEl;

export function addBackdrop(targetElement, backdropClass) {
  const createBackdrop = document.createElement('div');
  createBackdrop.classList.add('backdrop');
  targetElement.after(createBackdrop);
  backdropEl = document.querySelector('.backdrop');
  backdropEl.classList.add(backdropClass);
  backdropEl.setAttribute('data-backdrop', 'close');
}

export function removeBackdrop() {
  const removeBackdrop = document.querySelector('.backdrop');
  if (removeBackdrop) removeBackdrop.remove();
}

/*  ============================= ANIMATIONS ========================= */

export function addAnimation(targetElement, style, speed) {
  animateCSS(targetElement, style);
  if (speed) animateCSS(targetElement, speed);
}

const animateCSS = (element, animation, prefix = 'animate__') =>
  // We create a Promise and return it
  new Promise((resolve) => {
    const animationName = `${prefix}${animation}`;
    const node = document.querySelector(element);

    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd, { once: true });
  });
