import service from "@/axios.js";

export function phonePlanList(categoryId) {
    return service.get(`/admin/phone/phonePlan/${categoryId}/list`);
}

export function createPhonePlan(data) {
    return service.post(`/admin/phone/phonePlan/create`, data);
}

export function updatePhonePlan(id,data){
    return service.post(`admin/phone/phonePlan/${id}/update`, data);
}

export function deletePhonePlan(id){
    return service.post(`admin/phone/phonePlan/${id}/delete`);
}