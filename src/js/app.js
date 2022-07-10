import { isWebP } from './modules/webP.js';
import { runSearch } from './modules/search.js';
//import { burger, animateCSS } from './modules/burger.js';
import './modules/swiper.js';
import { breakpoint } from './modules/functions.js';

isWebP();
//runBurger(breakpoint.lg, backdrop);

runSearch(breakpoint.lg);