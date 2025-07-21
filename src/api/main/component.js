import service from "@/axios.js";
import {queryUrl} from "@/composables/utill.js";
export function getComponentList(page,limit=10,query={}) {
    let q = queryUrl(query);
    let is = q ? '&':'?';
    return service.get(`/admin/Component/${page}/list${q}${is}limit=${limit}`);
}

export function createComponent(data) {
    return service.post(`admin/Component/create`,data);
}

export function updateComponent(id,data){
    return service.post(`admin/Component/${id}/update`,data);
}

export function deleteComponent(id){
    return service.post(`admin/Component/${id}/delete`);
}

export function updateStatus(id,status){
    return service.post(`admin/Component/${id}/updateStatus`,{status:status});
}