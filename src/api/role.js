import service from "@/axios.js";


export function roleList(page,limit){
    return service.get(`admin/role/${page}?limit=${limit}`);
}

export function roleCreate(data){
    return  service.post(`admin/role`,data);
}

export function updateRole(id,data){
    return  service.post(`admin/role/${id}/update`,data)
}

export function deleteRole(id){
    return  service.post(`admin/role/${id}/delete`);
}

export function updateStatus(id,status){
    return  service.post(`admin/role/${id}/updateStatus`,{status});
}

export function updateRules(id,ruleIds){
    return  service.post(`admin/role/${id}/updateRules`,{ruleIds});
}

