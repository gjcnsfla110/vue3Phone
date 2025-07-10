import service from "@/axios.js";
import {id} from "element-plus/es/locale/index";
import {queryUrl} from "@/composables/utill.js";

export function creditCardList(page,limit=10,query={}) {
    let q = queryUrl(query);
    let is = q ? '&':'?';
    return service.get(`/admin/phone/creditCard/${page}/list${q}${is}limit=${limit}`);
}

export function createCreditCard(data) {
    return service.post(`/admin/phone/creditCard/create`, data);
}

export function updateCreditCard(id,data){
    return service.post(`admin/phone/creditCard/${id}/update`, data);
}

export function updateCreditCardStatus(id,status){
    return service.post(`admin/phone/creditCard/${id}/updateStatus`,{status});
}

export function deleteCreditCard(id){
    return service.post(`admin/phone/creditCard/${id}/delete`);
}
