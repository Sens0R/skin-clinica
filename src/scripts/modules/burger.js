const burgerMenuIcon = document.querySelector('.nav-toggler');
const navMenuMain = document.querySelector('.nav-menu');
const logo = document.querySelector('.header-logo');

if (burgerMenuIcon) {
  burgerMenuIcon.addEventListener('click', function () {
    document.body.classList.toggle('_lock');
    burgerMenuIcon.classList.toggle('_active');
    navMenuMain.classList.toggle('_active');
    logo.classList.toggle('_active');
    const navTogglerIcon = document.querySelector('.nav-toggler-icon');
    const navTogglerCross = document.querySelector('.nav-toggler-icon-cross');
    if (burgerMenuIcon.classList.contains('_active')) {
      navTogglerIcon.classList.toggle('d-none');
      navTogglerCross.classList.toggle('d-none');
    } else {
      navTogglerIcon.classList.toggle('d-none');
      navTogglerCross.classList.toggle('d-none');
    }
  });
}

window.addEventListener('resize', resizeListener);

function resizeListener() {
  if (window.innerWidth > 991 && logo.classList.contains('_active')) {
    logo.style.color = 'black';
  } else if (window.innerWidth < 992 && logo.classList.contains('_active')) {
    logo.style.color = '';
  }

  if (window.innerWidth > 991 && document.body.classList.contains('_lock')) {
    document.body.style.overflow = 'visible';
  } else if (
    window.innerWidth < 992 &&
    document.body.classList.contains('_lock')
  ) {
    document.body.style.overflow = '';
  }
}
