import service from "@/axios.js";

export function addImage(data){
    return service.post('admin/image/upload',data);
}

export function deleteImages(ids){
    return service.post('admin/image/delete_all',ids);
}

export function updateImage(id,name){
    return service.post(`admin/image/${id}/update`,{name});
}