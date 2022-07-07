const burgerTogglerOpen = document.querySelector('.burger-toggler--open');
const burgerTogglerClose = document.querySelector('.burger-toggler--close');
const burgerMenu = document.getElementById('navigation');
const navResize = document.querySelectorAll('[data-nav-resize]');

/*  BURGER CONTROL VARIABLES */
const sm = 576;
const md = 768;
const lg = 992;
const xl = 1200;
const mediaBreakpoint = lg;
const showDesktop = 'd-lg-none';

window.addEventListener('load', () => {
  showNavigation(mediaBreakpoint);
  navResize.forEach((attr) => {
    attr.classList.add(showDesktop);
  });
});

window.addEventListener('resize', () => {
  showNavigation(mediaBreakpoint);
  closeBurgerOnResize(mediaBreakpoint);
});

function closeBurgerOnResize(width) {
  if (window.innerWidth >= width && burgerMenu.classList.contains('_active')) {
    closeBurgerMenu();
  }
}

function showNavigation(width) {
  // show mobile
  if (window.innerWidth < width) {
    burgerMenu.classList.add('nav-mobile');
    burgerMenu.classList.remove('nav-desktop');
  }
  // show desktop
  if (window.innerWidth >= width) {
    burgerMenu.classList.remove('nav-mobile');
    burgerMenu.classList.add('nav-desktop');
  }
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

function addBackdrop() {
  const addBackdrop = document.createElement('div');
  addBackdrop.id = 'backdrop';
  document.body.appendChild(addBackdrop);
}

function removeBackdrop() {
  const removeBackdropEl = document.getElementById('backdrop');
  removeBackdropEl.remove();
}

function openBurgerMenu() {
  document.body.style.overflow = 'hidden';
  burgerMenu.classList.add('_active');
  addBackdrop();
}

function closeBurgerMenu() {
  document.body.style.removeProperty('overflow');
  burgerMenu.classList.remove('_active');
  removeBackdrop();
}

if (burgerTogglerOpen) {
  burgerTogglerOpen.addEventListener('click', function () {
    openBurgerMenu();
    animateCSS('#navigation', 'slideInDown');
    animateCSS('#navigation', 'faster');
  });
}

if (burgerTogglerClose) {
  burgerTogglerClose.addEventListener('click', function () {
    closeBurgerMenu();
    animateCSS('#navigation', 'slideOutUp');
    animateCSS('#navigation', 'faster');
  });
}
