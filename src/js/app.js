import { isWebP } from './modules/webP.js';
import { runSearch } from './modules/search.js';
import { runBurger } from './modules/burger.js';
import './modules/swiper.js';
import { breakpoint } from './modules/functions.js';

isWebP();

runBurger(breakpoint.lg, '_active');
runSearch(breakpoint.lg, '_active-transparent');

//TODO rework animations. make callbacks
