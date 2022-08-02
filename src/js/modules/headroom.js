import Headroom from 'headroom.js';

export function headroomHeader(width) {
  const header = document.querySelector('header');
  const headroom = new Headroom(header, {
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


  if (window.innerWidth >= width) {
    headroom.init();
    console.log('starting');
  }


}
