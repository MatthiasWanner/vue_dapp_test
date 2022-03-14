import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../Pages/GetBalance.vue';
import Swap from '../Pages/Swap.vue';

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
];

export const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
});
