import {createRouter, createWebHistory} from "vue-router";
import Login from "@/pages/Login.vue"
import NotFound from "@/pages/404.vue";
import Admin from "@/layout/Admin.vue";
const routes = [
    {
        path: "/login",
        name: "Login",
        component: Login,
        meta:{
            title:"会员登录"
        }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound,
        meta:{
            title:"访问错误"
        }
    },
    {
        path:'/',
        name: 'Admin',
        component: Admin,
        meta:{
            title:"管理员首页"
        }
    }
]

export function addRoutes(menu){

}
export  const router = createRouter({
    history: createWebHistory(),
    routes
})