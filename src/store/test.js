import { defineStore } from "pinia";
import { getInfo, login } from "@/api/manager.js";
import { listTrees, sideMenuTrees, selectMenu } from "@/composables/utill.js";
import { setToken } from "@/composables/auth.js";

const useManagerStore = defineStore("manager", {
    state: () => (
        {
            manager: {},
            //해더부분메뉴탭
            topMenu: [],
            //탑메뉴클릭시 id
            activeTopMenu:'',
            //해더메뉴추가,수정시 하위 사이드메뉴 id,name이름을 갖고와서 보여주는 값 즉 tb_title_menu child값을 위해 id정렬
            checkMenu: [],
            //라우터에 등록하기위하여 모든 메뉴를 정리한것
            menus: [],
            //헤더메관련 사이드에보여주는 전체메뉴
            sideMenu: [],
            //해더메뉴가 클릭시 id에맞는 sidemenu를 추출해서 값을대입
            childMenu: [],
            //사이드메뉴 클릭된부분
            activeRoute: "",
            //사이드메뉴바에 넓이
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
                        if (!this.activeTopMenu) {
                            this.activeTopMenu = res.titleMenu[0].id.toString();
                        }
                        resolve({ menus: this.menus });
                    })
                    .catch((error) => reject(error));
            });
        },
    },

    persist: {
        enabled: true,
        strategies: [{ key: "manager", storage: window.sessionStorage,}],
    },
});
export default useManagerStore;