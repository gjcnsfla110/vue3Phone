import service from "@/axios.js";
import {queryUrl} from "@/composables/utill.js";


export function getUsimList(page,limit=10,query={}){
    let q = queryUrl(query);
    let is = q ? '&':'?';
    return service.get(`/admin/usim/${page}/list${q}${is}limit=${limit}`);
}

export function createUsim(data){
    return service.post(`/admin/usim/create`,data);
}

export function updateUsim(id,data){
    return service.post(`/admin/usim/${id}/update`,data);
}

export function deleteUsim(id){
    return service.delete(`/admin/usim/${id}/delete`);
}

export function updateStatus(id,status){
    return service.post(`/admin/usim/${id}/updateStatus`,{status});
}

export function updateHot(id,hot){
    return service.post(`/admin/usim/${id}/updateHot`,{hot});
}

export function oneDetail(id){
    return service.post(`/admin/usim/item/detail`,{id});
}

export function checkUsimList(page,limit=10,query={}){
    let q = queryUrl(query);
    let is = q ? '&':'?';
    return service.get(`/admin/usim/checkList/${page}/list${q}${is}limit=${limit}`);
}