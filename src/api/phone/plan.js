import service from "@/axios.js";

export function planList(page,limit=10) {
    return service.get(`/admin/phone/list?page=${page}&limit=${limit}`);
}

export function createPlan(data) {
    return service.post(`/admin/phone/create`, data);
}

export function updatePlan(id,data){
    return service.post(`admin/goods_category/${id}/update`, data);
}

export function updatePlanStatus(id,status){
    return service.post(`admin/goods_category/${id}/updateStatus`,{status});
}

export function deletePlan(id){
    return service.post(`admin/goods_category/${id}/delete`);
}