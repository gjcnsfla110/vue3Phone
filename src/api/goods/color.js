import service from "@/axios.js";


export function getColorList(page,limit=10){
    return service.get(`/admin/color/${page}/list?limit=${limit}`);
}

export function createColor(data){
    return service.post(`/admin/color`, data);
}

export function updateColor(id,data){
    return service.post(`/admin/color/${id}/update`,data);
}

export function deleteColor(id){
    return  service.post(`/admin/color/${id}/delete`);
}