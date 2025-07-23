import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import order_sticky_rice from '../components/order_sticky_rice.vue'
import SignIn from '../components/sign_in.vue'
import Products from '../components/user-order/products.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: SignIn,
    },
    {
      path: '/order/products',
      name: 'products',
      component: Products,
    },
  ],
})

export default router
