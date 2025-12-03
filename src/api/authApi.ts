import { apiClient } from '@/src/lib/axios';

export interface LoginCredentials {
    email: string;
    password: string;
    acceptCookies?: boolean;
}

export interface SignupData {
    email: string;
    password: string;
    fullName: string;
    university?: string;
    acceptCookies?: boolean;
}

export interface AuthResponse {
    success: boolean;
    accessToken: string;
    message: string;
    data: {
        id: number;
        email: string;
        fullName: string;
        university: string | null;
        createdAt: string;
        updatedAt: string;
    };
}

export interface RefreshResponse {
    success: boolean;
    accessToken: string;
    message: string;
}

export const authApi = {
    /**
     * Login user
     */
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
        return response.data;
    },

    /**
     * Register new user
     */
    async signup(data: SignupData): Promise<AuthResponse> {
        const response = await apiClient.post<AuthResponse>('/auth/signup', data);
        return response.data;
    },

    /**
     * Refresh access token using refresh token cookie
     */
    async refreshToken(): Promise<RefreshResponse> {
        const response = await apiClient.post<RefreshResponse>('/auth/refresh');
        return response.data;
    },

    /**
     * Logout user
     */
    async logout(): Promise<void> {
        try {
            await apiClient.post('/auth/logout');
        } catch (error) {
            console.error('Logout API error:', error);
        } finally {
            if (typeof window !== 'undefined') {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('user');
            }
        }
    },
};
