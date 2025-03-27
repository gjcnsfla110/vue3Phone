import service from "@/axios.js";
import {id} from "element-plus/es/locale/index";

export function getMenuList(page,limit=10){
    return service.get(`admin/rule/${page}?limit=${limit}`);
}

export function addMenu(data){
    return service.post("admin/rule",data);
}

export function deleteMenu(id){
    return service.post(`admin/rule/${id}/delete`);
}

export function updateMenu(id,data){
    return service.post(`admin/rule/${id}/update`,data);
}

export function updateStatus(id,status){
    return service.post(`admin/rule/${id}/updateStatus`,{status});
}

export function listAll(){
    return service.get(`admin/rule/listAll`);
}