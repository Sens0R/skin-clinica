import './modules/swiper.js';
import { fixedHeader, headroomHeader } from './modules/headers.js';
import { accordion } from './modules/accordion.js';
import { runNavigation } from './modules/navigation.js';
import { md, lg, sm } from './modules/breakpoints.js';

//fixedHeader();
fixedHeader(lg);
runNavigation({ smartFullscreen: true });

runNavigation({
  mainClass: '.mobile-search',
  openBtn: '.nav-search-buttons__open',
  closeBtn: '.nav-search-buttons__close',
  focusElement: '.nav-search-input',
  copySize: '.header',
});

accordion();

/* ====================   TABS   ==================== */

const tabs = document.querySelectorAll('[data-tab-target');
const tabContents = document.querySelectorAll('[data-tab-content]');

const tabsCheck = document.querySelector('.tabs');
if (tabsCheck) {
  tabs.forEach((tab) => {
    const tabNavigation = () => {
      if (tab.classList.contains('_active')) return;

      const target = document.querySelector(tab.dataset.tabTarget);
      tabContents.forEach((tabContent) =>
        tabContent.classList.remove('_active')
      );
      tabs.forEach((tab) => tab.classList.remove('_active'));
      tab.classList.add('_active');

      if (target.classList.contains('_static')) {
        setTimeout(() => {
          target.classList.add('_active');
        }, 25);
        return;
      }

      target.classList.add('_active');
    };

    tab.addEventListener('mouseenter', tabNavigation);
    tab.addEventListener('focusin', tabNavigation);
  });

  const cards = document.querySelector('[data-tab-cards]');
  const activeCard = document.getElementsByClassName('tab-card _active');
  const activeLink = document.getElementsByClassName(
    'tab-nav-list__item _active'
  );

  cards.addEventListener('click', () => {
    const currentLink = activeLink[0];
    const nextLink = activeLink[0].nextElementSibling;

    const currentCard = activeCard[0];
    const nextCard = activeCard[0].nextElementSibling;

    if (nextLink && nextCard) {
      currentLink.classList.remove('_active');
      currentCard.classList.remove('_active');
      setTimeout(() => {
        nextLink.classList.add('_active');
        nextCard.classList.add('_active');
      }, 25);
      return;
    }

    if (!nextLink && !nextCard) {
      currentLink.classList.remove('_active');
      currentCard.classList.remove('_active');
      setTimeout(() => {
        tabContents[0].classList.add('_active');
        tabs[0].classList.add('_active');
      }, 25);
    }
  });

  function mutationObserver(targetEl) {
    const targetElement = document.getElementById(targetEl);
    let prevClassState = targetElement.classList.contains('_active');
    const tabMutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName !== 'class') return;
        const currentClassState = mutation.target.classList.contains('_active');
        if (prevClassState !== currentClassState) {
          prevClassState = currentClassState;

          if (!currentClassState) {
            tabContents.forEach((tabContent) =>
              tabContent.classList.remove('_static')
            );

            mutation.target.classList.add('_static');
          }
        }
      });
    });

    tabMutationObserver.observe(targetElement, { attributes: true });
  }

  mutationObserver('tab-1');
  mutationObserver('tab-2');
  mutationObserver('tab-3');
  mutationObserver('tab-4');

  /* ====================   TABS INTERSECTION OBSERVER   ==================== */

  let tabsObserverOptions = {
    rootMargin: '0px',
    threshold: 0.75,
  };

  // tabs mobile intersection
  let cardChangeInterval;
  const tabsCanvas = document.querySelector('.about-us-tabs');

  const stopAutoplay = (e) => {
    clearInterval(cardChangeInterval);
    tabsCanvas.removeEventListener('mouseenter', stopAutoplay);
    tabsCanvas.removeEventListener('focusin', stopAutoplay);
    e.stopPropagation();
  };
  const resumeAutoplay = () => {
    tabsCanvas.addEventListener('mouseenter', stopAutoplay);
    tabsCanvas.addEventListener('focusin', stopAutoplay);
    cardChangeInterval = setInterval(() => cards.click(), 3000);
  };

  const tabsIntersectionObserver = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          cardChangeInterval = setInterval(() => cards.click(), 3000);
          tabsCanvas.addEventListener('mouseenter', stopAutoplay);
          tabsCanvas.addEventListener('mouseleave', resumeAutoplay);
          tabsCanvas.addEventListener('focusin', stopAutoplay);
          tabsCanvas.addEventListener('focusout', resumeAutoplay);
        } else {
          clearInterval(cardChangeInterval);
          tabsCanvas.removeEventListener('mouseenter', stopAutoplay);
          tabsCanvas.removeEventListener('mouseleave', resumeAutoplay);
          tabsCanvas.removeEventListener('focusin', stopAutoplay);
          tabsCanvas.removeEventListener('focusout', resumeAutoplay);
        }
      }),
    tabsObserverOptions
  );

  tabsIntersectionObserver.observe(cards);
}

/* ====================   DROPDOWN   ==================== */

dropdown();

export function dropdown() {
  let dropdowns;
  let desktop;
  let mobile;

  const mqlDropdowns = window.matchMedia(`(max-width: ${lg}px)`);

  if (mqlDropdowns.matches) {
    desktop = false;
    mobile = true;
    console.log('MOBILE: ' + mobile + ` <<< ${lg}`);
  } else {
    mobile = false;
    desktop = true;
    console.log('DESKTOP: ' + desktop + ` >>> ${lg}`);
  }

  mqlDropdowns.onchange = (e) => {
    dropdowns.forEach((dropdown) => {
      dropdown.replaceWith(dropdown.cloneNode(true));
      console.log('RERENDERED');
    });

    if (e.matches) {
      desktop = false;
      mobile = true;
      console.log('MOBILE: ' + mobile + ` <<< ${lg}`);
    } else {
      mobile = false;
      desktop = true;
      console.log('DESKTOP: ' + desktop + ` >>> ${lg}`);
    }

    renderDropdowns();
  };

  renderDropdowns();

  function renderDropdowns() {
    console.log('RENDER DROPDOWNS STARTED');
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

      closeDropdown();
      

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
      
      dropdownContent.style.maxHeight = null;

      let clickDropdown;
      let hoverDropdown;
      dropdownButton.ariaHasPopup = true;
      dropdownButton.ariaExpanded = false;
      dropdownContent.ariaLabel = 'submenu';
      const dropdownContentFirstLink =
        dropdownContent.getElementsByTagName('a')[0];

      if (mobile) dropdownButton.addEventListener('click', mobileAccordion);

      if (desktop) runDesktopDropdownNavigation();

      /* ====================   FUNCTIONS  ==================== */

      function runDesktopDropdownNavigation() {
        if (dropdown.dataset.dropdown === 'click') {
          clickDropdown = dropdown;
        } else {
          dropdown.dataset.dropdown = 'hover';
          hoverDropdown = dropdown;
        }

        dropdownButton.addEventListener('keyup', keyboardNavigation);
        if (clickDropdown)
          dropdownButton.addEventListener('click', openOnClick);

        if (hoverDropdown) {
          dropdown.addEventListener('mouseenter', openDropdown);
          dropdown.addEventListener('mouseleave', closeDropdown);
        }
      }

      function mobileAccordion() {
        let dropdownContentHeight = dropdownContent.scrollHeight;
        console.log(dropdown);
        console.log('CLICKED');
        dropdown.classList.toggle('active');

        if (dropdown.classList.contains('active')) {
          dropdownButton.ariaExpanded = true;
          dropdownContent.style.maxHeight = `${dropdownContentHeight}px`;
        } else {
          dropdownButton.ariaExpanded = false;
          dropdownContent.style.maxHeight = null;
        }
      }

      function openOnClick() {
        if (!clickDropdown.classList.contains('active')) {
          openDropdown();
          setTimeout(() => {
            document.addEventListener('click', clickOutside);
          }, 1);
        }
      }

      function clickOutside(e) {
        if (e.target.closest('[data-dropdown-content]')) return;
        closeDropdown();
        document.removeEventListener('click', clickOutside);
      }

      function openDropdown() {
        document
          .querySelectorAll('[data-dropdown]')
          .forEach((activeDropdown) => {
            activeDropdown.classList.remove('active');
            document.removeEventListener('click', clickOutside);
          });
        dropdownButton.ariaExpanded = true;
        dropdown.classList.add('active');
      }

      function closeDropdown() {
        dropdownButton.ariaExpanded = false;
        dropdown.classList.remove('active');
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
        setTimeout(() => {
          dropdownContentFirstLink.focus();
        }, 15);
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
}
