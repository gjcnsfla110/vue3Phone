import service from "@/axios.js";
import {queryUrl} from "@/composables/utill.js";

export function getBannerList(page,limit=10,query={}) {
    let q = queryUrl(query);
    let is = q ? '&':'?';
    return service.get(`/admin/banner/${page}/list${q}${is}limit=${limit}`);
}

export function createBanner(data) {
    return service.post(`/admin/banner/create`, data);
}

export function updateBanner(id,data){
    return service.post(`/admin/banner/${id}/update`,data);
}

export function deleteBanner(id){
    return service.post(`/admin/banner/${id}/delete`);
}

export function updateBannerStatus(id,status){
    return service.post(`/admin/banner/${id}/updateStatus`,{status});
}