import {createRouter, createWebHistory} from "vue-router";
import Login from "@/pages/Login.vue"
import NotFound from "@/pages/404.vue";
import Admin from "@/layout/Admin.vue";
import MenuList from "@/pages/menu/MenuList.vue";
import ImageList from "@/pages/image/ImageList.vue";
import RoleList from "@/pages/role/RoleList.vue";
import ManagerList from "@/pages/manager/ManagerList.vue";
import HeaderMenuList from "@/pages/headerMenu/HeaderMenuList.vue";
import GoodsCategory from "@/pages/goods/goods_about/GoodsCategory.vue";
import GoodsBrand from "@/pages/goods/goods_about/GoodsBrand.vue";
import ColorList from "@/pages/goods/goods_about/ColorList.vue";
import Delivery from "@/pages/goods/goods_about/Delivery.vue";
import DeliveryCompany from "@/pages/goods/goods_about/DeliveryCompany.vue";
import SpectList from "@/pages/goods/goods_about/SpectList.vue";
import GoodsLabel from "@/pages/goods/goods_about/GoodsLabel.vue";
import Model from "@/pages/goods/goods_about/Model.vue";
import Goods from "@/pages/goods/Goods.vue";
import GoodsService from "@/pages/goods/goods_about/GoodsService.vue";
import UsimList from "@/pages/usim/UsimList.vue";
import UsimCategory from "@/pages/usim/UsimCategory.vue";
import CreditCard from "@/pages/phone/CreditCard.vue";
import PhoneCategory from "@/pages/phone/PhoneCategory.vue";
import PhoneList from "@/pages/phone/PhoneList.vue";
import SideCategory from "@/pages/phone/SideCategory.vue";
import MainPage from "@/pages/main/MainPage.vue";
import SubPage from "@/pages/main/SubPage.vue";
import PageItem from "@/pages/main/PageItem.vue";
import Banner from "@/pages/main/Banner.vue";
import Plan from "@/pages/phone/Plan.vue";
import PlanCategory from "@/pages/phone/PlanCategory.vue";


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
        path: '/headerMenu/list',
        name: '/headerMenu/list',
        component: HeaderMenuList,
        meta: {
            title: '头部菜单'
        }
    },
    {
        path:'/menu/list',
        name: '/menu/list',
        component: MenuList,
        meta:{
            title:"菜单管理"
        }
    },
    {
        path:'/image/list',
        name: '/image/list',
        component: ImageList,
        meta:{
            title:"图片管理"
        }
    },
    {
        path:'/role/list',
        name: '/role/list',
        component: RoleList,
        meta: {
            title: "角色管理"
        }
    },
    {
        path:'/manager/list',
        name: '/manager/list',
        component: ManagerList,
        meta: {
            title: "角色管理"
        }
    },
    {
      path:'/goodsCategory/list',
      name: '/goodsCategory/list',
      component: GoodsCategory,
      meta: {
          title: "商品分类"
      }
    },
    {
      path:'/goodsBrand/list',
      name: '/goodsBrand/list',
      component: GoodsBrand,
      meta: {
          title: '商品品牌'
      }
    },
    {
      path:'/goodsColor/list',
      name: '/goodsColor/list',
        component: ColorList,
        meta: {
          title: '商品颜色'
        }
    },
    {
        path:'/delivery/list',
        name: '/delivery/list',
        component: Delivery,
        meta: {
            title: '配送方式'
        }
    },
    {
        path:'/deliveryCompany/list',
        name: '/deliveryCompany/list',
        component: DeliveryCompany,
        meta: {
            title: '快递公司'
        }
    },
    {
        path:'/spec/List',
        name: '/spec/List',
        component: SpectList,
        meta: {
            title: '商品参数'
        }
    },
    {
        path:'/goodsLabel/list',
        name: '/goodsLabel/list',
        component: GoodsLabel,
        meta: {
            title: '商品标签'
        }
    },
    {
        path:'/goods/list',
        name: '/goods/list',
        component: Goods,
        meta: {
            title: '商品列表'
        }
    },
    {
        path:'/model/list',
        name: '/model/list',
        component:Model,
        meta:{
            title: '商品型号'
        }
    },
    {
        path:'/goodsService/list',
        name: '/goodsService/list',
        component: GoodsService,
        meta:{
            title: '商品服务'
        }
    },
    {
        path:'/usim/list',
        name: '/usim/list',
        component: UsimList,
        meta: {
            title:'套餐卡列表'
        }
    },
    {
        path:'/usim/category',
        name: '/usim/category',
        component: UsimCategory,
        meta: {
            title: '套餐菜单'
        }
    },
    {
        path:'/phone/list',
        name: '/phone/list',
        component: PhoneList,
        meta: {
            title: "合约机列表"
        }
    },
    {
        path:'/phone/category',
        name: '/phone/category',
        component: PhoneCategory,
        meta: {
            title:'合约机菜单'
        }
    },
    {
        path:'/credit/card',
        name: '/credit/card',
        component: CreditCard,
        meta: {
            title:"信用卡优惠"
        }
    },
    {
        path:'/phone/sideMenu',
        name: '/phone/sideMenu',
        component: SideCategory,
        meta: {
            title:'副菜单'
        }
    },
    {
       path:"/phone/plan",
       name: '/phone/plan',
       component: Plan,
        meta:{
           title:"套餐"
        }
    },
    {
        path:'/phone/planCategory',
        name: '/phone/planCategory',
        component: PlanCategory,
        meta:{
            title:'套餐菜单'
        }
    },
    {
        path:'/main/page',
        name: '/main/page',
        component: MainPage,
        meta:{
            title:"首页设置"
        }
    },
    {
        path:'/main/subPage',
        name: '/main/subPage',
        component: SubPage,
        meta:{
            title:"首页副菜单"
        }
    },
    {
        path:'/main/banner',
        name: '/main/banner',
        component: Banner,
        meta:{
            title:"轮播图"
        }
    },
    {
        path:'/main/pageItems',
        name: '/main/pageItems',
        component: PageItem,
        meta:{
            title:"页面详细"
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