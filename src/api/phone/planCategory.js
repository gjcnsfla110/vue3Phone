import service from "@/axios.js";

export function planCategoryList(page,limit=10) {
    return service.get(`/admin/phone/planCategory/${page}/list?limit=${limit}`);
}

export function createPlanCategory(data) {
    return service.post(`/admin/phone/planCategory/create`, data);
}

export function updatePlanCategory(id,data){
    return service.post(`admin/phone/planCategory/${id}/update`, data);
}

export function updatePlanCategoryStatus(id,status){
    return service.post(`admin/phone/planCategory/${id}/updateStatus`,{status});
}

export function deletePlanCategory(id){
    return service.post(`admin/phone/planCategory/${id}/delete`);
}