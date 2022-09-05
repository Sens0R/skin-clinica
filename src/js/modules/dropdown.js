let dropdowns;
let desktop;
let mobile;
const dropdownsMedia = window.matchMedia(`(max-width: 992px)`);
const dropdownOrientation = window.matchMedia('(orientation: portrait)');

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

  dropdownOrientation.onchange = () => {
    const openDropdownContent = document.querySelectorAll(
      '[data-dropdown-content][aria-hidden="false"'
    );

    openDropdownContent.forEach((openContent) => {
      openContent.style.maxHeight = `${openContent.scrollHeight}px`;
    });
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

    

    const dropdownContentFirstFocusableEl = dropdownContent.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )[0];

    dropdownButton.ariaHasPopup = true;
    dropdownButton.ariaExpanded = false;
    dropdownContent.ariaHidden = true;
    dropdownContent.ariaLabel = 'submenu';
    dropdownContent.style.maxHeight = null;
    
    closeDropdown();

    dropdownButton.addEventListener('click', toggleDropdown);
    dropdownButton.addEventListener('keyup', keyboardNavigation);

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
      dropdownButton.ariaExpanded = true;
      dropdownContent.ariaHidden = false;

      if (mobile) {
        let dropdownContentHeight = dropdownContent.scrollHeight;
        dropdownContent.style.maxHeight = `${dropdownContentHeight}px`;
      }
    }

    function closeDropdown() {
      dropdown.classList.remove('active');
      dropdownContent.ariaHidden = true;
      dropdownButton.ariaExpanded = false;
      if (mobile) dropdownContent.style.maxHeight = null;
    }

    function clickOutside(e) {
      if (desktop) {
        if (e.target.closest('[data-dropdown-content]')) return;
        closeDropdown();
        document.removeEventListener('click', clickOutside);
      }
    }

    function keyboardNavigation(e) {
      if (e.key === 'Enter' || e.keyCode === 32) {
        openDropdown();
        const contentHasTransition = getComputedStyle(
          dropdown.querySelector('[data-dropdown-content]')
        ).getPropertyValue('transition');

        if (contentHasTransition === 'all 0s ease 0s') return setFocus();

        dropdownContent.addEventListener('transitionend', setFocus, {
          once: true,
        });
      }
    }

    function setFocus() {
      dropdownContentFirstFocusableEl.focus();
      dropdownContent.addEventListener('focusout', closeOnFocusOut);
    }

    function closeOnFocusOut() {
      setTimeout(() => {
        if (!dropdownContent.contains(document.activeElement)) {
          closeDropdown();
          dropdownContent.removeEventListener('focusout', closeOnFocusOut);
        }
      }, 15);
    }
  });
}
