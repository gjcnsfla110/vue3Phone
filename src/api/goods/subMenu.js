import service from "@/axios.js";

export function getSubMenuList(page,limit=10) {
    return service.get(`/admin/goodsSubMenu/${page}/list?limit=${limit}`);
}

export function createSubMenu(data){
    return service.post(`admin/goodsSubMenu/create`,data);
}

export function updateSubMenu(id,data){
    return service.post(`admin/goodsSubMenu/${id}/update`,data);
}

export function deleteSubMenu(id){
    return service.post(`admin/goodsSubMenu/${id}/delete`);
}

export function updateStatus(id,status){
    return service.post(`admin/goodsSubMenu/${id}/updateStatus`,{status:status});
}