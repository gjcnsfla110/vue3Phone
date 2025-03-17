import service from "@/axios.js";
import {id} from "element-plus/es/locale/index";

export  function getTitleMenuList(page,limit=10){
    return service.get(`admin/title_menu/${page}?limit=${limit}`);
}

export function addTitleMenu(data){
    return service.post('admin/title_menu',data);
}

export function updateTitleMenu(id,data){
    return service.post(`admin/title_menu/${id}/update`,data);
}

export function updateStatus(id,status){
    return service.post(`admin/title_menu/${id}/updateStatus`,{status:status});
}

export function deleteTitleMenu(id){
    return service.post(`admin/title_menu/${id}/delete`);
}



