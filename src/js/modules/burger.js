const burgerTogglerOpen = document.querySelector('.burger-toggler--open');
const burgerTogglerClose = document.querySelector('.burger-toggler--close');
const navigation = document.getElementById('navigation');

/*  BURGER CONTROL VARIABLES */
const sm = 576;
const md = 768;
const lg = 992;
const xl = 1200;
const mediaBreakpoint = lg;
let addBackdrop = false;

//TODO BACKDROP TRANSITION
//TODO REWORK ANIMATIONS
//TODO ADD ANIMATIONS TO EVERY <a></a> INSIDE BURGER
//TODO MOVE TO REGULAR JS

window.addEventListener('resize', () => {
  closeBurgerOnResize(mediaBreakpoint);
});

/*  ---------------------- BACKDROP -------------------------- */

if (navigation.hasAttribute('data-backdrop')) {
  addBackdrop = true;
}

if (addBackdrop == true) {
  const createBackdrop = document.createElement('div');
  createBackdrop.classList.add('backdrop');
  navigation.after(createBackdrop);

  const backdrop = document.querySelector('.backdrop');
  backdrop.addEventListener('click', function () {
    closeBurger();
    animateCSS('#navigation', 'slideOutUp');
    animateCSS('#navigation', 'faster');
  });
}

const backdrop = document.querySelector('.backdrop');

function activateBackdrop() {
  if (addBackdrop == true) {
    backdrop.classList.add('_active');
  }
}

function removeBackdrop() {
  if (addBackdrop == true) {
    backdrop.classList.remove('_active');
  }
}

/*  ---------------------- HELPER FUNCTIONS -------------------------- */

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

/*  ---------------------- OPEN BURGER ON CLICK -------------------------- */

if (burgerTogglerOpen) {
  burgerTogglerOpen.addEventListener('click', function () {
    openBurger();
    animateCSS('#navigation', 'slideInDown');
    animateCSS('#navigation', 'faster');
  });
}

/*  ---------------------- CLOSE BURGER ON CLICK -------------------------- */

if (burgerTogglerClose) {
  burgerTogglerClose.addEventListener('click', function () {
    closeBurger();
    animateCSS('#navigation', 'slideOutUp');
    animateCSS('#navigation', 'faster');
  });
}

/*  ---------------------- ANIMATE-CSS ---------------------------------- */

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
