import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PaperDetail from '../views/PaperDetail.vue'
import ResearchPlanDetail from '../views/ResearchPlanDetail.vue'
import HistoryPlans from '../views/HistoryPlans.vue'
import ScholarSearchView from '../views/ScholarSearchView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/papers',
      name: 'papers',
      component: PaperDetail
    },
    {
      path: '/research-plan',
      name: 'research-plan',
      component: ResearchPlanDetail
    },
    {
      path: '/history-plans',
      name: 'history-plans',
      component: HistoryPlans
    },
    {
      path: '/scholar-search',
      name: 'scholar-search',
      component: ScholarSearchView,
      meta: {
        title: 'Google Scholar 文献搜索'
      }
    }
  ]
})

export default router 