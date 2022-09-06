const accordionInstances = document.querySelectorAll('[data-accordion]');

window.matchMedia('(orientation: landscape)').onchange = () => {
  const activeButtons = document.querySelectorAll(
    '[data-accordion-content][aria-hidden="false"'
  );

  activeButtons.forEach((activeButton) => {
    activeButton.style.maxHeight = `${activeButton.scrollHeight}px`;
  });
};

export function accordion() {
  accordionInstances.forEach((accordionInstance, i) => {
    let instanceNumber;
    let accordionInstanceName = '';

    if (i > 0) {
      instanceNumber = '-' + (i + 1) + '-';
      accordionInstanceName = 'accordion';
    } else instanceNumber = '';

    const contentIdPrefix = accordionInstanceName + instanceNumber;
    const accordionButtons = accordionInstance.querySelectorAll(
      '[data-accordion-btn]'
    );

    accordionButtons.forEach((accordionButton, i) => {
      const content = accordionButton.parentNode.querySelector(
        '[data-accordion-content]'
      );

      accordionButton.ariaExpanded = 'false';
      content.ariaHidden = true;
      const contentId = `${contentIdPrefix}collapse-${i + 1}`;
      content.id = contentId;
      accordionButton.setAttribute('aria-controls', contentId);
      accordionButton.addEventListener('click', accordionToggler);

      function accordionToggler() {
        if (accordionButton.classList.contains('active')) {
          accordionButton.classList.remove('active');
          accordionButton.ariaExpanded = 'false';
          content.ariaHidden = true;
          content.style.maxHeight = null;
          return;
        }

        accordionButton.classList.add('active');
        accordionButton.ariaExpanded = 'true';
        content.ariaHidden = false;
        content.style.maxHeight = `${content.scrollHeight}px`;
      }
    });
  });
}
