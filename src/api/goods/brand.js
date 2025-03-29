import service from "@/axios.js";

export function getBrandList(page,limit=10){
    return service.get(`/admin/brand/${page}/list?limit=${limit}`);
}

export function addBrand(data){
    return service.post(`/admin/brand`,data);
}

export function updateBrand(id,data){
    return  service.post(`admin/brand/${id}/update`,data);
}

export function deleteBrand(id){
    return  service.post(`admin/brand/${id}/delete`);
}