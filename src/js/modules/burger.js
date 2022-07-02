const burgerToggler = document.querySelector('.burger-toggler');
const burgerMenu = document.querySelector('.burger-menu');
const burgerMenuMask = document.querySelector('.burger-menu-mask');
const burgerTogglerIcon = document.querySelector('.burger-toggler-icon');
const burgerTogglerIconClosed = document.querySelector(
  '.burger-toggler-icon-closed'
);

if (burgerToggler) {
  burgerToggler.addEventListener('click', function () {
    document.body.classList.toggle('_lock');
    burgerMenu.classList.toggle('d-none');
    burgerMenuMask.classList.toggle('d-none');
    burgerToggler.classList.toggle('_active');

    if (burgerToggler.classList.contains('_active')) {
      burgerTogglerIcon.classList.toggle('d-none');
      burgerTogglerIconClosed.classList.toggle('d-none');
    } else {
      burgerTogglerIcon.classList.toggle('d-none');
      burgerTogglerIconClosed.classList.toggle('d-none');
    }
  });
}

function closeBurgerMenu() {
  document.body.classList.toggle('_lock');
  burgerMenuMask.classList.add('d-none');
  burgerMenu.classList.add('d-none');
  burgerToggler.classList.remove('_active');
  burgerTogglerIconClosed.classList.add('d-none');
  burgerTogglerIcon.classList.remove('d-none');
}

if (burgerMenuMask) {
  burgerMenuMask.addEventListener('click', function () {
    closeBurgerMenu();
  });
}

window.addEventListener('resize', resizeListener);

function resizeListener() {
  if (window.innerWidth > 767 && burgerToggler.classList.contains('_active')) {
    closeBurgerMenu();
  }
}
