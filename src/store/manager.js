import {defineStore} from 'pinia'
import {getInfo} from "@/api/manager.js";
import {showMessage} from "@/composables/utill.js";

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
        adminInfo(){
            getInfo().then((res)=>{
                showMessage(res);
            })
        },
    },
    getters:{

    }
})
export default managerStore;