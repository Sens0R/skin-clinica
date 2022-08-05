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

/*  ======================== RESIZE ======================= */

export function resize(width, closingFunction, targetElement) {
  window.matchMedia(`(max-width: ${width}px)`).onchange = (e) => {
    if (!e.matches && targetElement.classList.contains('_active'))
      closingFunction();
  };
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
