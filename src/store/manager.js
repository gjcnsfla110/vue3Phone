import {defineStore} from 'pinia'
import {getInfo,login,logout} from "@/api/manager.js";
import {listTrees} from "@/composables/utill.js";
import {showMessage} from "@/composables/utill.js";
import {setToken,removeToken} from "@/composables/auth.js";

const managerStore = defineStore("manager",{
    state(){
        return {
            manager :{},
            topMenu:[],
            menus : [
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
            ],
            sideMenu:[],
            // 侧边宽度
            asideWidth:"250px",
            ruleNames:[]
        }
    },
    actions:{
        adminLogin(data){
            return new Promise((resolve,reject)=>{
                login(data).then(res=>{
                    setToken(res.token);
                    resolve("susess")
                }).catch(error=>reject(error))
            })
        },
        adminInfo(){
            return new Promise((resolve,reject)=>{
                getInfo().then(res=>{
                    let m = listTrees(res.menu,'rule_id');
                    m.push({
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
                    resolve({menus : this.menus});
                }).catch(error=>{
                    reject(error)
                })
            })
        }
    },
    getters:{

    }
})
export default managerStore;