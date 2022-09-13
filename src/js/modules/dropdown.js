let dropdowns;
let desktop;
let mobile;
const dropdownsMedia = window.matchMedia(`(max-width: 992px)`);

window.matchMedia('(orientation: landscape)').onchange = () => {
  const openDropdownContent = document.querySelectorAll(
    '[data-dropdown-content][aria-hidden="false"'
  );

  openDropdownContent.forEach((openContent) => {
    openContent.style.maxHeight = `${openContent.scrollHeight}px`;
  });
};

export function dropdown() {
  if (dropdownsMedia.matches) {
    desktop = false;
    mobile = true;
  } else {
    mobile = false;
    desktop = true;
  }

  dropdownsMedia.onchange = (e) => {
    dropdowns.forEach((dropdown) => {
      dropdown.replaceWith(dropdown.cloneNode(true));
    });

    if (e.matches) {
      desktop = false;
      mobile = true;
    } else {
      mobile = false;
      desktop = true;
    }

    renderDropdowns();
  };

  renderDropdowns();
}

function renderDropdowns() {
  dropdowns = document.querySelectorAll('[data-dropdown]');
  if (dropdowns.length === 0) {
    console.error(
      '%c Dropdown element is not set. Use' +
        '%c data-dropdown' +
        '%c attribute for hover-dropdown or' +
        '%c data-dropdown="click"' +
        '%c for click-dropdown',
      'color: red;',
      'color: white;',
      'color: red;',
      'color: white;',
      'color: red;'
    );
    return;
  }

  dropdowns.forEach((dropdown) => {
    const dropdownButton = dropdown.querySelector('[data-dropdown-btn]');
    if (!dropdownButton) {
      console.error(
        '%c Dropdown button is not set. Use' +
          '%c data-dropdown-btn' +
          '%c attribute on element inside container with' +
          '%c data-dropdown' +
          '%c attribute',
        'color: red;',
        'color: white;',
        'color: red;',
        'color: white;',
        'color: red;'
      );
      return;
    }

    const dropdownContent = dropdown.querySelector('[data-dropdown-content]');
    if (!dropdownContent) {
      console.error(
        '%c Dropdown content is not set. Use' +
          '%c data-dropdown-content' +
          '%c attribute on element inside container with' +
          '%c data-dropdown' +
          '%c attribute',
        'color: red;',
        'color: white;',
        'color: red;',
        'color: white;',
        'color: red;'
      );
      return;
    }

    const firstFocusableEl = dropdownContent.querySelectorAll(
      'button, [href]:not(use), input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )[0];

    dropdownButton.setAttribute('aria-hasPopup', 'true');
    dropdownButton.setAttribute('aria-expanded', 'false');
    dropdownButton.querySelector('svg').setAttribute('aria-hidden', 'true');
    dropdownContent.setAttribute('aria-hidden', 'true');
    dropdownContent.setAttribute('aria-label', 'submenu');
    dropdownContent.style.maxHeight = null;

    closeDropdown();

    dropdownButton.addEventListener('click', toggleDropdown);
    dropdownButton.addEventListener('keydown', keyboardNavigation);

    if (desktop) {
      if (!dropdown.dataset.dropdown) {
        dropdown.addEventListener('mouseenter', openDropdown);
        dropdown.addEventListener('mouseleave', closeDropdown);
      }
    }

    /* ====================   FUNCTIONS  ==================== */

    function toggleDropdown() {
      if (dropdown.classList.contains('active')) return closeDropdown();
      openDropdown();
      setTimeout(() => {
        document.addEventListener('click', clickOutside);
      }, 1);
    }

    function openDropdown() {
      if (desktop) {
        document
          .querySelectorAll('[data-dropdown]')
          .forEach((activeDropdown) => {
            activeDropdown.classList.remove('active');
            document.removeEventListener('click', clickOutside);
          });
      }

      dropdown.classList.add('active');
      dropdownButton.setAttribute('aria-expanded', 'true');
      dropdownContent.setAttribute('aria-hidden', 'false');

      if (mobile) {
        let dropdownContentHeight = dropdownContent.scrollHeight;
        dropdownContent.style.maxHeight = `${dropdownContentHeight}px`;
      }
    }

    function closeDropdown() {
      dropdown.classList.remove('active');
      dropdownButton.setAttribute('aria-expanded', 'false');
      dropdownContent.setAttribute('aria-hidden', 'true');

      if (mobile) dropdownContent.style.maxHeight = null;
    }

    function clickOutside(e) {
      if (desktop) {
        if (e.target.closest('[data-dropdown-content]')) return;
        closeDropdown();
        document.removeEventListener('click', clickOutside);
      }
    }

    function keyboardNavigation() {
      const contentHasTransition = getComputedStyle(
        dropdown.querySelector('[data-dropdown-content]')
      ).getPropertyValue('transition-duration');

      if (contentHasTransition === '0s') return firstFocusableEl.focus();

      dropdownContent.addEventListener(
        'transitionend',
        () => firstFocusableEl.focus(),
        {
          once: true,
        }
      );

      dropdownContent.addEventListener('focusout', focusOut);
    }

    function focusOut() {
      setTimeout(() => {
        if (!dropdownContent.contains(document.activeElement)) {
          closeDropdown();
          dropdownContent.removeEventListener('focusout', focusOut);
        }
      }, 25);
    }
  });
}
