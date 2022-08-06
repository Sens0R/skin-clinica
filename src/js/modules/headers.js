import Headroom from 'headroom.js';

const header = document.querySelector('header');

let headroom;
let headerHeight;
let headerAnchor = document.createElement('div');
let mediaQueryList;
let isFixed = false;

/* function fixedHeaderOnScroll() {
  if (window.scrollY > 0) {
    headerSpace.style.height = headerHeight;
    header.classList.add('_sticky-header');
  } else {
    headerSpace.style.height = null;
    header.classList.remove('_sticky-header');
  }
} */

function fixedHeaderOnScroll() {
  if ((window.scrollY = 0)) {
    headerSpace.style.height = headerHeight;
    header.classList.add('_sticky-header');
  } else {
    headerSpace.style.height = null;
    header.classList.remove('_sticky-header');
  }
}

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
/* 
function removeHeaderSpace() {
  if (headerAnchor) headerAnchor.remove();
} */

function createHeaderAnchor() {
  header.before(headerAnchor);
  headerAnchor.classList.add('header-space');
}

/* ====================   OBSERVERS   ==================== */

const headerHeightObserver = new ResizeObserver((entries) => {
  entries.forEach((entry) => {
    headerHeight = `${entry.contentBoxSize[0].blockSize}px`;
    console.log('HEADER HEIGHT: ' + headerHeight);
    /*  if (window.scrollY > 0) {
      headerSpace.style.height = headerHeight;
    } */
  });
});

const headerIntersectionObserverOptions = {
  rootMargin: '0px',
  threshold: 1,
};

const headerIntersectionObserver = new IntersectionObserver(
  (entries) =>
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        headerSpace.style.height = headerHeight;
        header.classList.add('_sticky-header');
      }
    }),
  headerIntersectionObserverOptions
);

const notificationObserverOptions = {
  rootMargin: '0px',
  threshold: 0,
};

const notificationObserver = new IntersectionObserver(
  (entries) =>
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        header.classList.remove('_sticky-header');
        headerSpace.style.height = null;
      }
    }),
  notificationObserverOptions
);

/* ====================   STICKY HEADER ON SCROLL   ==================== */

export function fixedHeader(width) {
  createHeaderAnchor();
  headerHeightObserver.observe(header);

  const headerIntersectionObserverOptions = {
    rootMargin: '0px',
    threshold: 1,
  };

  const headerIntersectionObserver = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log(entry.isIntersecting);
          headerAnchor.style.height = null;
          header.classList.remove('_sticky-header');
        }

        if (!entry.isIntersecting) {
          console.log(entry.isIntersecting);
          headerAnchor.style.height = headerHeight;
          header.classList.add('_sticky-header');
        }
      }),
    headerIntersectionObserverOptions
  );

  headerIntersectionObserver.observe(headerAnchor);

  /*   addEventListener(
    'scroll',
    function () {
      if (isInViewport(header)) {
        header.classList.remove('_sticky-header');
        headerSpace.style.height = null;
        console.log('The box is VISIBLE in the viewport');
      }
      if (!isInViewport(header)) {
        console.log('The box is NOT visible in the viewport');

        headerSpace.style.height = headerHeight;
        header.classList.add('_sticky-header');
      }
    },
    {
      passive: true,
    }
  ); */

  /*   if (!width) {
    createHeaderSpace();
    headerHeightObserver.observe(header);
    if (!notification) {
      addEventListener('scroll', fixedHeaderOnScroll);
    }
    if (notification) {
      notificationObserver.observe(notification);
      headerIntersectionObserver.observe(header);
    }
    return;
  } 

  mediaQueryList = window.matchMedia(`(max-width: ${width}px)`);

  if (mediaQueryList.matches) {
    isFixed = true;
    console.log('IS FIXED: ' + isFixed);
    createHeaderSpace();
    console.log('HEADER SPACE CREATED ...');

    if (!notification) {
      addEventListener('scroll', fixedHeaderOnScroll);
      console.log(
        'PAGE LOAD - <<< WIDTH <<< - FIXED HEADER ON SCROLL LISTENER IS RUNNING ...'
      );
    }

    headerHeightObserver.observe(header);

    if (notification) {
      notificationObserver.observe(notification);
      headerIntersectionObserver.observe(header);
      console.log('PAGE LOAD - <<< WIDTH <<< - HEADER WITH NOTIFICATION ...');
    }
  } else {
    isFixed = false;
    console.log('IS FIXED: ' + isFixed);
  }

  mediaQueryList.onchange = (e) => {
    if (e.matches && !isFixed) {
      isFixed = true;
      console.log('IS FIXED: ' + isFixed);
      createHeaderSpace();
      headerHeightObserver.observe(header);
      console.log('RESIZED - <<< WIDTH <<< - SPACE WAS CREATED ...');
      if (!notification) {
        addEventListener('scroll', fixedHeaderOnScroll);
        console.log(
          'RESIZED - <<< WIDTH <<< - FIXED HEADER ON SCROLL LISTENER IS RUNNING ...'
        );
      }

      if (notification) {
        console.log('RESIZED - <<< WIDTH <<< - HEADER WITH NOTIFICATION...');
        notificationObserver.observe(notification);
        headerIntersectionObserver.observe(header);
        console.log('RESIZED - <<< WIDTH <<< - ALL OBSERVERS ENABLED ...');
      }
    }

    if (!e.matches && isFixed) {
      isFixed = false;
      console.log('IS FIXED: ' + isFixed);
      removeHeaderSpace();
      headerHeightObserver.unobserve(header);
      console.log('RESIZED - >>> WIDTH >>> - SPACE WAS REMOVED ...');
      if (!notification) {
        removeEventListener('scroll', fixedHeaderOnScroll);
        console.log(
          'RESIZED - >>> WIDTH >>> - FIXED HEADER ON SCROLL LISTENER IS REMOVED ...'
        );
      }
      if (notification) {
        console.log(
          'RESIZED - >>> WIDTH >>> - HEADER WITH NOTIFICATION NOT FIXED ...'
        );
        notificationObserver.unobserve(notification);
        headerIntersectionObserver.unobserve(header);
        console.log('RESIZED - >>> WIDTH >>> - ALL OBSERVERS REMOVED ...');
      }
    }
  }; */
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
