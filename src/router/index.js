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
        title: 'Google Scholar 文献搜索'
      }
    },
    {
      path: '/references',
      name: 'references',
      component: ReferencesView,
      meta: {
        title: '引用文献管理'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        title: '用户登录'
      }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: {
        title: '用户注册'
      }
    },
    {
      path: '/chatgpt',
      name: 'chatgpt',
      component: ChatGPTView,
      meta: {
        title: 'ChatGPT 对话'
      }
    }
  ]
})

export default router 