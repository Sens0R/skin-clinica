import { isWebP } from './modules/webP.js';
import { runSearch } from './modules/search.js';
import { runBurger } from './modules/burger.js';
import './modules/swiper.js';
import { breakpoint } from './modules/functions.js';

isWebP();

runBurger(breakpoint.lg, '_active');
runSearch(breakpoint.lg, true);

// TODO add backdrop animations
// TODO add backdrop fade out animations maybe
//TODO change animations from APP.JS
