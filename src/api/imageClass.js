import service from "@/axios.js";

export function imageClassList(){
    return  service.get("imageClassList");
}

export function imageList(id){
    return  service.post("imageClassList");
}