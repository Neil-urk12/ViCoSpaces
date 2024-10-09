import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: () => import('../views/HomeView.vue') },
    { path: '/home', redirect: '/'},
    { path: '/register', component: () => import('../views/RegisterView.vue') },
    { path: '/login', component: () => import('../views/SignInView.vue') },
    // { path: '/profile', component: () => import('../views/ProfileView.vue') },
    { path: '/', component: () => import('../views/HomeView.vue') },
    { path: 'home', redirect: '/' },
    { path: '/room', component: () => import('../views/RoomView.vue') }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
