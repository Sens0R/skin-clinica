import * as flsFunctions from './modules/functions.js';
import './modules/swiper.js';
import './modules/bootstrap.js';
import './modules/burger.js';

flsFunctions.isWebP();

/// REMOVE TRANSITIONS ON LOADING ///
window.addEventListener("load", (event) => {
  document.body.classList.remove("preload");
});



