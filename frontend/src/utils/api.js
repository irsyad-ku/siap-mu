import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api', // adjust this if your Laravel backend runs on a different port/host
    withCredentials: true, // required for Sanctum cookie-based authentication
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});

// Add a request interceptor to attach the Bearer token if it exists in localStorage
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;
