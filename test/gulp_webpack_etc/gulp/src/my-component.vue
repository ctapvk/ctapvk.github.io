<template>
    <div class="foo">
        World
    </div>
</template>

<script>
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
</script>

<style scoped="">
    .foo {
        color: red;
    }
</style>