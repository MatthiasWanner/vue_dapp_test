import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../Pages/GetBalance.vue';
import PayVue from '../Pages/Pay.vue';
import Swap from '../Pages/Swap.vue';
import Test from '../Pages/Test.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/swap',
    name: 'Swap',
    component: Swap,
  },
  {
    path: '/pay',
    name: 'Pay',
    component: PayVue,
  },
  {
    path: '/test',
    name: 'Test',
    component: Test,
  },
];

export const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
});
