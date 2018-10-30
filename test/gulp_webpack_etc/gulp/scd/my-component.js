;(function(){
//
//
//
//
//
//

module.exports = {
  data() {
    return {};
  },

  props: {
    message: {
      type: String,
      default: ''
    }
  }
};
// Well, hu, you have no module so just keep your component somewhere.
window.vueComponents['my-component'] = module.exports;

})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"foo"},[_vm._v("\n    World\n")])}
__vue__options__.staticRenderFns = []
__vue__options__._scopeId = "data-v-3783bc4e"
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3783bc4e", __vue__options__)
  } else {
    hotAPI.reload("data-v-3783bc4e", __vue__options__)
  }
})()}