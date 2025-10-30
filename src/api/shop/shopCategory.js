import service from "@/axios.js";

export function getShopCategoryList(page,limit=10){
    return service.get(`/admin/shopCategory/${page}/list?limit=${limit}`);
}

export function createShopCategory(data){
    return service.post(`/admin/shopCategory`, data);
}

export function updateShopCategory(id,data){
    return  service.post(`admin/shopCategory/${id}/update`,data);
}

export function updateShopCategoryStatus(id,status){
    return  service.post(`admin/shopCategory/${id}/updateStatus`,{status});
}

export function deleteShopCategory(id){
    return  service.post(`admin/shopCategory/${id}/delete`);
}