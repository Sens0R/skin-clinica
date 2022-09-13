window.matchMedia('(orientation: landscape)').onchange = () => {
  const activeButtons = document.querySelectorAll(
    '[data-accordion-content][aria-hidden="false"'
  );

  activeButtons.forEach((activeButton) => {
    activeButton.style.maxHeight = `${activeButton.scrollHeight}px`;
  });
};

export function accordion() {
  const accordionButtons = document.querySelectorAll('[data-accordion-btn]');

  accordionButtons.forEach((accordionButton) => {
    const content = accordionButton.parentNode.nextElementSibling;
    content.setAttribute('aria-hidden', 'true');
    accordionButton.querySelector('svg').setAttribute('aria-hidden', 'true');
    accordionButton.setAttribute('aria-expanded', 'false');
    accordionButton.addEventListener('click', accordionToggler);

    function accordionToggler() {
      if (accordionButton.classList.contains('active')) {
        accordionButton.classList.remove('active');
        accordionButton.setAttribute('aria-expanded', 'false');
        content.setAttribute('aria-hidden', 'true');
        content.style.maxHeight = null;
        return;
      }

      accordionButton.classList.add('active');
      accordionButton.setAttribute('aria-expanded', 'true');
      content.setAttribute('aria-hidden', 'false');
      content.style.maxHeight = `${content.scrollHeight}px`;
    }
  });
}
