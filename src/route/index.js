import {createRouter, createWebHistory} from "vue-router";
import Login from "@/pages/Login.vue"
import NotFound from "@/pages/404.vue";
const routes = [
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
    }
]
export  const router = createRouter({
    history: createWebHistory(),
    routes
})