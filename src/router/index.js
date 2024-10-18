import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: ()=> import('../views/LandingPageView.vue')},
    { path: '/home', component: () => import('../views/HomeView.vue') },
    { path: '/register', component: () => import('../views/RegisterView.vue') },
    { path: '/login', component: () => import('../views/SignInView.vue') },
    //temporary room path for testing, should be changed with a dynamic path accepting roomIDs
    { path: '/room', name: 'Room', component: () => import('../views/RoomView.vue')},
    // { path: '/profile', component: () => import('../views/ProfileView.vue') },
    { path: '/testchat', component: () => import('../components/chat-box-feature.vue') }
  ]
})

export default router