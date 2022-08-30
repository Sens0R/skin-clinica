export function accordion(
  accordionInstance = '.accordion',
  accordionButton = '.accordion__button',
  kill = false
) {
  if (kill) {

  }
  
  let accordionInstances = document.querySelectorAll(accordionInstance);

  accordionInstances.forEach((accordionInstance, i) => {
    let instanceNumber;
    let accordionInstanceName = '';

    if (i > 0) {
      instanceNumber = '-' + (i + 1) + '-';
      accordionInstanceName = 'accordion';
    } else instanceNumber = '';

    const contentIdPrefix = accordionInstanceName + instanceNumber;
    const accordionButtons =
      accordionInstance.querySelectorAll(accordionButton);

    accordionButtons.forEach((accordionButton, i) => {
      const content = accordionButton.nextElementSibling;
      let contentHeight;
      accordionButton.ariaExpanded = 'false';
      content.ariaHidden = true;
      const contentId = `${contentIdPrefix}collapse-${i + 1}`;
      content.id = contentId;
      accordionButton.setAttribute('aria-controls', contentId);

      const mediaQueryOrientation = window.matchMedia(
        '(orientation: landscape)'
      );
      mediaQueryOrientation.addEventListener('change', changeHandler);

      function changeHandler(e) {
        if (accordionButton.classList.contains('_active'))
          if (e.matches) {
            contentHeight = content.scrollHeight;
            content.style.maxHeight = `${contentHeight}px`;
          } else {
            contentHeight = content.scrollHeight;
            content.style.maxHeight = `${contentHeight}px`;
          }
      }

      accordionButton.addEventListener('click', accordionBtnToggler);
      accordionButton.addEventListener('keyup', (e) => {
        if (e.key === 'Enter' || e.key === 'Space') {
          accordionBtnToggler();
        }
      });

      function accordionBtnToggler() {
        if (accordionButton.classList.contains('_active')) {
          accordionButton.classList.remove('_active');

          accordionButton.ariaExpanded = 'false';
          content.ariaHidden = true;

          content.style.maxHeight = null;
          return;
        }

        contentHeight = content.scrollHeight;
        accordionButton.classList.add('_active');

        accordionButton.ariaExpanded = 'true';
        content.ariaHidden = false;
        content.style.maxHeight = `${contentHeight}px`;
      }
    });
  });
}

export function accordionKill() {
  let accordionInstances = document.querySelectorAll(accordionInstance);

  accordionInstances.forEach((accordionInstance, i) => {
    let instanceNumber;
    let accordionInstanceName = '';

    if (i > 0) {
      instanceNumber = '-' + (i + 1) + '-';
      accordionInstanceName = 'accordion';
    } else instanceNumber = '';

    const contentIdPrefix = accordionInstanceName + instanceNumber;
    const accordionButtons =
      accordionInstance.querySelectorAll(accordionButton);

    accordionButtons.forEach((accordionButton, i) => {
      const content = accordionButton.nextElementSibling;
      let contentHeight;
      accordionButton.ariaExpanded = 'false';
      content.ariaHidden = true;
      const contentId = `${contentIdPrefix}collapse-${i + 1}`;
      content.id = contentId;
      accordionButton.setAttribute('aria-controls', contentId);

      const mediaQueryOrientation = window.matchMedia(
        '(orientation: landscape)'
      );
      mediaQueryOrientation.addEventListener('change', changeHandler);

      function changeHandler(e) {
        if (accordionButton.classList.contains('_active'))
          if (e.matches) {
            contentHeight = content.scrollHeight;
            content.style.maxHeight = `${contentHeight}px`;
          } else {
            contentHeight = content.scrollHeight;
            content.style.maxHeight = `${contentHeight}px`;
          }
      }

      accordionButton.addEventListener('click', accordionBtnToggler);
      accordionButton.addEventListener('keyup', (e) => {
        if (e.key === 'Enter' || e.key === 'Space') {
          accordionBtnToggler();
        }
      });

      function accordionBtnToggler() {
        if (accordionButton.classList.contains('_active')) {
          accordionButton.classList.remove('_active');

          accordionButton.ariaExpanded = 'false';
          content.ariaHidden = true;

          content.style.maxHeight = null;
          return;
        }

        contentHeight = content.scrollHeight;
        accordionButton.classList.add('_active');

        accordionButton.ariaExpanded = 'true';
        content.ariaHidden = false;
        content.style.maxHeight = `${contentHeight}px`;
      }
    });
  });
}
