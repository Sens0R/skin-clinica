export const stickyScrollNavigation = function () {
  const body = document.body;
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll <= 0) {
      body.classlist.remove('scroll-up');
    }

    if (currentScroll > lastScroll && !body.classList.contains('scroll-down')) {
      if (currentScroll > 50) {
        body.classList.remove('scroll-up');
        body.classList.add('scroll-down');
      }
    }

    if (currentScroll < lastScroll && body.classList.contains('scroll-down')) {
      if (currentScroll > 50) {
        body.classList.remove('scroll-down');
        body.classList.add('scroll-up');
      }
    }

    lastScroll = currentScroll;
  });
};
