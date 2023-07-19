import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    { path: '/group/:group' , name: 'Messages', component: () => import('@/views/Messages.vue') }, 
    { path: '/test' , name: 'Test', component: () => import('@/views/Test.vue') }, 
    { path: '/setcookie/' , name: 'SetCookie', component: () => import('@/views/SetCookie.vue') }, 
]

const router = createRouter({
    routes,
    history: createWebHistory(),
})

export default router 