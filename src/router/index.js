import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue'
import Cookies from '@/views/AppCookies.vue'
import Privacy from '@/views/AppPrivacy.vue'
import Event from '@/views/AppEvent.vue'
import Robots from '@/views/GoRobots.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/event/:id',
    name: 'event',
    component: Event,
  },
  {
    path: '/cookies',
    name: 'cookies',
    component: Cookies,
  },
  {
    path: '/privacy',
    name: 'privacy',
    component: Privacy,
  },
  {
    path: '/robots.txt',
    name: 'robots',
    component: Robots,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'page404',
    component: () => import('../views/Page404.vue'),
 }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
