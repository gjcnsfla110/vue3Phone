import service from "@/axios.js";
import {queryUrl} from "@/composables/utill.js";
import {getRandomString} from "@/composables/useCommon.js";

export function getSubPageCategoryList(page,limit=10,query={}){
    let q = queryUrl(query);
    let is = q ? '&':'?';
    return service.get(`/admin/subPageCategory/${page}/list${q}${is}limit=${limit}`);
}

export function subPageCategoryCreate(data){
    return service.post(`/admin/subPageCategory/create`, data);
}

export function subPageCategoryUpdate(id,data){
    return service.post(`/admin/subPageCategory/${id}/update`, data);
}

export function subPageCategoryDelete(id){
    return service.post(`/admin/subPageCategory/${id}/delete`);
}

export function updateStatus(id,status){
    return service.post(`/admin/subPageCategory/${id}/updateStatus`,{status:status});
}

export function addSubPageCategoryGoodsItems(id,data){
    data.items.forEach((item)=>{
        item.uid = getRandomString();
    })
    return service.post(`/admin/subPageCategory/${id}/addItems`,data);
}

export function getGoodsItem(id){
    return service.post(`/admin/subPageCategory/${id}/oneItem`);
}

export function deleteGoodsItem(id,itemId,itemUid){
    return service.post(`/admin/subPageCategory/${id}/deleteItem`,{itemId:itemId,itemUid:itemUid});
}
