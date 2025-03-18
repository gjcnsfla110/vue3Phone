import {defineStore} from 'pinia'
import {getInfo,login,logout} from "@/api/manager.js";
import {listTrees,sideMenuTrees,selectMenu} from "@/composables/utill.js";
import {showMessage} from "@/composables/utill.js";
import {setToken,removeToken} from "@/composables/auth.js";
import {ref} from "vue";

const managerStore = defineStore("manager",()=>{
    const manager = ref({});
    //해더메뉴
    const topMenu = ref([]);
    //해더메뉴에서 사이드메뉴를 추가할때 체크박스나타나는 값
    const checkMenu = ref([]);
    //promission에 보내여 실제 라우트에 메뉴경로 추가하는 부분
    const menus = ref([
        {
            name: "菜单管理",
            icon: "Menu",
            frontpath: null,
            child: [
                {
                    name: "头部菜单",
                    frontpath: "/headerMenu/list",
                    icon: "List",
                },
                {
                    name: "菜单管理",
                    frontpath: "/menu/list",
                    icon: "List",
                },
                {
                    name : "角色管理",
                    frontpath : "/role/list",
                    icon: "Management",
                },
                {
                    name:"管理员管理",
                    frontpath : "/manager/list",
                    icon: "User",
                }
            ]
        },
        {
            name:"图片管理",
            icon: "Menu",
            frontpath: '/image/list',
        }
    ]);
    //사이드 메뉴 - 해드메뉴 아이디랑 대칭되게 가공한 사이드 메뉴값
    const sideMenu = ref([]);
    // 侧边宽度
    const asideWidth = ref("250px");
    const ruleNames = ref([]);

    function adminLogin(data){
            return new Promise((resolve,reject)=>{
                login(data).then(res=>{
                    setToken(res.token);
                    resolve("susess")
                }).catch(error=>reject(error))
            })
        }
    function adminInfo(){
            return new Promise((resolve,reject)=>{
                getInfo().then(res=>{
                    let m = listTrees(res.menu,'rule_id');
                    checkMenu.value = selectMenu(m);
                    if(res.user['super'] === 1){
                        m.unshift({
                            id:0,
                            name: "菜单管理",
                            icon: "Menu",
                            frontpath: null,
                            child: [
                                {
                                    name: "头部菜单",
                                    frontpath: "/headerMenu/list",
                                    icon: "List",
                                },
                                {
                                    name: "菜单管理",
                                    frontpath: "/menu/list",
                                    icon: "List",
                                },
                                {
                                    name : "角色管理",
                                    frontpath : "/role/list",
                                    icon: "Management",
                                },
                                {
                                    name:"管理员管理",
                                    frontpath : "/manager/list",
                                    icon: "User",
                                }
                            ]
                        });
                    }
                    topMenu.value = res.titleMenu;
                    sideMenu.value = sideMenuTrees(m,res.titleMenu);
                    resolve({menus : this.menus});
                }).catch(error=>{
                    reject(error)
                })
            })
        }
    return {manager,checkMenu,topMenu,menus,sideMenu,asideWidth,ruleNames,adminInfo,adminLogin};
})
export default managerStore;