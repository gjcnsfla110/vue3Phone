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

export function sideMenu(menu,titleMenu){
    return false;
}