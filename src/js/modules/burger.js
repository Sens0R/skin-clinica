const burgerToggler = document.querySelector('.burger-toggler');
const burgerMenu = document.querySelector('.burger-menu');
const burgerMenuOverlay = document.querySelector('.burger-menu-overlay');
const burgerTogglerIcon = document.querySelector('.burger-toggler-icon');
const burgerTogglerIconClosed = document.querySelector(
  '.burger-toggler-icon-closed'
);

if (burgerToggler) {
  burgerToggler.addEventListener('click', function () {
    document.body.classList.toggle('_lock');
    burgerMenu.classList.toggle('d-none');
    burgerMenuOverlay.classList.toggle('d-none');
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
  burgerMenuOverlay.classList.add('d-none');
  burgerMenu.classList.add('d-none');
  burgerToggler.classList.remove('_active');
  burgerTogglerIconClosed.classList.add('d-none');
  burgerTogglerIcon.classList.remove('d-none');
}

if (burgerMenuOverlay) {
  burgerMenuOverlay.addEventListener('click', function () {
    closeBurgerMenu();
  });
}

window.addEventListener('resize', resizeListener);

function navigationFunc() {
  const navMenuMain = document.getElementById('nav-menu-main');
  const navMenuSecondary = document.getElementById('nav-menu-secondary');
  const desktopNavMenuMain = document.getElementById('desktop-nav-menu-main');
  const desktopNavMenuSecondary = document.getElementById(
    'desktop-nav-menu-secondary'
  );
  const burgerNavMenuMain = document.getElementById('burger-nav-menu-main');
  const burgerNavMenuSecondary = document.getElementById(
    'burger-nav-menu-secondary'
  );

  if (window.outerWidth < 768) {
    burgerNavMenuMain.insertBefore(
      navMenuMain,
      burgerNavMenuMain.childNodes[0]
    ); //  mob.appendChild(nav) = add last
    burgerNavMenuSecondary.insertBefore(
      navMenuSecondary,
      burgerNavMenuSecondary.childNodes[0]
    );
  } else {
    desktopNavMenuMain.insertBefore(
      navMenuMain,
      desktopNavMenuMain.childNodes[0]
    );
    desktopNavMenuSecondary.insertBefore(
      navMenuSecondary,
      desktopNavMenuSecondary.childNodes[0]
    );
  }
}

window.addEventListener('load', () => {
  navigationFunc();
});

function resizeListener() {
  if (window.innerWidth > 767 && burgerToggler.classList.contains('_active')) {
    closeBurgerMenu();
  }
  navigationFunc();
}
