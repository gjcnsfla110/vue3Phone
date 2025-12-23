import service from "@/axios.js";
import {queryUrl} from "@/composables/utill.js";

export function getPhoneList(page,limit,query={}) {
    let q = queryUrl(query);
    let is = q ? '&':'?';
    return service.get(`/admin/phoneList/${page}/list${q}${is}limit=${limit}`);
}

export function createPhone(data) {
    data.banner = JSON.stringify(data.banner);
    return service.post(`admin/phoneList/create`,data);
}

export function updatePhone(id,data) {
    data.banner = JSON.stringify(data.banner);
    return service.post(`admin/phoneList/${id}/update`,data);
}

export function deletePhone(id){
    return service.post(`admin/phoneList/${id}/delete`);
}

export function updateStatus(id,status){
    return service.post(`admin/phoneList/${id}/updateStatus`,{status});
}

export function updateHot(id,hot){
    return service.post(`admin/phoneList/${id}/updateHot`,{hot});
}

export function itemDetail(id){
    return service.post(`admin/phoneList/item`,{id:id});
}

export function updateBanners(id,banner){
    banner = JSON.stringify(banner);
    console.log(banner);
    return service.post(`admin/phoneList/${id}/updateBanner`,{banner:banner});
}

export function checkAgreementList(page,limit=10,query={}){
    let q = queryUrl(query);
    let is = q ? '&':'?';
    return service.get(`/admin/phoneList/checkList/${page}/list${q}${is}limit=${limit}`);
}
