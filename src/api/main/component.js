import service from "@/axios.js";
import {queryUrl} from "@/composables/utill.js";
export function getPageItemList(page,limit=10,query={}) {
    let q = queryUrl(query);
    let is = q ? '&':'?';
    return service.get(`/admin/componentsItem/${page}/list${q}${is}limit=${limit}`);
}

export function createPageItem(data) {
    return service.post(`admin/componentsItem/create`,data);
}

export function updatePageItem(id,data){
    return service.post(`admin/componentsItem/${id}/update`,data);
}

export function deletePageItem(id){
    return service.post(`admin/componentsItem/${id}/delete`);
}

export function updateStatus(id,status){
    return service.post(`admin/componentsItem/${id}/updateStatus`,{status:status});
}