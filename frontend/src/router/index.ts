import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Balu from '../pages/Balu.vue'
import Contact from '../pages/Contact.vue'
import Projects from '@/pages/Projects.vue'
import TermsOfService from '@/pages/Tos.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/projects',
      name: 'Projects',
      component: Projects
    },
    {
      path: '/balu',
      name: 'Balu',
      component: Balu
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    },
    {
      path: '/tos',
      name: 'Terms of Service',
      component: TermsOfService
    }
  ]
})

export default router