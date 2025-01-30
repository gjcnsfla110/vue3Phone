import  {router} from "@/route/index.js";
import {showFullLoading, hideFullLoading, showMessage} from "@/composables/utill.js";
import managerStore from "@/store/manager.js";
import {getToken} from "@/composables/auth.js";
import {addRoutes} from "@/route/index.js";

//라우터 들어오기전에 체크
let getInfo = false;
router.beforeEach(async (to, from, next) => {
    showFullLoading()
    const token = getToken();
    if(!token && to.path !="/login"){
        showMessage("请先登录","error")
        return next({ path:"/login" });
    }
    if(token && to.path == "/login"){
        showMessage("请勿重复登录","error")
        return next({ path:from.path ? from.path : "/" });
    }

    let hasNewRoutes = false;
    if(token && !getInfo){
        const useStore = managerStore();
        try {
            const {menus} = await useStore.adminInfo();
            getInfo = true;
            hasNewRoutes = addRoutes(menus);
        }catch(err){
            console.log(err);
            showMessage("会员加载失败","error")
        }
    }
    let title = (to.meta.title ? to.meta.title : "") + "-小韩手机"
    document.title = title
    hasNewRoutes ? next(to.fullPath):next();
})

router.afterEach((to, from) => {
    hideFullLoading()
})
