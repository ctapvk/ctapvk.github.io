Vue.component('input-bs', {
    props: [
        'name',
        'rules',
    ],
    data () {
        const key = this.name.split('.')[0]
        const name = this.name.split('.')[1]
        let val = JSON.parse(localStorage.getItem(key))
        if (val) {
            val = JSON.parse(localStorage.getItem(key))[name]
        }
        return {
            val: val,
            storeKey: key,
            storeName: name,
        }
    },
    methods: {
        change () {
            const store = localStorage.getItem(this.storeKey)
            const vals = store ? JSON.parse(store) : {}
            vals[this.storeName] = this.val
            localStorage.setItem(this.storeKey, JSON.stringify(vals))
        },
    },
    template: `
<div>
{{storeName}}: 
<input v-model="val" @input="change" />
</div>
`});

var app = new Vue({
    el: '#app',
    data () {
        return {
            message: 'Hello Vue!'
        }
    }
});
