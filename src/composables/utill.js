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
    let r = params ? params.join('&') : '';
    return r;
}