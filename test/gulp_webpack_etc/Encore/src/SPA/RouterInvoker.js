import vueInvoker from './vueInvoker';
import vueCollection from './vueCollection';

export default {
  init() {
    // JavaScript to be fired on all pages
    window.vueInvoker = vueInvoker.init(vueCollection);
  },
  finalize() {
    // JavaScript to be fired on all pages, after page specific JS is fired
  },
};
