import service from "@/axios.js";
import {queryUrl} from "@/composables/utill.js";

export function AccessoriesList(page,limit=10,query={}) {
    let q = queryUrl(query);
    let is = q ? '&':'?';
    return service.get(`/admin/accessories/${page}/list${q}${is}limit=${limit}`);
}

export function createAccessories(data) {
    data.banner = JSON.stringify(data.banner);
    return service.post(`admin/accessories/create`,data);
}

export function updateAccessories(id,data) {
    data.banner = JSON.stringify(data.banner);
    return service.post(`admin/accessories/${id}/update`,data);
}

export function deleteAccessories(id){
    return service.post(`admin/accessories/${id}/delete`);
}

export function deleteAll(id){
    return service.post(`admin/accessories/deleteAll`,{ids:id});
}

export function updateStatus(id,status){
    return service.post(`admin/accessories/${id}/updateStatus`, {status:status});
}

export function updateStatusAll(id,status){
    return service.post(`admin/accessories/updateStatusAll`,{ids:id,status:status});
}

export function updateBanners(id,banner){
    return service.post(`admin/accessories/${id}/banner`,{banner:banner});
}