import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: ()=> import('../views/Advertisement.vue')},
    { path: '/home', component: () => import('../views/HomeView.vue') },
    { path: '/home', redirect: '/'},
    { path: '/register', component: ()=> import('../views/RegisterView.vue') },
    { path: '/login', component: ()=> import('../views/SignInView.vue') }
    // { path: '/profile', component: () => import('../views/ProfileView.vue') },
  ]
})

export default router
