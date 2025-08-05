import service from "@/axios.js";
import {queryUrl} from "@/composables/utill.js";
export function getComponentItemList(id,limit=10) {
    return service.get(`/admin/componentItems/${id}/list?limit=${limit}`);
}

export function createComponentItem(id,data) {
    return service.post(`/admin/componentItems/${id}/create`, data);
}

export function deleteComponentItem(id){
    return service.post(`admin/componentItems/${id}/delete`);
}

export function getGoodsList(page,limit=10,query={}) {
    let q = queryUrl(query);
    let is = q ? '&':'?';
    return service.post(`admin/componentItems/${page}/getGoodsList${q}${is}limit=${limit}`);
}