const sm = 576;
const md = 768;
const lg = 992;
const xl = 1200;
const mediaBreakpoint = lg;
showNavigation(mediaBreakpoint);
function showNavigation(width) {
  // show mobile
  if (window.innerWidth < width) {
    navigation.classList.add('nav-mobile');
    navigation.classList.remove('nav-desktop');
  }
  // show desktop
  if (window.innerWidth >= width) {
    navigation.classList.remove('nav-mobile');
    navigation.classList.add('nav-desktop');
  }
}