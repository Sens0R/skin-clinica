const burgerTogglerOpen = document.querySelector('.burger-toggler--open');
const burgerTogglerClose = document.querySelector('.burger-toggler--close');
const burgerMenu = document.querySelector('.nav-main');
//const burgerMenuOverlay = document.querySelector('.burger-menu-overlay');
//const burgerTogglerIcon = document.querySelector('.burger-toggler-icon');
/* const burgerTogglerIconClosed = document.querySelector(
  '.burger-toggler-icon-closed'
); */

function openBurgerMenu() {
  document.body.style.overflow = 'hidden';
  burgerMenu.classList.add('_active');
  burgerMenu.classList.add('animate__animated');
  burgerMenu.classList.add('animate__slideInDown');
}

function closeBurgerMenu() {
  document.body.style.removeProperty('overflow');
   burgerMenu.classList.remove('animate__slideInDown');
  burgerMenu.classList.add('animate__slideInUp');
  burgerMenu.classList.remove('_active');
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
  });
}

if (burgerTogglerClose) {
  burgerTogglerClose.addEventListener('click', function () {
    closeBurgerMenu();
  });
}

/* if (burgerMenuOverlay) {
  burgerMenuOverlay.addEventListener('click', function () {
    closeBurgerMenu();
  });
} */
