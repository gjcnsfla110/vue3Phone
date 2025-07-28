import service from "@/axios.js";

export function getComponentItemList(id) {
    return service.get(`/admin/componentItems/:id/list`);
}

export function createComponentItem(id,data) {
    return service.post(`/admin/componentItems/:id/create`, data);
}

export function updateComponentItem(id,data){
    return service.post(`admin/componentItems/:id/update`,data);
}

export function deleteComponentItem(id){
    return service.post(`admin/componentItems/:id/delete`);
}