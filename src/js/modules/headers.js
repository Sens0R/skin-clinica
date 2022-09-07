import Headroom from 'headroom.js';

const header = document.querySelector('header');
const headerAnchor = document.createElement('div');
let headroom;

export let headerHeight;

const headerHeightObserver = new ResizeObserver((entries) => {
  entries.forEach((entry) => {
    headerHeight = `${entry.borderBoxSize[0].blockSize}px`;
    //console.log('HEADER HEIGHT: ' + headerHeight);
    
  });
});

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
  { threshold: 1 }
);

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

/* ====================   STICKY HEADER ==================== */

export function fixedHeader(width) {
  header.before(headerAnchor);
  headerAnchor.classList.add('_header-anchor');

  if (!width) {
    headerHeightObserver.observe(header);
    headerIntersectionObserver.observe(headerAnchor);
    return;
  }

  const mediaQueryList = window.matchMedia(`(max-width: ${width}px)`);

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

export function headroomHeader(width) {
  /*   if (width) {
    mediaQueryList = window.matchMedia(`(max-width: ${width}px)`);
  }

  console.log('HEADER HEIGHT OBSERVER CREATED ...'); */
  /* if (!width) {
    
    console.log('HEADER WRAPPER CREATED ...');
    console.log('PAGE LOAD HEADROOM CREATED AND INITIALIZED ...');
    return;
  }

  if (!mediaQueryList.matches) {
    headroomCreate();
    console.log('HEADER WRAPPER CREATED ...');
    console.log('PAGE LOAD - DESKTOP - HEADROOM CREATED AND INITIALIZED ...');
  } else {
    console.log(
      'PAGE LOAD - MOBILE - FIXED HEADER CREATED - ONSCROLL LISTENER IS RUNNING ...'
    );
  }

  mediaQueryList.onchange = (e) => {
    if (e.matches) {
      if (headroom) {
        headroom.destroy();

        console.log('HEADER WRAPPER SHOULD BE REMOVED HERE ... ');
        console.log('RESIZED - MOBILE - HEADROOM DESTROYED ... ');

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
  }; */
}
