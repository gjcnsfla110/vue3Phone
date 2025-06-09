import service from "@/axios.js";

export function getList(page,limit=10){
    return service.get(`admin/main/${page}/list?limit=${limit}`);
}

export function createPage(data){
    return service.post(`admin/main/create`,data);
}

export function updatePage(id,data){
    return service.post(`admin/main/${id}/update`,data);
}

export function deletePage(id){
    return service.post(`admin/main/${id}/delete`);
}

export function updateStatus(id,status){
    return service.post(`admin/main/${id}/updateStatus`,{status:status});
}