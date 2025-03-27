import service from "@/axios.js";
import {id} from "element-plus/es/locale/index";


export function allList(page,limit=10){
    return service.get(`/admin/specs/${page}/list?limit=${limit}`);
}

export function addSpec(data){
    return service.post(`/admin/specs/`, data);
}

export function updateSpec($id,data){
    return service.post(`admin/specs/${id}/update`,data);
}

export function updateStatus($id,status){
    return service.post(`admin/specs/${id}/updateStatus`,{status:status});
}

export function deleteSpec(id){
    return service.post(`admin/specs/${id}/delete`);
}