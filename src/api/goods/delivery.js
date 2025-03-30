import service from "@/axios.js";

export  function getDeliveryList(page, limit=10) {
    return service.get(`/admin/deliveries/${page}/list?limit=${limit}`);
}

export function createDelivery(data) {
    return service.post(`/admin/deliveries`, data);
}

export function updateDelivery(id,data){
    return service.post(`admin/deliveries/${id}/update`, data);
}

export function deleteDelivery(id){
    return  service.post(`admin/deliveries/${id}/delete`);
}