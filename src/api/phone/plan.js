import service from "@/axios.js";
import {queryUrl} from "@/composables/utill.js";
export function planList(page,limit=10,query={}) {
    let q = queryUrl(query);
    let is = q ? '&':'?';
    return service.get(`/admin/phone/plan/${page}/list${q}${is}limit=${limit}`);
}

export function createPlan(data) {
    return service.post(`/admin/phone/plan/create`, data);
}

export function updatePlan(id,data){
    return service.post(`admin/phone/plan/${id}/update`, data);
}

export function updatePlanStatus(id,status){
    return service.post(`admin/phone/plan/${id}/updateStatus`,{status});
}

export function deletePlan(id){
    return service.post(`admin/phone/plan/${id}/delete`);
}