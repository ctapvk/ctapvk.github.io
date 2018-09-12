var app = new Vue({
    el: '#app',
    data: {
        name: '',
        number: '',
        attemptSubmit: false,
    },
    computed: {
        missingName: function () {
            return this.name === '';
        },
        wrongNumber: function () {
            return (
                this.isNumeric(this.number) === false ||
                this.number < 1 ||
                this.number > 10
            )
        },
    },
    methods: {
        isNumeric: function (n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        },

        validateForm: function (event) {
            this.attemptSubmit = true;
            if (this.missingName || this.wrongNumber) event.preventDefault();
        },
    },
});
