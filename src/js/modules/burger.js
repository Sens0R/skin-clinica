const burgerTogglerOpen = document.querySelector('.burger-toggler--open');
const burgerTogglerClose = document.querySelector('.burger-toggler--close');
const burgerMenu = document.querySelector('.nav-main');

const animateCSS = (element, animation, prefix = 'animate__') =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
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
// TODO REMOVE BACKDROP ON CLICK

function closeBurgerMenu() {
  document.body.style.removeProperty('overflow');
  burgerMenu.classList.remove('_active');
  removeBackdrop();
}

window.addEventListener('resize', resizeListener);

function resizeListener() {
  if (window.innerWidth > 991 && burgerMenu.classList.contains('_active')) {
    closeBurgerMenu();
  }
}

if (burgerTogglerOpen) {
  burgerTogglerOpen.addEventListener('click', function () {
    openBurgerMenu();
    animateCSS('.nav-main', 'slideInDown');
    animateCSS('.nav-main', 'faster');
  });
}

if (burgerTogglerClose) {
  burgerTogglerClose.addEventListener('click', function () {
    closeBurgerMenu();
    animateCSS('.nav-main', 'slideOutUp');
    animateCSS('.nav-main', 'faster');
  });
}
