import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to, _from, saved) {
    if (saved) return saved
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
  routes: [
    { path: '/', name: 'Home', component: Home, meta: { title: 'Sieadev' } },
    { path: '/projects', name: 'Projects', component: () => import('@/views/Projects.vue'), meta: { title: 'Projects' } },
    { path: '/projects/:slug', name: 'ProjectDetail', component: () => import('@/views/ProjectDetail.vue') },
    { path: '/journey', name: 'Journey', component: () => import('@/views/Journey.vue'), meta: { title: 'Journey' } },
    { path: '/contact', name: 'Contact', component: () => import('@/views/Contact.vue'), meta: { title: 'Contact' } },
    { path: '/tos', name: 'Terms of Service', component: () => import('@/views/Tos.vue'), meta: { title: 'Terms of Service' } },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/views/NotFound.vue'), meta: { title: 'Not found' } }
  ]
})

router.afterEach((to) => {
  const title = to.meta.title as string | undefined
  document.title = !title || title === 'Sieadev' ? 'Sieadev · Finley Voßwinkel' : `${title} · Sieadev`
})

export default router
