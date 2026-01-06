import service from "@/axios.js";

export function getBannerList(id) {
    return service.get(`admin/componentBanner/${id}/list`);
}

export function createBanner(component_id,data) {
    data.component_id = component_id;
    return service.post(`admin/componentBanner/create`, data);
}

export function deleteBanner(id){
    return service.post(`admin/componentBanner/${id}/delete`);
}

export function updateBanner(id,data){
    return service.post(`admin/componentBanner/${id}/update`, data);
}

export function updateBannerStatus(id,status){
    return service.post(`admin/componentBanner/${id}/updateStatus`, {status:status});
}

export function getGoodsItem(id){
    return service.post(`admin/componentBanner/get/goodsItem`,{itemId:id});
}

export function getAgreementItem(id){
    return service.post(`admin/componentBanner/get/agreementItem`,{itemId:id});
}

export function getUsimItem(id){
    return service.post(`admin/componentBanner/get/usimItem`,{itemId:id});
}

export function getAccessoriesItem(id){
    return service.post(`admin/componentBanner/get/accessoriesItem`,{itemId:id});
}

export function getCategoryItem(id){
    return service.post(`admin/componentBanner/get/categoryItem`,{itemId:id});
}

export function getShopNewsItem(id){
    return service.post(`admin/componentBanner/get/shopNewsItem`,{itemId:id});
}
