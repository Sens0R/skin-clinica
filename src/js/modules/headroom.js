import Headroom from 'headroom.js';

// select your header or whatever element you wish
const header = document.querySelector('header');

let options = {
  classes: {
    initial: 'headroom',
    pinned: 'headroom-slideDown',
    unpinned: 'headroom-slideUp',
    top: 'headroom-top',
    notTop: 'headroom-not-top',
    bottom: 'headroom-bottom',
    notBottom: 'headroom-not-bottom',
  },
  tolerance: {
    up: 5,
    down: 0,
  },
};

export const headroom = new Headroom(header, options);
/* export const headroomOptions = window.addEventListener('scroll', () => {
  if (window.scrollY === 0) {
    header.classList.remove('headroom-slideDown');
  }

   if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 50) {
        Console.log('Reached bottom')
    }
}); */
