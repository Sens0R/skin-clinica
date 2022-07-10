export const breakpoint = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
};

/*  ============================= BACKDROP ================================
======================================================================== */

export let backdrop = '';

export function addBackdrop(activation) {
  const createBackdrop = document.createElement('div');
  createBackdrop.classList.add('backdrop');
  document.body.appendChild(createBackdrop);
  backdrop = document.querySelector('.backdrop');
  backdrop.classList.add(activation);
  backdrop.setAttribute('data-backdrop', 'close');
}

//backdrop.addEventListener('click', function () { });

export function removeBackdrop() {
  document.querySelector('.backdrop').remove();
}

export function backdropClick() {
  backdrop.addEventListener('click', function () {});
}

/*  ============================= MOBILE RESIZE ========================
======================================================================== */

export function closeBurgerOnResize(width, activeEl) {
  if (window.innerWidth >= width && activeEl.classList.contains('_active')) {
  }
}

export function closeSearchOnResize(width, activeEl) {
  if (window.innerWidth >= width && activeEl.classList.contains('_active')) {
    removeBackdrop();
    activeEl.classList.remove('_active');
  }
}

/*  ============================= ANIMATIONS ========================
======================================================================== */

const animatedEl = '#navigation';
const openAnimation = 'slideInDown';
const closeAnimation = 'slideOutUp';
const animationSpeed = 'faster';

export function addOpenAnimation(animatedEl, openAnimation, animationSpeed) {
  animateCSS(animatedEl, openAnimation);
  animateCSS(animatedEl, animationSpeed);
}

export function addCloseAnimation(animatedEl, closeAnimation, animationSpeed) {
  animateCSS(animatedEl, closeAnimation);
  animateCSS(animatedEl, animationSpeed);
}

export const animateCSS = (element, animation, prefix = 'animate__') =>
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
