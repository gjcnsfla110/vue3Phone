import { ElNotification } from 'element-plus'
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