import service from "@/axios.js";

export function addImage(data){
    return service.post('admin/image/upload',data);
}

export function deleteImages(id){
    return service.post('admin/image/delete',{id});
}

export function updateImage(id,name){
    return service.post(`admin/image/${id}/update`,{original_name:name});
}