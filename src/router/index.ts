import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'
// 配置路由信息
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: HelloWorld,
  },
]

const router = createRouter({
  routes,
  history: createWebHistory(),
})

export default router
