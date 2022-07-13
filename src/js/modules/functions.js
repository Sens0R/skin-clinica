export const breakpoint = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
};

/*  ============================= BACKDROP ================================
======================================================================== */

export let backdrop = '';

export function addBackdrop(targetElement, backdropStyle) {
  const createBackdrop = document.createElement('div');
  createBackdrop.classList.add('backdrop');
  targetElement.after(createBackdrop);
  backdrop = document.querySelector('.backdrop');
  backdrop.classList.add(backdropStyle);
  backdrop.setAttribute('data-backdrop', 'close');
}

export function removeBackdrop() {
  document.querySelector('.backdrop').remove();
}

/*  ======================== CLOSE ON RESIZE ========================
======================================================================== */

export function closeOnResize(width, targetElement, closingFunction) {
  window.addEventListener('resize', () => {
    if (
      window.innerWidth >= width &&
      targetElement.classList.contains('_active')
    ) {
      closingFunction.call();
      targetElement.classList.remove('_active');
    }
  });
}

/*  ============================= ANIMATIONS ========================
======================================================================== */

export function addAnimation(targetElement, style, speed) {
  animateCSS(targetElement, style);
  if (speed) animateCSS(targetElement, speed);
}

const animateCSS = (element, animation, prefix = 'animate__') =>
  // We create a Promise and return it
  new Promise((resolve) => {
    const animationName = `${prefix}${animation}`;

    element.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      element.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }

    element.addEventListener('animationend', handleAnimationEnd, {
      once: true,
    });
  });
