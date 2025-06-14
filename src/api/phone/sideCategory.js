import service from "@/axios.js";
import {queryUrl} from "@/composables/utill.js";

export function createSideCategory(data){
        return service.post(`/admin/phone/sideCategory/create`, data);
}

export function getSideCategoryList(page,limit=10,query={})
{
     let q = queryUrl(query);
     let is = q ? '&':'?';
     return service.get(`/admin/phone/sideCategory/${page}/list${q}${is}limit=${limit}`);
}

export function updateSideCategory(id,data){
    return service.post(`/admin/phone/sideCategory/${id}/update`, data);
}

export function deleteSideCategory(id){
    return service.post(`/admin/phone/sideCategory/${id}/delete`);
}

export function updateStatus(id,status){
    return service.post(`admin/phone/sideCategory/${id}/updateStatus`,{status});
}