import service from "@/axios.js";

export function shopList(page,limit=10) {
    return service.get(`/admin/shop/${page}/list?limit=${limit}`);
}

export function createShop(data) {
    data.shopImg = JSON.stringify(data.shopImg);
    return service.post(`admin/shop/create`,data);
}

export function updateShop(id,data) {
    data.banner = JSON.stringify(data.banner);
    return service.post(`admin/shop/${id}/update`,data);
}

export function deleteShop(id){
    return service.post(`admin/shop/${id}/delete`);
}

export function updateStatus(id,status){
    return service.post(`admin/shop/${id}/updateStatus`, {status:status});
}

export function updateShopImg(id,shopImg){
    let shopImgData = JSON.stringify(data.shopImg);
    return service.post(`admin/shop/${id}/updateShopImg`,{shopImg:shopImgData});
}