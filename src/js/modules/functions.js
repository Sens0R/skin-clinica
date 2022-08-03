/* ====================   RESPONSIVE HEADER HEIGHT   ==================== */

export function headerHeight() {
  let headerHeight = 0;

  // element that will be wrapped
  const headerEl = document.querySelector('header');
  // create wrapper container
  const stickyWrapper = document.createElement('div');
  stickyWrapper.classList.add('sticky-wrapper');
  // insert wrapper before el in the DOM tree
  headerEl.parentNode.insertBefore(stickyWrapper, headerEl);
  // move el into wrapper
  stickyWrapper.appendChild(headerEl);
  const resizeObserver = new ResizeObserver((entries) => {
    for (let entry of entries) {
      if (entry.contentBoxSize) {
        headerHeight = entry.contentBoxSize[0].blockSize;
        stickyWrapper.style.height = `${headerHeight}px`;
      }
    }
  });

  resizeObserver.observe(headerEl);
}

/* export function headerHeight() {
  let headerHeight = 0;
  const headerEl = document.querySelector('header');
  console.log(headerEl);
  const headerInnerElements = document.getElementsByClassName('header');
  console.log(headerInnerElements);
  const headerInner = headerInnerElements[0].innerHTML;
  const stickyWrapper = '<div class="sticky-wrapper">' + headerInner + '</div>';
  headerInnerElements[0].innerHTML = stickyWrapper;
  const stickyWrapperEl = document.querySelector('sticky-wrapper');
  console.log(stickyWrapperEl)
  const resizeObserver = new ResizeObserver((entries) => {
    for (let entry of entries) {
      if (entry.contentBoxSize) {
        headerHeight = entry.contentBoxSize[0].blockSize;
        stickyWrapperEl.style.height = `${headerHeight}px`;
      }
    }
  });

  resizeObserver.observe(headerEl);
} */
/*  ============================= BACKDROP ========================= */

export let backdropEl = '';

export function addBackdrop(targetElement, backdropClass) {
  const createBackdrop = document.createElement('div');
  createBackdrop.classList.add('backdrop');
  targetElement.after(createBackdrop);
  backdropEl = document.querySelector('.backdrop');
  backdropEl.classList.add(backdropClass);
  backdropEl.setAttribute('data-backdrop', 'close');
}

export function removeBackdrop() {
  const removeBackdrop = document.querySelector('.backdrop');
  if (removeBackdrop) removeBackdrop.remove();
}

/*  ======================== RESIZE ======================= */

export function resize(width, closingFunction, targetElement) {
  window.matchMedia(`(max-width: ${width}px)`).onchange = (e) => {
    if (!e.matches && targetElement.classList.contains('_active'))
      closingFunction();
  };
}

/*  ============================= ANIMATIONS ========================= */

export function addAnimation(targetElement, style, speed) {
  animateCSS(targetElement, style);
  if (speed) animateCSS(targetElement, speed);
}

const animateCSS = (element, animation, prefix = 'animate__') =>
  // We create a Promise and return it
  new Promise((resolve) => {
    const animationName = `${prefix}${animation}`;
    const node = document.querySelector(element);

    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd, { once: true });
  });
