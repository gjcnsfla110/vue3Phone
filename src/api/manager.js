import service from '@/axios.js';
export function login(data){
    service.post('/admin/login',data);
}