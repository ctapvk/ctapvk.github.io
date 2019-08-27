Vue.component('button-counter', {
    data: function () {
        return {
            count: 0
        }
    },
    template: `
<button v-on:click="count++">
    Счётчик кликов — {{ count }} <slot></slot>
</button>`
});

var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!'
    }
});

