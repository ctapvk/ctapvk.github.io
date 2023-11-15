Vue.component('input-bs', {
    props: [
        'name',
        'rules',
        'holder',
    ],
    computed: {
        invalid () {
            return this.errors.length > 0
        }
    },
    data () {
        const key = this.name.split('.')[0]
        const name = this.name.split('.')[1]
        let val = JSON.parse(localStorage.getItem(key))
        if (val) {
            val = JSON.parse(localStorage.getItem(key))[name]
        }
        let rules_arr = {};
        if (this.rules) this.rules.split('|').forEach(d => {
            rules_arr[d.split(":")[0]] = d.split(":")[1] ? d.split(":")[1].split(",") : [];
        });
        return {
            val: val,
            storeKey: key,
            storeName: name,
            rules_arr: rules_arr,
            errors: [],
            validators: {
                'required': {
                    rule: d => { return d.length > 0 },
                    message:  d => 'Required',
                },
                'min': {
                    rule: (d, args) => d.length >= parseInt(args[0]),
                    message:  d => 'Minimum :arg1 chars'.replace(':arg1', d[0]),
                },
                'max': {
                    rule: (d, args) => d.length <= parseInt(args[0]),
                    message:  d => 'Maximum :arg1 chars'.replace(':arg1', d[0]),
                },
                'month': {
                    rule: d => 0 < parseInt(d) && 13 > parseInt(d),
                    message:  d => 'From 01 to 12',
                },
                'digits': {
                    rule: d => /[0-9]/.test(d),
                    message: d => 'Only digits',
                },
                'email': {
                    rule: d => /\S+@\S+\.\S+/.test(d),
                    message: d => 'Not email',
                },
            },
        }
    },
    methods: {
        change () {
            const store = localStorage.getItem(this.storeKey)
            const vals = store ? JSON.parse(store) : {}
            vals[this.storeName] = this.val
            localStorage.setItem(this.storeKey, JSON.stringify(vals))
            //
            this.errors = [];
            for (let k in this.rules_arr) {
                let v = this.rules_arr[k];
                if (this.validators[k] && this.validators[k]['rule'](this.val, v) === false) {
                    this.errors.push(this.validators[k]['message'](v));
                }
            }
        },
    },
    template: `
<div>
    <input v-model="val" @input="change"  type="text" :name="storeName" :id="storeName" class="form-control"
    :class="{ 'is-invalid': invalid}"
    >
    <label :for="storeName">{{ holder }}</label>
    <div class="text-danger" v-for="error in errors">
      <span>{{error}}</span>
    </div>
</div>
`});
var app = new Vue({
    el: '#app',
});
