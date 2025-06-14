import service from "@/axios.js";

export function getPhoneCategoryList(page,limit=10) {
    return service.get(`/admin/phone/category/${page}/list?limit=${limit}`);
}

export function createPhoneCategory(data) {
    return service.post(`/admin/phone/category/create`, data);
}

export function updatePhoneCategory(id,data){
    return service.post(`admin/phone/category/${id}/update`, data);
}

export function updatePhoneCategoryStatus(id,status){
    return service.post(`admin/phone/category/${id}/updateStatus`,{status});
}

export function phoneChangeHot(id,hot){
    return service.post(`admin/phone/category/${id}/changeHot`,{hot:hot});
}

export function deletePhoneCategory(id){
    return service.post(`admin/phone/category/${id}/delete`);
}