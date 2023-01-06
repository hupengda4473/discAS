import {createRouter, createWebHistory, createWebHashHistory} from 'vue-router'
import {Pages} from "./pages";
const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: () => import('../views/Center.vue'),
        },
        {
            path: '/Center',
            name: Pages.home,
            component: () => import('../views/Center.vue'),
        },
        {
            path: '/BottomLeft',
            name: Pages.BottomLeft,
            component: () => import('../views/BottomLeft.vue'),
        },
        {
            path: '/BottomRight',
            name: Pages.BottomRight,
            component: () => import('../views/BottomRight.vue'),
        },
    ]
})

export default router
