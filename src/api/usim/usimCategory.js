import service from "@/axios.js"
import {queryUrl} from "@/composables/utill.js";

export function usimCategoryList(page,limit,search={}){
    let q = queryUrl(search);
    let is = q ? '&':'?';
    return service.get(`/admin/usimCategory/${page}/list${q}${is}limit=${limit}`);
}

export function createUsimCategory(data) {
    return service.post(`/admin/usimCategory/create`, data)
}

export function updateUsimCategory(id,data){
     return service.post(`/admin/usimCategory/${id}/update`,data);
}

export function deleteUsimCategory(id){
    return service.post(`/admin/usimCategory/${id}/delete`);
}

export function updateCategoryStatus(id,status){
    return service.post(`/admin/usimCategory/${id}/updateStatus`,{status});
}

export function updateHotStatus(id,status){
    return service.post(`/admin/usimCategory/${id}/updateHot`,{status});
}