import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Privacy from '../views/Privacy.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/privacy', name: 'Privacy', component: Privacy },
]

const router = createRouter({
  history: createWebHistory('/vue/'),  // ← SPAが /vue/ 配下で動くように
  routes
})

export default router
