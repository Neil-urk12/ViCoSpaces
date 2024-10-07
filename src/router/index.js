import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: () => import('../views/HomeView.vue') },
    { path: '/home', redirect: '/'},
    { path: '/register', component: () => import('../views/RegisterView.vue') },
    { path: '/login', component: () => import('../views/SignInView.vue') },
    { path: '/navbar', component: ()=> import('../components/nav-bar.vue')},
    { path: '/search-bar', component: ()=> import('../components/search-bar.vue') },
    { path: '/create-room', component: ()=> import('../components/create-room.vue')}
    
    
    // { path: '/profile', component: () => import('../views/ProfileView.vue') },
  ]
})

export default router
