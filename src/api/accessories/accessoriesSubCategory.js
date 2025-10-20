import service from "@/axios.js";

import {queryUrl} from "@/composables/utill.js";
export function getAccessoriesSubCategoryList(page,limit=10,query={}) {
    let q = queryUrl(query);
    let is = q ? '&':'?';
    return service.get(`/admin/accessoriesSubCategory/${page}/list${q}${is}limit=${limit}`);
}

export function createAccessoriesSubCategory(data){
    return service.post(`admin/accessoriesSubCategory/create`,data);
}

export function updateAccessoriesSubCategory(id,data){
    return service.post(`admin/accessoriesSubCategory/${id}/update`,data);
}

export function deleteAccessoriesSubCategory(id){
    return service.post(`admin/accessoriesSubCategory/${id}/delete`);
}

export function updateStatus(id,status){
    return service.post(`admin/accessoriesSubCategory/${id}/updateStatus`,{status:status});
}