import service from "@/axios.js";

export function getComponentNameList(page,limit=10) {
     return service.get(`admin/componentName/${page}/list?limit=${limit}`)
}

export function createComponentName(data) {
     return service.post(`admin/componentName/create`, data);
}

export function updateComponentName(id,data){
     return service.post(`admin/componentName/${id}/update`,data);
}
export function deleteComponentName(id){
     return service.post(`admin/componentName/${id}/delete`);
}