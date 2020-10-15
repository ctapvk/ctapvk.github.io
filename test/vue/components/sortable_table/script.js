Vue.use(Buefy.default);

const createSortable = (el, options, vnode) => {

  let order = [];

  return Sortable.create(el, {
    ...options,

    onStart: function (evt) {
      // when the sort starts, store the initial order of the array
      order = this.toArray();
    },

    onEnd: function (evt) {

      // when the sort ends, set the order to the initial state
      this.sort(order);

      // change the order using splice
      const data = vnode.context.data;

      data.splice(evt.newIndex, 0, ...data.splice(evt.oldIndex, 1));

      // now it is safe, you can update the order parameter
      data.forEach((o, i) => {
        o.order = i + 1;
      });

    } });



};

const sortable = {
  name: 'sortable',
  bind(el, binding, vnode) {
    const table = el.querySelector('table');
    table._sortable = createSortable(table.querySelector('tbody'), binding.value, vnode);
  } };


const example = {
  directives: { sortable },
  data() {
    return {
      sortableOptions: {
        chosenClass: 'is-selected' },

      data: [
      { 'order': 1, 'codigo': '1234', 'cliente': 'Carlos Sánchez Ruiz', 'direccion': 'Martínez de Compagnon 588' },
      { 'order': 2, 'codigo': '1826', 'cliente': 'Luis Chong Rodríguez', 'direccion': 'Santo Toribio de Mogrovejo 678' },
      { 'order': 3, 'codigo': '7728', 'cliente': 'Rosario Carranza Vega', 'direccion': 'Juan XXIII 216' },
      { 'order': 4, 'codigo': '6545', 'cliente': 'Andrés García Ríos', 'direccion': 'Fray Pedro Urraca 504' }] };


  } };


const app = new Vue(example);

app.$mount('#app');