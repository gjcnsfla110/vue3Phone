import {defineStore} from 'pinia'
import {getInfo,login} from "@/api/manager.js";
import {showMessage} from "@/composables/utill.js";
import {setToken} from "@/composables/auth.js";

const managerStore = defineStore("manager",{
    state(){
        return {
            manager :{},
            menu : [],
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
                    resolve(res)
                }).catch(error=>reject(error))
            })
        },
        adminInfo(){
            return new Promise((resolve,reject)=>{
                getInfo(resolve).then(res=>{
                    resolve(res);
                }).catch(error=>reject(error))
            })
        },
    },
    getters:{

    }
})
export default managerStore;