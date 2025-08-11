import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PaperDetail from '../views/PaperDetail.vue'
import ResearchPlanDetail from '../views/ResearchPlanDetail.vue'
import HistoryPlans from '../views/HistoryPlans.vue'
import ScholarSearchView from '../views/ScholarSearchView.vue'
import ReferencesView from '../views/ReferencesView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ChatGPTView from '../views/ChatGPTView.vue'

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
        title: 'Google Scholar Literature Search'
      }
    },
    {
      path: '/references',
      name: 'references',
      component: ReferencesView,
      meta: {
        title: 'Reference Management'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        title: 'User Login'
      }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: {
        title: 'User Registration'
      }
    },
    {
      path: '/chatgpt',
      name: 'chatgpt',
      component: ChatGPTView,
      meta: {
        title: 'ChatGPT Conversation'
      }
    }
  ]
})

export default router 