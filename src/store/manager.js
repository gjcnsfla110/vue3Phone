import {defineStore} from 'pinia'
import {getInfo,login,logout} from "@/api/manager.js";
import {showMessage} from "@/composables/utill.js";
import {setToken,removeToken} from "@/composables/auth.js";
import Admin from "@/layout/Admin.vue";

const managerStore = defineStore("manager",{
    state(){
        return {
            manager :{},
            menus : [
                {
                    "name": "菜单管理",
                    "icon": "Menu",
                    "frontpath": null,
                    "child": [
                        {
                            "name": "菜单管理",
                            "frontpath": "/menu/list",
                            "icon": "Document",
                        },
                        {
                            "name": "菜单权限",
                            "frontpath": "/menu/auth",
                            "icon": "Lock",
                        }
                        ]
                }
            ],
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