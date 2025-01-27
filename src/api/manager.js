import service from '@/axios.js';

export function login(data){
    return service.post('admin/login',data);
}

export function getInfo(){
    return service.post('/admin/getInfo');
}