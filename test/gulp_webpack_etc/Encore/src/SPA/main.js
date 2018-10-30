import Router from './routes/router/Router';
import RouterInvoker from './routes/RouterInvoker';
/** Populate Router instance with DOM routes */
const routes = new Router({
  // All pages
  RouterInvoker,
  // Main page
  pageMain,
});

const $ = require('jquery'); // create global $ and jQuery variables
global.$ = global.jQuery = $;
global.moment = require('moment');
// Load Events
jQuery(document).ready(() => routes.loadEvents());

// Jquery to Vue brige
jQuery(document).ready(() => {

});
