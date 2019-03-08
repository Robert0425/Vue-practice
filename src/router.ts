import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Panel from './views/panel.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      alias: '/lobby',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/timer',
      name: 'timer',
      component: () => import(/* webpackChunkName: "timer" */ './views/timer.vue'),
    },
    {
      path: '/moment',
      name: 'moment',
      component: () => import(/* webpackChunkName: "moment" */ './views/moment.vue'),
    },
    {
      path: '/:id/panel',
      name: 'panel',
      component: Panel,
    },
    {
      path: '/computed',
      name: 'computed',
      component: () => import(/* webpackChunkName: "computed" */ './views/Computed.vue'),
      children: [
        {
          path: 'addition',
          name: 'addition',
          component: () => import(/* webpackChunkName: "addition" */ './views/Addition.vue'),
        },
        {
          path: 'minus',
          name: 'minus',
          component: () => import(/* webpackChunkName: "minus" */ './views/Minus.vue'),
        },
        {
          path: 'mul',
          name: 'mul',
          component: () => import(/* webpackChunkName: "mul" */ './views/Mul.vue'),
        },
        {
          path: 'divided',
          name: 'divided',
          component: () => import(/* webpackChunkName: "divided" */ './views/Divided.vue'),
        },
      ],
    },
  ],
});
