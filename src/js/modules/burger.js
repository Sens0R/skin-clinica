const burgerMenuIcon = document.querySelector('.nav-toggler');
const burgerMenu = document.querySelector('.burger-menu');

if (burgerMenuIcon) {
  burgerMenuIcon.addEventListener('click', function () {
    document.body.classList.toggle('_lock');
    burgerMenuIcon.classList.toggle('_active');
    burgerMenu.classList.toggle('_active');
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
  if (window.innerWidth > 991 && document.body.classList.contains('_lock')) {
    document.body.style.overflow = 'visible';
  } else if (
    window.innerWidth < 992 &&
    document.body.classList.contains('_lock')
  ) {
    document.body.style.overflow = '';
  }
}
