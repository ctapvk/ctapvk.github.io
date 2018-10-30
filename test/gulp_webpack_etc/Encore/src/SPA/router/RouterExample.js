import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../../components/ExampleComponent.vue';

Vue.use(VueRouter);

const lkPrefix = '/lk/';

const router = new VueRouter({
  base: lkPrefix,
  routes: [
    {
      path: '/',
      component: HomeView,
      meta: {
        title: 'Home',
      },
    },
    {
      path: '/attorneys',
      component: HomeView,
      meta: { title: 'Управление доверенностями' },
      children: [
        {
          path: '',
          component: HomeView,
          meta: { title: '' },

        },
        {
          path: 'attorney_face/:id',
          component: AttorneysFace,
          meta: { title: 'Страница доверителя '},

        },
      ],
    },
  ],
});


router.afterEach((to) => {
  const route = to.matched[0];
  const title = route ? route.meta.title : '';

  document.title = `ПЭК - ${title}`;
});


router.beforeEach((to, from, next) => {
  if (from.matched[0]) {
    if (window.location.pathname !== lkPrefix) {
      window.location = `${lkPrefix}#${to.path}`;
    }
  }
  next();
});

export default router;
