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

/* if (window.matchMedia(`(max-width: ${lg}px)`).matches) {
  accordion('[data-dropdown]', '[data-dropdown-btn]');
  console.log('mobile');
} else {
  console.log('desktop');
} */

const dropdowns = document.querySelectorAll('[data-dropdown]');

if (dropdowns) {
  let transitionDurationComputed = getComputedStyle(
    document.querySelector('[data-dropdown-content]')
  ).getPropertyValue('transition-duration');
  let transitionDuration;
  if (transitionDurationComputed)
    transitionDuration =
      Number(transitionDurationComputed.replace('s', '')) * 1000;

  dropdowns.forEach((dropdown) => {
    const dropdownButton = dropdown.querySelector('[data-dropdown-btn]');
    const dropdownContent = dropdown.querySelector('[data-dropdown-content]');
    let dropdownContentFirstLink;
    if (dropdownContent) {
      dropdownContentFirstLink = dropdownContent.getElementsByTagName('a')[0];
    }

    function focusOutHandler() {
      setTimeout(() => {
        if (!dropdownContent.contains(document.activeElement)) {
          dropdown.classList.remove('active');
          dropdownContent.removeEventListener('focusout', focusOutHandler);
          console.log('lost focus');
        }
      }, 100);
    }

    if (dropdownButton) {
      dropdownButton.addEventListener('keyup', (e) => {
        if (e.key === 'Enter' || e.keyCode === 32) {
          dropdown.classList.add('active');
          if (dropdownContentFirstLink) {
            transitionDuration
              ? setTimeout(() => {
                  dropdownContentFirstLink.focus();
                }, transitionDuration)
              : dropdownContentFirstLink.focus();
          }

          dropdownContent.addEventListener('focusout', focusOutHandler);
        }
      });
    }

    dropdown.addEventListener('mouseenter', () => {
      dropdown.classList.add('active');
    });

    dropdown.addEventListener('mouseleave', () => {
      dropdown.classList.remove('active');
      dropdown.classList.add('is-changing');
      if (transitionDuration)
        setTimeout(() => {
          dropdown.classList.remove('is-changing');
        }, transitionDuration);
    });
  });
}
