import service from '@/axios.js';

export function login(data){
    return service.post('/admin/login',data);
}

export function getInfo(){
    return service.post('/admin/getInfo');
}

/**
 * 관리인 업데이트
 */
export function updateManager(data){

}

/**
 * 관리인 로그아웃
 */
export function logout(){
    return service.post('/admin/logout');
}
