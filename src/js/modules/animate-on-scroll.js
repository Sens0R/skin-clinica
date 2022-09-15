export function sectionAOS() {
  const sectionObserver = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        entry.target.classList.toggle('show', entry.isIntersecting);
      }),
    {
      threshold: 0.2,
    }
  );

  const sections = document.querySelectorAll('[data-animate="section"]');
  sections.forEach((section) => {
    sectionObserver.observe(section);
  });
}
