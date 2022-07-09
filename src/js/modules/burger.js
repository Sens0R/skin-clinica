const burgerTogglerOpen = document.querySelector('.burger-toggler--open');
const burgerTogglerClose = document.querySelector('.burger-toggler--close');
const navigation = document.getElementById('navigation');


//TODO ADD ANIMATIONS TO EVERY <a></a> INSIDE BURGER
//TODO MOVE TO REGULAR JS




/*  ---------------------- CLOSE ON RESIZE -------------------------- */

const sm = 576;
const md = 768;
const lg = 992;
const xl = 1200;
const mediaBreakpoint = lg; //for resize function

window.addEventListener('resize', () => {
  closeBurgerOnResize(mediaBreakpoint);
});

function closeBurgerOnResize(width) {
  if (window.innerWidth >= width && navigation.classList.contains('_active')) {
    closeBurger();
    removeBackdrop();
  }
}

/*  ---------------------- BACKDROP -------------------------- */

let addBackdrop = true;

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
    addCloseAnimation(closeAnimation);
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

/*  ---------------------- OPEN BURGER -------------------------- */

if (burgerTogglerOpen) {
  burgerTogglerOpen.addEventListener('click', function () {
    openBurger();
    addOpenAnimation(openAnimation);
  });
}

function openBurger() {
  document.body.style.overflow = 'hidden';
  navigation.classList.add('_active');
  activateBackdrop();
}

/*  ---------------------- CLOSE BURGER -------------------------- */

if (burgerTogglerClose) {
  burgerTogglerClose.addEventListener('click', function () {
    closeBurger();
    addCloseAnimation(closeAnimation);
  });
}

function closeBurger() {
  document.body.style.removeProperty('overflow');
  navigation.classList.remove('_active');
  removeBackdrop();
}

/*  ---------------------- ANIMATE-CSS ---------------------------------- */

let openAnimation = 'slideInDown';
let closeAnimation = 'slideOutUp';

function addOpenAnimation(openAnimation) {
  animateCSS('#navigation', openAnimation);
  animateCSS('#navigation', 'faster');
}

function addCloseAnimation(closeAnimation) {
  animateCSS('#navigation', closeAnimation);
  animateCSS('#navigation', 'faster');
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
