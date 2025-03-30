import service from "@/axios.js";

export function getLabelList(page,limit=10) {
    return service.get(`/admin/label/${page}/list?limit=${limit}`);
}

export function createLabel(data) {
    return service.post(`/admin/label`,data);
}

export function updateLabel(id,data) {
    return service.post(`admin/label/${id}/update`,data);
}

export function deleteLabel(id){
    return service.post(`admin/label/${id}/delete`);
}