import Headroom from 'headroom.js';

let headroom = '';

export function headroomHeader(width) {
  if (!width) return headroomCreate();

  const mediaQueryList = window.matchMedia(`(max-width: ${width}px)`);
  console.log(mediaQueryList.matches);
  if (!mediaQueryList.matches) {
    headroomCreate();
  }

  mediaQueryList.onchange = (e) => {
    if (e.matches) {
      if (headroom) headroom.destroy();
      console.log(`Less than ${width}px wide. DESTROYED`);
    }

    if (!e.matches) {
      !headroom ? headroomCreate() : headroom.init();
      console.log(`More than ${width}px wide. STARTED`);
    }
  };
}

function headroomCreate() {
  const header = document.querySelector('header');
  headroom = new Headroom(header, {
    offset: 140,
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
  console.log('Headroom oject created');
}
