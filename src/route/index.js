import {createRouter, createWebHistory} from "vue-router";
import Login from "@/pages/Login.vue"
import NotFound from "@/pages/404.vue";
import Admin from "@/layout/Admin.vue";
import MenuList from "@/pages/menu/MenuList.vue";
import MenuAuth from "@/pages/menu/MenuAuth.vue";
import ImageList from "@/pages/image/ImageList.vue";
const routes = [
    {
        path: "/login",
        name: "login",
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
        name: 'admin',
        component: Admin,
        meta:{
            title:"管理员首页"
        }
    }
]

const asycnRoutes = [
    {
        path:'/menu/list',
        name: '/menu/list',
        component: MenuList,
        meta:{
            title:"菜单管理"
        }
    },
    {
        path:'/menu/auth',
        name: '/menu/auth',
        component: MenuAuth,
        meta:{
            title:"菜单权限"
        }
    },
    {
        path:'/image/list',
        name: '/image/list',
        component: ImageList,
        meta:{
            title:"图片管理"
        }
    }
];

export  const router = createRouter({
    history: createWebHistory(),
    routes
})

export function addRoutes(menus){
    let hasAddRoute = false;
    function asyncAddroute(items){
        items.forEach(route => {
            let item = asycnRoutes.find((e)=>e.path === route.frontpath);
            if(item && !router.hasRoute(item.path)){
                router.addRoute("admin",item);
                hasAddRoute = true;
            }
            if(route.child && route.child.length > 0){
                asyncAddroute(route.child);
            }
        })
    }

    asyncAddroute(menus)
    return hasAddRoute;
}