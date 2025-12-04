import { defineStore } from "pinia";
import { getInfo, login } from "@/api/manager.js";
import { listTrees, sideMenuTrees, selectMenu } from "@/composables/utill.js";
import { setToken } from "@/composables/auth.js";

 const useManagerStore = defineStore("manager", {
    state: () => {
        const savedState = JSON.parse(sessionStorage.getItem('manager')) || {};
        // 무조건 기본값 보장!
        return {
            manager: savedState.manager || {},
            topMenu: savedState.topMenu || [],
            activeTopMenu: savedState.activeTopMenu || '',
            checkMenu: savedState.checkMenu || [],
            menus: savedState.menus || [],
            sideMenu: savedState.sideMenu || [],
            childMenu: savedState.childMenu || [],  // ← 여기 무조건 [] 보장!
            activeRoute: savedState.activeRoute || "",
            asideWidth: savedState.asideWidth || "250px",
            ruleNames: savedState.ruleNames || [],
        };
    },
    actions: {
        adminLogin(data) {
            return new Promise((resolve, reject) => {
                login(data)
                    .then((res) => {
                        setToken(res.token);
                        resolve("success");
                    })
                    .catch((error) => reject(error));
            });
        },

        adminInfo() {
            return new Promise((resolve, reject) => {
                getInfo()
                    .then((res) => {
                        this.menus = listTrees(res.menu, "rule_id");
                        this.checkMenu = selectMenu(this.menus);
                        if (res.user["super"] === 1) {
                            this.menus.unshift({
                                id: 0,
                                name: "菜单管理",
                                icon: "Menu",
                                frontpath: null,
                                child: [
                                    { name: "头部菜单", frontpath: "/headerMenu/list", icon: "List" },
                                    { name: "菜单管理", frontpath: "/menu/list", icon: "List" },
                                    { name: "角色管理", frontpath: "/role/list", icon: "Management" },
                                    { name: "管理员管理", frontpath: "/manager/list", icon: "User" },
                                ],
                            });
                        }

                        this.topMenu = res.titleMenu;
                        this.sideMenu = sideMenuTrees(this.menus, res.titleMenu);
                        if (!this.activeTopMenu) {
                            this.activeTopMenu = res.titleMenu[0].id.toString();
                        }
                        resolve({ menus: this.menus });
                    })
                    .catch((error) => reject(error));
            });
        },
        saveState() {
            sessionStorage.setItem('manager', JSON.stringify(this.$state));
        },
    },
});

export default useManagerStore;