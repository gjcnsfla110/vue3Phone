import service from "@/axios.js";

export function creditCardList(page,limit=10) {
    return service.get(`/admin/phone/list?page=${page}&limit=${limit}`);
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