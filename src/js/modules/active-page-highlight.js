export function activePageHighlight() {
  const mainNavigationPages = document.querySelectorAll('[data-nav-page]');
  const currentPage = window.location.href;
  mainNavigationPages.forEach((navPage) => {
    const navPageLink = navPage.querySelector('a').href;
    if (currentPage === navPageLink) navPage.classList.add('active-page');
  });
}