import { createRouter, createWebHistory } from 'vue-router'
import DormHome from '@/components/DormHome.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: DormHome
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
