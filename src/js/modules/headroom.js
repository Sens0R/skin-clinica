import Headroom from 'headroom.js';

// select your header or whatever element you wish
const header = document.querySelector('header');

let headerOptions = {
  classes: {
    initial: 'headroom',
    pinned: 'slide-down',
    unpinned: 'slide-up',
    top: 'top',
    notTop: 'not-top',
    bottom: 'bottom',
    notBottom: 'not-bottom',
  },
  tolerance: {
    up: 2,
    down: 0,
  },
};

export const headroom = new Headroom(header, headerOptions);

