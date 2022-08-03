import Headroom from 'headroom.js';

let headroom = '';

export function headroomHeader(width) {
  if (!width) return headroomCreate();

  const mediaQueryList = window.matchMedia(`(max-width: ${width}px)`);
  if (!mediaQueryList.matches) {
    headroomCreate();
  }

  mediaQueryList.onchange = (e) => {
    if (e.matches) {
      if (headroom) headroom.destroy();
    }

    if (!e.matches) {
      !headroom ? headroomCreate() : headroom.init();
    }
  };
}

function headroomCreate() {
  const header = document.querySelector('header');
  headroom = new Headroom(header, {
    offset: 500,
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
