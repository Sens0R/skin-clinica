export function activePageHighlight() {
  const mainNavigationPages = document.querySelectorAll('[data-nav-page]');
  const currentPage = window.location.href;
  mainNavigationPages.forEach((navPage) => {
    const navPageLink = navPage.querySelector('a');
    if (currentPage === navPageLink.href) {
      navPage.classList.add('active-page');
      navPageLink.setAttribute('aria-current', 'page');
    }
  });
}
