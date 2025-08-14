import service from "@/axios.js";

export function getBannerList(id) {
    return service.get(`admin/componentBanner/${id}/list`);
}

export function createBanner(id,data) {
    return service.post(`admin/componentBanner/${id}/create`, data);
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