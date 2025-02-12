import service from "@/axios.js";

//이미지클래스 리스트
export function imageClassList(page,limit=10){
    return  service.get(`admin/image_class/${page}?limit=${limit}`);
}

//이미지 리스트
export function imageList(data){
    return  service.get(`admin/image_class/${data.id}/images/${data.page}?limit=${data.limit}`);
}

//이미지 클래스 추가
export function addImageClass(data){
    return  service.post("admin/image_class",data);
}

//이미지클래스 전체리스트(select 추가할때 사용)
export function imageClassAll(){
    return service.post("admin/image_class/all");
}