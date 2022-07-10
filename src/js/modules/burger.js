

let navigation = '';


/*  ---------------------- BURGER VARIABLES -------------------------- */

const mediaBreakpoint = breakpoint.lg; // closing breakpoint
let addBackdrop = true;
const animations = {
  openAnimation: 'slideInDown',
  closeAnimation: 'slideOutUp',
  animationSpeed: 'faster',
};

/*  ---------------------- RUN BURGER -------------------------- */

export function runBurger() {
  navigation = document.getElementById('navigation');
  const burgerTogglerOpen = document.querySelector('.burger-toggler--open');
  const burgerTogglerClose = document.querySelector('.burger-toggler--close');

  if (navigation.hasAttribute('data-backdrop') || addBackdrop == true) {
    createBackdrop();
  }

  burgerTogglerClose.addEventListener('click', function () {
    closeBurger();
    addCloseAnimation(animations.closeAnimation, animations.animationSpeed);
  });

  burgerTogglerOpen.addEventListener('click', function () {
    openBurger();
    addOpenAnimation(animations.openAnimation, animations.animationSpeed);
  });

  window.addEventListener('resize', () => {
    closeBurgerOnResize(mediaBreakpoint);
  });
}

/*  ---------------------- HELPER FUNCTIONS -------------------------- */

export function createBackdrop() {
  addBackdrop = true;
  const createBackdrop = document.createElement('div');
  createBackdrop.classList.add('backdrop');
  navigation.after(createBackdrop);
  backdrop = document.querySelector('.backdrop');
  backdrop.addEventListener('click', function () {
    closeBurger();
    addCloseAnimation(animations.closeAnimation, animations.animationSpeed);
  });
}

export function activateBackdrop() {
  if (addBackdrop == true) {
    backdrop.classList.add('_active');
  }
}

export function removeBackdrop() {
  if (addBackdrop == true) {
    backdrop.classList.remove('_active');
  }
}

function closeBurgerOnResize(width) {
  if (window.innerWidth >= width && navigation.classList.contains('_active')) {
    closeBurger();
    removeBackdrop();
  }
}

function openBurger() {
  document.body.style.overflow = 'hidden';
  navigation.classList.add('_active');
  activateBackdrop();
}

function closeBurger() {
  document.body.style.removeProperty('overflow');
  navigation.classList.remove('_active');
  removeBackdrop();
}

/*  ---------------------- ANIMATE-CSS ---------------------------------- */

function addOpenAnimation(openAnimation, animationSpeed) {
  animateCSS('#navigation', openAnimation);
  animateCSS('#navigation', animationSpeed);
}

function addCloseAnimation(closeAnimation, animationSpeed) {
  animateCSS('#navigation', closeAnimation);
  animateCSS('#navigation', animationSpeed);
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
