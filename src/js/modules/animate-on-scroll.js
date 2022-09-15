export function animateOnScroll() {
  const sectionObserver = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('show');
      }),
    {
      threshold: 0,
    }
  );

  const sections = document.querySelectorAll('[data-animate]');
  sections.forEach((section) => {
    sectionObserver.observe(section);
  });
}
