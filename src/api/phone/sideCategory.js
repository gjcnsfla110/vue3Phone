import service from "@/axios.js";

export function createSideCategory(data){
        return service.post(`/admin/phone/sideCategory/create`, data);
}

export function getSideCategoryList(page,limit=10){
     return service.get(`/admin/phone/sideCategory/${page}/list?limit=${limit}`);
}

export function updateSideCategory(id,data){
    return service.post(`/admin/phone/sideCategory/${id}/update`, data);
}

export function deleteSideCategory(id){
    return service.post(`/admin/phone/sideCategory/${id}/delete`);
}

export function updateStatus(id,status){
    return service.post(`admin/phone/sideCategory/${id}/updateStatus`,{status});
}