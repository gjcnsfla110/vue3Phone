import service from "@/axios.js";

export function phonePlanList(page,limit=10) {
    return service.get(`/admin/phone/list?page=${page}&limit=${limit}`);
}

export function createPhonePlan(data) {
    return service.post(`/admin/phone/create`, data);
}

export function updatePhonePlan(id,data){
    return service.post(`admin/goods_category/${id}/update`, data);
}

export function updatePhonePlanStatus(id,status){
    return service.post(`admin/goods_category/${id}/updateStatus`,{status});
}

export function deletePhonePlan(id){
    return service.post(`admin/goods_category/${id}/delete`);
}