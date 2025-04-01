import service from "@/axios.js";
import {id} from "element-plus/es/locale/index";


export function getSpecList(page,limit=10){
    return service.get(`/admin/spec/${page}/list?limit=${limit}`);
}

export function createSpec(data){
    return service.post(`/admin/spec`, data);
}

export function updateSpec(id,data){
    return service.post(`admin/spec/${id}/update`,data);
}

export function updateStatus(id,status){
    return service.post(`admin/spec/${id}/updateStatus`,{status:status});
}

export function deleteSpec(id){
    return service.post(`admin/spec/${id}/delete`);
}