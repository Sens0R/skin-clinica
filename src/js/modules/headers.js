import Headroom from 'headroom.js';

const header = document.querySelector('header');

let headroom;
let headerHeight;
let headerAnchor = document.createElement('div');
let mediaQueryList;

function headroomCreate() {
  header.classList.add('slide-down');
  headroom = new Headroom(header, {
    classes: {
      initial: 'headroom',
      pinned: 'slide-down',
      unpinned: 'slide-up',
      top: 'top',
      notTop: 'not-top',
      bottom: 'bottom',
      notBottom: 'not-bottom',
    },
  });
  headroom.init();
}

/* ====================   OBSERVERS   ==================== */

const headerHeightObserver = new ResizeObserver((entries) => {
  entries.forEach((entry) => {
    headerHeight = `${entry.contentBoxSize[0].blockSize}px`;
    console.log('HEADER HEIGHT: ' + headerHeight);
    if (window.scrollY > 0) headerAnchor.style.height = headerHeight;
  });
});

const headerIntersectionObserverOptions = {
  rootMargin: '0px',
  threshold: 1,
};

const headerIntersectionObserver = new IntersectionObserver(
  (entries) =>
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        headerAnchor.style.height = null;
        header.classList.remove('_sticky-header');
      }

      if (!entry.isIntersecting) {
        headerAnchor.style.height = headerHeight;
        header.classList.add('_sticky-header');
      }
    }),
  headerIntersectionObserverOptions
);

/* ====================   STICKY HEADER ON SCROLL   ==================== */

export function fixedHeader(width) {
  header.before(headerAnchor);
  headerAnchor.classList.add('header-anchor');

  if (!width) {
    headerHeightObserver.observe(header);
    headerIntersectionObserver.observe(headerAnchor);
    return;
  }

  mediaQueryList = window.matchMedia(`(max-width: ${width}px)`);

  if (mediaQueryList.matches) {
    headerHeightObserver.observe(header);
    headerIntersectionObserver.observe(headerAnchor);
  }

  mediaQueryList.onchange = (e) => {
    if (e.matches) {
      headerHeightObserver.observe(header);
      headerIntersectionObserver.observe(headerAnchor);
    } else {
      header.classList.remove('_sticky-header');
      headerAnchor.style.height = null;
      headerHeightObserver.unobserve(header);
      headerIntersectionObserver.unobserve(headerAnchor);
    }
  };
}

/* ====================   HEADROOM    ==================== */

export function customHeader(width) {
  if (width) {
    mediaQueryList = window.matchMedia(`(max-width: ${width}px)`);
  }

  const headerHeightObserver2 = new ResizeObserver((entries) => {
    entries.forEach((entry) => {
      headerHeight = `${Math.floor(entry.contentBoxSize[0].blockSize)}px`;
      console.log('HEADER HEIGHT: ' + headerHeight);
      //console.log(mediaQueryList);
      if (stickyWrapper && mediaQueryList && !mediaQueryList.matches)
        stickyWrapper.style.height = headerHeight;
    });
  });

  headerHeightObserver2.observe(header);
  console.log('HEADER HEIGHT OBSERVER CREATED ...');

  if (!width) {
    headroomCreate();
    console.log('HEADER WRAPPER CREATED ...');
    console.log('PAGE LOAD HEADROOM CREATED AND INITIALIZED ...');
    return;
  }

  if (!mediaQueryList.matches) {
    headroomCreate();
    console.log('HEADER WRAPPER CREATED ...');
    console.log('PAGE LOAD - DESKTOP - HEADROOM CREATED AND INITIALIZED ...');
  } else {
    window.addEventListener('scroll', fixedHeaderOnScroll);
    console.log(
      'PAGE LOAD - MOBILE - FIXED HEADER CREATED - ONSCROLL LISTENER IS RUNNING ...'
    );
  }

  mediaQueryList.onchange = (e) => {
    if (e.matches) {
      if (headroom) {
        headroom.destroy();

        stickyWrapper.style.height = null;
        console.log('HEADER WRAPPER SHOULD BE REMOVED HERE ... ');
        console.log('RESIZED - MOBILE - HEADROOM DESTROYED ... ');
        window.addEventListener('scroll', fixedHeaderOnScroll);
        console.log(
          'RESIZED - MOBILE - FIXED HEADER CREATED - ONSCROLL LISTENER IS RUNNING ...'
        );
      }
    }

    if (!e.matches) {
      console.log('ONSCROLL LISTENER SHOULD BE REMOVED HERE ...');
      if (!headroom) {
        window.removeEventListener('scroll', fixedHeaderOnScroll);
        console.log('HEADER WRAPPER CREATED ...');
        console.log('RESIZED - DESKTOP - HEADROOM CREATED AND INITIALIZED ...');
      } else {
        headroom.init();
        console.log('RESIZED - DESKTOP - HEADROOM INITIALIZED ...');
      }
    }
  };
}
