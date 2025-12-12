import { createRouter, createWebHistory } from 'vue-router'
import DormHomeSP from '@/components/DormHomeSP.vue'
import DormInterventionDetail from '@/components/DormInterventionDetail.vue'
import DormInterventionForm from '@/components/DormInterventionForm.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: DormHomeSP
  },
  {
    path: '/create',
    name: 'CreateIntervention',
    component: DormInterventionForm
  },
  {
    path: '/post/:id',
    name: 'InterventionDetail',
    component: DormInterventionDetail,
    props: true
  },
  {
    path: '/edit/:id',
    name: 'EditIntervention',
    component: DormInterventionForm,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router