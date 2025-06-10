import service from "@/axios.js";

export function planCategoryList(page,limit=10) {
    return service.get(`/admin/phone/list?page=${page}&limit=${limit}`);
}

export function createPlanCategory(data) {
    return service.post(`/admin/phone/create`, data);
}

export function updatePlanCategory(id,data){
    return service.post(`admin/goods_category/${id}/update`, data);
}

export function updatePlanCategoryStatus(id,status){
    return service.post(`admin/goods_category/${id}/updateStatus`,{status});
}

export function deletePlanCategory(id){
    return service.post(`admin/goods_category/${id}/delete`);
}