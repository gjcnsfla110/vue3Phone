import { defineStore } from "pinia";
import { getInfo, login } from "@/api/manager.js";
import { listTrees, sideMenuTrees, selectMenu } from "@/composables/utill.js";
import { setToken } from "@/composables/auth.js";

 const useManagerStore = defineStore("manager", {
    state: () => ({
        manager: {},
        topMenu: [],
        checkMenu: [],
        menus: [],
        sideMenu: [],
        childMenu: [],
        activeRoute: "",
        asideWidth: "250px",
        ruleNames: [],
    }),

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
                        resolve({ menus: this.menus });
                    })
                    .catch((error) => reject(error));
            });
        },
    },

    persist: {
        enabled: true,
        strategies: [{ key: "menuStore", storage: localStorage }],
    },
});
export default useManagerStore;