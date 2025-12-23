import Cookies from "js-cookie";
const tokenKey = "admin_token"

export function setToken(value) {
    Cookies.set(tokenKey, value, { expires : new Date(Date.now() + 1000*60*60*3)});
}

export function getToken() {
    return Cookies.get(tokenKey);
}

export function removeToken() {
    Cookies.remove(tokenKey);
}