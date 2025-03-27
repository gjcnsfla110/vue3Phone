import service from "@/axios.js";

export function modelList(page,limit=10){
    return service.get(`admin/model/${page}/list?${limit}`);
}

export function addModel(data){
    return service.post(`admin/model`, data);
}

export function updateModel(id,data){
    return  service.post(`admin/model/${id}/update`,data);
}

export function updateModelStatus(id,status){
    return service.post(`admin/model/${id}/updateStatus`,{status});
}

export function deleteModel(id){
    return  service.post(`admin/model/${id}/delete`);
}