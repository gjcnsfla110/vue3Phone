import service from "@/axios.js";
import {componentItemData} from "@/composables/useCommon.js";

export function getComponentItemList(id) {
    return service.get(`/admin/componentItems/${id}/list`);
}

export function createComponentItem(id,items,type) {
    let data = componentItemData(id,items,type);
    return service.post(`/admin/componentItems/${id}/create`, {items:data});
}

export function deleteComponentItem(id){
    return service.post(`admin/componentItems/${id}/delete`);
}

export function updateChangeListType(type,id){
    return service.post(`admin/componentItems/${id}/updateChangeListType`,{listType:type});
}

export function updateRankingData(id,ranking){
    return service.post(`admin/componentItems/${id}/updateRanking`,{ranking:ranking});
}

export function getGoods(id){
    return service.post(`admin/componentItems/${id}/getGoods`);
}
export function getAccessories(id){
    return service.post(`admin/componentItems/${id}/getAccessories`);
}
export function getAgreement(id){
    return service.post(`admin/componentItems/${id}/getAgreement`);
}
export function getUsim(id){
    return service.post(`admin/componentItems/${id}/getUsim`);
}
