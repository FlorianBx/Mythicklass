import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { 'path': '/', name: 'home', component: () => import('@/pages/HomePage.vue') },
    { 'path': '/class/:classSlug', name: 'class-detail', component: () => import('@/pages/ClassDetailPage.vue') },
  ],
})

export default router
