import axios from 'axios';
import { getAccessToken } from './authApi';

const authAxios = axios.create({
    baseURL: 'http://localhost:5000/api'
});

authAxios.interceptors.request.use((config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

export default authAxios;