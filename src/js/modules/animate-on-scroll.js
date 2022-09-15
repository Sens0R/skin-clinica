export function sectionAOS() {
  const sectionObserver = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('show');
      }),
    {
      threshold: 0.33,
    }
  );

  const sections = document.querySelectorAll('[data-animate="section"]');
  sections.forEach((section) => {
    sectionObserver.observe(section);
  });
}
