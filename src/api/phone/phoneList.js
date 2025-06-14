import service from "@/axios.js";
import {queryUrl} from "@/composables/utill.js";

export function getPhoneList(page,limit,query={}) {
    let q = queryUrl(query);
    let is = q ? '&':'?';
    return service.get(`/admin/phone/${page}/list${q}${is}limit=${limit}`);
}

export function createPhone(data) {
    return service.post(`admin/phone/create`,data);
}

export function updatePhone(id,data) {
    return service.post(`admin/phone/${id}/update`,data);
}

export function deletePhone(id){
    return service.delete(`admin/phone/${id}/delete`);
}

export function updateStatus(id,status){
    return service.post(`admin/phone/${id}/updateStatus`,{status});
}

export function itemDetail(id){
    return service.post(`admin/phone/item`,{id:id});
}