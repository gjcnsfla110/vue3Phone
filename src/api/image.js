import service from "@/axios.js";

export function addImage(data){
    return service.post('admin/image/upload',data);
}

export function deleteImage(id){

}

export function updateImage(data){

}