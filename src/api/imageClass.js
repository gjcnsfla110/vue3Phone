import service from "@/axios.js";

export function imageClassList(page){
    return  service.get(`admin/image_class/${page}`);
}

export function imageList(id){
    return  service.post();
}

export function addImageClass(data){
    return  service.post("admin/image_class",data);
}