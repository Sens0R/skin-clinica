export function accordion(accordionBtn) {
  const accordionButtons = document.querySelectorAll(accordionBtn);

  accordionButtons.forEach((accordionButton) => {
    const content = accordionButton.nextElementSibling;
    let contentHeight;

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

    accordionButton.addEventListener('click', () => {
      if (accordionButton.classList.contains('_active')) {
        accordionButton.classList.remove('_active');
        content.style.maxHeight = null;
        return;
      }

      contentHeight = content.scrollHeight;

      accordionButton.classList.add('_active');
      content.style.maxHeight = `${contentHeight}px`;
    });
  });
}
