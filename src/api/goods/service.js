import service from "@/axios.js";

export function getServiceList(page,limit=10){
    return service.get(`/admin/service/${page}/list?limit=${limit}`);
}

export function createService(data){
    return service.post(`/admin/service`, data);
}

export function updateService(id,data){
    return service.post(`/admin/service/${id}/update`,data);
}

export function deleteService(id){
    return service.post(`/admin/service/${id}/delete`);
}