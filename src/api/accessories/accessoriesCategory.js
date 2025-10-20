import service from "@/axios.js";

export function getAccessoriesCategoryList(page,limit=10){
    return service.get(`/admin/accessoriesCategory/${page}/list?limit=${limit}`);
}

export function accessoriesAddCategory(data){
    return service.post(`/admin/accessoriesCategory`, data);
}

export function accessoriesUpdateCategory(id,data){
    return  service.post(`admin/accessoriesCategory/${id}/update`,data);
}

export function accessoriesUpdateStatus(id,status){
    return  service.post(`admin/accessoriesCategory/${id}/updateStatus`,{status});
}

export function accessoriesDeleteCategory(id){
    return  service.post(`admin/accessoriesCategory/${id}/delete`);
}