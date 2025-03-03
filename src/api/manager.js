import service from '@/axios.js';
import {queryUrl} from "@/composables/utill.js";

/**
 * 관리자 로그인
 * @param data
 * @returns
 */
export function login(data){
    return service.post('/admin/login',data);
}

/**
 * 개인정보에 관하여
 * @returns
 */
export function getInfo(){
    return service.post('/admin/getInfo');
}

/**
 * 매니저 리스트
 * @param page
 * @param limit
 * @param param
 * @returns
 */
export function managerList(page,limit,param){
    let query  = queryUrl(param);
    return service.get(`/admin/manager/${page}/list/${limit}${query}`);
}

export function managerCreate(data){
    return  service.post(`admin/manager/add`,data);
}
/**
 * 관리인 업데이트
 */
export function updateManager(id,data){
    return service.post(`admin/manager/${id}/update`,data);
}

/**
 * status업데이트
 * @param id
 * @param status
 * @returns
 */
export function updateStatus(id,status){
    return service.post(`admin/manager/${id}/updateStatus`,{status:status});
}

/**
 * 비밀번호 강제초기화
 * @param id
 * @returns
 */
export function resetPass(id){
    return service.post(`admin/manager/${id}/reset`);
}

/**
 * 관리자 비밀번호 변경
 * @param id
 * @param data
 * @returns
 */
export function updatePass(id,data){
    return service.post(`admin/manager/updatePass`,{id,data});
}

/**
 * 관리자 삭제
 * @param id
 * @returns
 */
export function deleteManager(id){
    return service.post(`admin/manager/delete`,{id});
}
/**
 * 관리인 로그아웃
 */
export function logout(){
    return service.post('/admin/logout');
}
