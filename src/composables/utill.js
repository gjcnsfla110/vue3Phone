import { ElNotification } from 'element-plus'

export function showMessage(message,type = "success"){
    ElNotification({
        message,
        type,
        duration:3000
    })
}