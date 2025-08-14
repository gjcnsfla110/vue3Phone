import service from "@/axios.js";
import {queryUrl} from "@/composables/utill.js";
export function getComponentItemList(id) {
    return service.get(`/admin/componentItems/${id}/list`);
}

export function createComponentItem(id,items) {
    return service.post(`/admin/componentItems/${id}/create`, {items:items});
}

export function deleteComponentItem(id){
    return service.post(`admin/componentItems/${id}/delete`);
}

export function getGoodsList(page,limit=10,query={}) {
    let q = queryUrl(query);
    let is = q ? '&':'?';
    return service.post(`admin/componentItems/${page}/getGoodsList${q}${is}limit=${limit}`);
}

export function getGoods(id){
    return service.post(`admin/componentItems/${id}/getGoods`);
}
