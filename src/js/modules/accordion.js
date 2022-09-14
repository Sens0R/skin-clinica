const accordionInstances = document.querySelectorAll('[data-accordion]');

window.matchMedia('(orientation: landscape)').onchange = () => {
  const activeButtons = document.querySelectorAll(
    '[data-accordion] * button[aria-expanded="true"]'
  );

  activeButtons.forEach((activeButton) => {
    const expandedContent = activeButton.parentNode.nextElementSibling;
    expandedContent.style.maxHeight = `${expandedContent.scrollHeight}px`;
  });
};

export function accordion() {
  accordionInstances.forEach((accordionInstance) => {
    const accordionButtons = accordionInstance.querySelectorAll('button');
    const accordionInstanceName = accordionInstance.dataset.accordion;

    accordionButtons.forEach((accordionButton, i) => {
      i = 1 + i++;

      accordionButton.id = `accordion-${accordionInstanceName}-header-${i}`;
      accordionButton.setAttribute(
        'aria-controls',
        `accordion-${accordionInstanceName}-panel-${i}`
      );
      accordionButton.setAttribute('aria-expanded', 'false');
      accordionButton.addEventListener('click', accordionToggler);

      const content = accordionButton.parentNode.nextElementSibling;
      content.setAttribute('aria-hidden', 'true');
      content.id = `accordion-${accordionInstanceName}-panel-${i}`;
      content.setAttribute('aria-labelledby', `${accordionButton.id}`);

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
  });
}
