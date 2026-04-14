import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api",
    timeout: 60000, // 👈 60s timeout for optimized large dataset queries
    paramsSerializer: (params) => {
        // Handle complex query params cleanly
        return Object.keys(params)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
            .join('&');
    }
});

// Request interceptor
API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    // Add app version/tracking
    req.headers['X-App-Version'] = '1.0';
    console.log('API Request:', req.method?.toUpperCase(), req.url, req.params);
    return req;
}, (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
});

// Response interceptor
API.interceptors.response.use(
    (response) => {
        console.log('API Success:', response.config.url, `(${response.data.products?.length || 0} items)`);
        return response;
    },
    (error) => {
        const url = error.config?.url || 'unknown';
        const status = error.response?.status || 'unknown';
        const message = error.response?.data?.message || error.message || 'Unknown error';
        console.error(`API Error: ${url} ${status} ${message}`);
        
        // Handle common errors
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        
        // Optimized timeout handling
        if (error.code === 'ECONNABORTED') {
            console.error(`Request timeout (${error.config?.timeout || 60000}ms) - query too broad? Add category/search filters.`);
        }
        
        return Promise.reject(error);
    }
);

export default API;
