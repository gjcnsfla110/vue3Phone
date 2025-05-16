import { ElNotification ,ElMessageBox,ElMessage} from 'element-plus'
import nprogress from 'nprogress'
export function showMessage(message,type = "success"){
    ElNotification({
        message,
        type,
        duration:3000
    })
}

// 显示全屏loading
export function showFullLoading(){
    nprogress.start()
}

// 隐藏全屏loading
export function hideFullLoading(){
    nprogress.done()
}

export function showMsg(message="",type = "success"){
    ElMessage({
        type: type,
        message: message,
    })
}
export function showMessagebox(title = "",content = "提示内容",type = "error"){
    return ElMessageBox.confirm(
        content,
        title,
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type,
        },
    )
}

export function showMessageboxPrompt(title="",value=""){
    return ElMessageBox.prompt('', title, {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        inputValue:value
    })
}

export function queryUrl(query){
    let params = []
    for(const key in query){
        if(query[key]){
            params.push(`${key}=${encodeURIComponent(query[key])}`);
        }
    }
    let r = params.join("&")
    r = r ? ("?"+r) : ""
    return r;
}

/**
 * 자식 트리를 만드는 구조
 * @param data
 * @param field
 * @param child
 * @param pid
 * @param callF
 * @returns {*|*[]}
 */
export function listTrees(data,field='pid',child='child',pid=0,callF=null){
    if (!Array.isArray(data) || data.length === 0) return [];

    const getList = (pid1, items) => {
        const children = items.filter(item => {
            let isCheck = true;
            if (typeof callF === "function") {
                isCheck = callF(item);
            }
            return isCheck && item[field] === pid1;
        });

        children.forEach(item => {
            item[child] = getList(item['id'], items);
        });
        return children;
    };
    return getList(pid, data);
}

/**
 * 탑메뉴를 통하여 사이트메뉴를 설정하는 함수
 * @param menu
 * @param titleMenu
 * @returns {boolean}
 */
export function sideMenuTrees(menu,titleMenu){
    let newMenu = {};
    titleMenu.forEach(item => {
        newMenu[item.id] = menu.filter(menu => JSON.parse(item.child).includes(menu.id));
    })

    return newMenu;
}

/**
 * 해더 메뉴에 선택할수 있는 사이드메뉴 배열 추출
 */
export function selectMenu(menu){
    return menu.map((item) => {return {id:item.id, name:item.name}});
}


export function menuListTrees(menu,allMenu,pid='rule_id'){
    menu.forEach(item=>{
        item.child = (listTrees(allMenu,pid,'child',item.id));
    })
}

