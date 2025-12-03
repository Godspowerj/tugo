import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Create a custom interface for the config to include the _retry flag
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 30000, // Increased to 30s for image uploads
    withCredentials: true, // Important for sending cookies (refresh token)
});

// Request interceptor to add the access token to headers
apiClient.interceptors.request.use(
    (config) => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('accessToken');
            if (token) {
                console.log('Axios Request Interceptor - Attaching token to:', config.url);
                config.headers.Authorization = `Bearer ${token}`;
            } else {
                console.log('Axios Request Interceptor - No token found in localStorage for:', config.url);
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor to handle 401 errors and refresh token
apiClient.interceptors.response.use((response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as CustomAxiosRequestConfig;

        // If error is 401 and we haven't retried yet
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                console.log('Axios Interceptor - Attempting token refresh');
                // Attempt to refresh the token
                // We use a separate axios instance or fetch to avoid infinite loops if this fails
                // But using the same instance is fine if we are careful, or better, use fetch for the refresh call
                // to ensure it doesn't trigger the interceptor again in a weird way (though 401 on refresh should fail)

                // Note: We need to send credentials (cookies) for this request
                const response = await axios.post(
                    `${API_BASE_URL}/auth/refresh`,
                    {},
                    { withCredentials: true }
                );
                console.log('Axios Interceptor - Refresh successful', response.data);

                const { accessToken } = response.data;

                if (accessToken) {
                    // Save new token
                    if (typeof window !== 'undefined') {
                        localStorage.setItem('accessToken', accessToken);
                    }

                    // Update default headers for future requests
                    apiClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

                    // Update the failed request's headers with the new token
                    if (originalRequest.headers) {
                        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
                    }

                    // Retry the original request
                    return apiClient(originalRequest);
                }
            } catch (refreshError: any) {
                // If refresh fails (e.g., refresh token expired or invalid)
                console.error('Token refresh failed:', refreshError.response?.data || refreshError.message);

                // Clear local storage and redirect to login
                if (typeof window !== 'undefined') {
                    localStorage.removeItem('accessToken');
                    window.location.href = '/auth/login';
                }

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);
