import { createRouter, createWebHistory } from 'vue-router'
import { ref as dbRef, get } from 'firebase/database'
import { useAuthStore } from '@/stores/authStore'
import { realTimeDb as database } from '@/firebase/firebaseconfig'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: () => import('../views/LandingPageView.vue'), meta: { requiresAuth: false }  },
    { path: '/about', component: () => import('../views/AboutView.vue'), meta: { requiresAuth: false }  },
    { path: '/roadmap', component: () => import('../views/RoadmapView.vue'), meta: { requiresAuth: false }  },
    { path: '/home', component: () => import('../views/HomeView.vue'), meta: { requiresAuth: false } },
    { path: '/register', component: () => import('../views/RegisterView.vue'), meta: { requiresAuth: false } },
    { path: '/login', component: () => import('../views/SignInView.vue'), meta: { requiresAuth: false } },
    { path: '/contact', component: () => import('../views/ContactView.vue'), meta: { requiresAuth: false}},
    { path: '/profile', component: () => import('../views/ProfileView.vue'), meta: { requiresAuth: true}},
    {
      path: '/room/:id',
      name: 'Room',
      component: () => import('../views/RoomView.vue'),
      props: route => ({ roomId: route.params.id, roomName: route.query.name }),
      meta: { requiresAuth: true },
      beforeEnter: async (to, from, next) => {
        const roomId = to.params.id
        const roomRef = dbRef(database, `rooms/${roomId}`)
        try {
          const snapshot = await get(roomRef)
          if (snapshot.exists()) {
            next()
          } else {
            console.error('Room does not exist')
            next({ name: 'Error' })
          }
        } catch (error) {
          console.error('Error fetching room data:', error)
          next({ name: 'Error' });
        }
      },
    },
    { path: '/error', name: 'Error', component: () => import('../views/ErrorView.vue') }
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !authStore.isAuthenticated) next({ path: '/' });
  else next();
})

export default router;