import service from "@/axios.js";

export function getDeliveryCompanyList(page,limit=10){
    return service.get(`/admin/deliveryCompany/${page}/list?limit=${limit}`);
}

export function createDeliveryCompany(data){
   return service.post(`/admin/deliveryCompany/${data.id}`, data);
}

export function updateDeliveryCompany(id,data){
    return service.post(`admin/deliveryCompany/${id}/update`,data);
}

export function deleteDeliveryCompany(id){
    return  service.post(`admin/deliveryCompany/${id}/delete`);
}