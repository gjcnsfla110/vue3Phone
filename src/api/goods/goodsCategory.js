import service from "@/axios.js";

export function categoryList(page,limit=10){
    return service.get(`/admin/goods_category/${page}/List?limit=${limit}`);
}

export function addCategory(data){
    return service.post(`/admin/goods_category`, data);
}

export function updateCategory(id,data){
    return  service.post(`admin/goods_category/${id}/update`,data);
}

export function updateStatus(id,status){
    return  service.post(`admin/goods_category/${id}/updateStatus`,{status});
}

export function deleteCategory(id){
    return  service.post(`admin/goods_category/${id}/delete`);
}
