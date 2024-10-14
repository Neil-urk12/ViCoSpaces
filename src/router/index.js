import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: ()=> import('../views/Advertisement.vue')},
    { path: '/home', component: () => import('../views/HomeView.vue') },
    { path: '/home', redirect: '/'},
    { path: '/register', component: () => import('../views/RegisterView.vue') },
    { path: '/room', name: 'room', component: () => import ('../components/CanvasWhiteBoard.vue')}
    // { path: '/login', component: () => import('../views/SignInView.vue') },
    // { path: '/navbar', component: ()=> import('../components/nav-bar.vue')},
    // { path: '/search-bar', component: ()=> import('../components/search-bar.vue') },
    // { path: '/edit-room', componet: ()=> import('../components/edit-room.vue')},
    // { path: '/filter-bar', component: ()=> import('../components/categoryBar.vue')},
    // { path: '/created-room', component: ()=> import('../components/create-room.vue')},
    // { path: '/room', component: () => import('../views/RoomView.vue')},
    
    // { path: '/profile', component: () => import('../views/ProfileView.vue') },
  ]
})

export default router
