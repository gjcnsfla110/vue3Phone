import service from "@/axios.js";

export function phoneCategoryList(page,limit=10) {
    return service.get(`/admin/phone/list?page=${page}&limit=${limit}`);
}

export function createPhoneCategory(data) {
    return service.post(`/admin/phone/create`, data);
}

export function updatePhoneCategory(id,data){
    return service.post(`admin/goods_category/${id}/update`, data);
}

export function updatePhoneCategoryStatus(id,status){
    return service.post(`admin/goods_category/${id}/updateStatus`,{status});
}

export function deletePhoneCategory(id){
    return service.post(`admin/goods_category/${id}/delete`);
}