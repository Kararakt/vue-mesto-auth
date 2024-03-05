import { createRouter, createWebHistory } from 'vue-router';
import { computed } from 'vue';

import store from '../store';

const routes = [
  {
    path: '/',
    meta: {
      requiredAuth: true,
    },
    component: () => import('../pages/HomePage.vue'),
  },
  {
    path: '/authorization',
    component: () => import('../pages/AuthorizationPage.vue'),
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    window.scrollTo(0, 0);
  },
});

router.beforeEach(async (to, from, next) => {
  const loggedIn = computed(() => store.state.user.loggedIn).value;

  if (!loggedIn && to.meta.requiredAuth) {
    next('/authorization');
  } else if (loggedIn && to.path === '/authorization') {
    next('/');
  } else {
    next();
  }
});

export default router;
