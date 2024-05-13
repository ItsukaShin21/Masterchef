import axios from 'axios';

export const baseURL = "http://localhost:8000/api";

const backend_api = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8000/api'
});

export function setAuthToken(token) {
    if(token) {
        backend_api.defaults.headers.common['Authorization'] = `Bearer ${ token }`;
    } else {
        delete backend_api.defaults.headers.common['Authorization'];
    }
}

export default backend_api;