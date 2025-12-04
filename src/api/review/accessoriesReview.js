import service from "@/axios.js";
import {queryUrl} from "@/composables/utill.js";

export function AccessoriesReviewList(page,limit=10,query={}) {
    let q = queryUrl(query);
    let is = q ? '&':'?';
    return service.get(`admin/accessories/review/${page}/list${q}${is}limit=${limit}`);
}

export function createAccessoriesReview(data) {
    // 1. 파일 추가 (여러 개 가능)
    const formData = new FormData();
    data.img.forEach((file) => {
        formData.append('files[]', file.raw)  // 키: 'files' (배열)
    })
    const date = (() => {
        const n = new Date();
        const pad = n => n.toString().padStart(2, '0');
        return `${n.getFullYear()}年${n.getMonth()+1}月${n.getDate()}号 ${n.getHours()}点${pad(n.getMinutes())}分${pad(n.getSeconds())}秒`;
    })();
    let video ="";
    if(data.type == 2){
        video = "https://www.youtube.com/embed/" + data.video + "?playsinline=1&rel=0";
    }
    formData.append("accessories_id", data.accessories_id);
    formData.append('type', data.type);
    formData.append("title", data.title);
    formData.append('video', video);
    formData.append('date', date);
    return service.post(`admin/accessories/review/create`,formData,{
        headers: {
            'Content-Type': 'multipart/form-data'
        }});
}

export function deleteAccessoriesReview(id){
    return service.post(`admin/accessories/review/${id}/delete`);
}
