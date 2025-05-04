import service from "@/axios.js";
import {queryUrl} from "@/composables/utill.js";

export function goodsList(page,limit=10,query={}) {
      let q = queryUrl(query);
      let is = q ? '&':'?';
      return service.get(`/admin/goods/${page}/list${q}${is}limit=${limit}`);
}

export function createGoods(data) {
      console.log(data);
      return service.post(`admin/goods/create`,data);
}

export function updateGoods(id,data) {
    return service.post(`admin/goods/${id}/update`,data);
}

export function deleteGoods(id){
    return service.post(`admin/goods/delete/${id}`);
}

export function deleteAll(id){
    return service.post(`admin/goods/deleteAll/`,{ids:id});
}

export function updateStatus(id,status){
    return service.post(`admin/goods/${id}/updateStatus`, {status:status});
}

export function updateStatusAll(id,status){
    return service.post(`admin/goods/updateStatusAll`,{ids:id,status:status});
}

export function updateBanners(id,banner){
    return service.post(`admin/goods/${id}/banner`,{banner:banner});
}