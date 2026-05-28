import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/practice-areas',
    name: 'Practice',
    component: () => import('../views/PracticeView.vue')
  },
  {
    path: '/booking',
    name: 'Booking',
    component: () => import('../views/BookingView.vue')
  },
  {
    path: '/tracker',
    name: 'Tracker',
    component: () => import('../views/TrackerView.vue')
  },
  {
    path: '/insights',
    name: 'Blog',
    component: () => import('../views/BlogView.vue')
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../views/ContactView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  }
})

export default router
