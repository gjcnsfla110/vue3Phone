import service from "@/axios.js";

export function getList(page,limit=10){
    return service.get(`/admin/subPage/${page}/list`);
}

export function subPageCreate(data){
    return service.post(`/admin/subPage/create`, data);
}

export function subPageUpdate(id,data){
    return service.post(`/admin/subPage/${id}/update`, data);
}

export function subPageDelete(id){
    return service.post(`/admin/subPage/${id}/delete`);
}

export function updateStatus(id,status){
    return service.post(`/admin/subPage/${id}/updateStatus`,{status:status});
}
