import service from "@/axios.js";
import {id} from "element-plus/es/locale/index";
import {queryUrl} from "@/composables/utill.js";

export function creditCardList(page,limit=10,query={}) {
    let q = queryUrl(query);
    let is = q ? '&':'?';
    return service.get(`/admin/goods/${page}/list${q}${is}limit=${limit}`);
}

export function createCreditCard(data) {
    return service.post(`/admin/phone/create`, data);
}

export function updateCreditCard(id,data){
    return service.post(`admin/goods_category/${id}/update`, data);
}

export function updateCreditCardStatus(id,status){
    return service.post(`admin/goods_category/${id}/updateStatus`,{status});
}

export function deleteCreditCard(id){
    return service.post(`admin/goods_category/${id}/delete`);
}
