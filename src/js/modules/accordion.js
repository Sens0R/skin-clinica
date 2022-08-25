export function accordion(accordionBtn, name = 'accordion') {
  const accordionButtons = document.querySelectorAll(accordionBtn);

  accordionButtons.forEach((accordionButton, i) => {
    const content = accordionButton.nextElementSibling;
    let contentHeight;

    accordionButton.ariaExpanded = 'false';
    content.ariaHidden = true;
    const contentId = `${name}-collapse-${i + 1}`;
    content.id = contentId;
    accordionButton.setAttribute('aria-controls', contentId);
    console.log(content);
    console.log(accordionButton);

    const mql = window.matchMedia('(orientation: landscape)');
    mql.addEventListener('change', changeHandler);

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
    accordionButton.addEventListener('keyup', () => {
      if (key === 'Enter' || key === 'Space') {
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
}
