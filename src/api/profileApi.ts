// lib/api/profileApi.ts
// Complete and corrected API client for profile operations

import axios, { AxiosError } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Types matching your backend
export interface ProfileData {
  university: string;
  major: string;
  year: string;
  bio: string;
  lifestyle: string[];
}

export interface ProfileResponse {
  id: number;
  userId: number;
  university: string;
  major: string;
  year: string;
  bio: string;
  lifestyles: string[];
  createdAt: string;
  updatedAt: string;
  user?: {
    fullName: string;
    email: string;
  };
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Array<{ field: string; message: string }>;
}

// Constants from your backend
export const VALID_LIFESTYLES = [
  'early-bird',
  'night-owl',
  'social',
  'introvert',
  'clean',
  'relaxed',
  'fitness',
  'foodie',
  'minimalist',
  'pet-lover',
  'gamer',
  'creative'
] as const;

export const VALID_UNIVERSITIES = [
  'University of Lagos',
  'University of Ibadan',
  'Obafemi Awolowo University',
  'University of Nigeria',
  'Covenant University',
  'Ahmadu Bello University',
  'Lagos State University',
  'Other'
] as const;

export const VALID_YEARS = [
  '1st Year',
  '2nd Year',
  '3rd Year',
  '4th Year',
  '5th Year',
  'Graduate'
] as const;

// Axios instance with auth token
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiResponse>) => {
    if (error.response?.status === 401) {
      // Handle token expiration
      if (typeof window !== 'undefined') {
        localStorage.removeItem('accessToken');
        window.location.href = '/auth/login';
      }
    }
    return Promise.reject(error);
  }
);

// Profile API functions
export const profileApi = {
  // Create profile
  createProfile: async (data: ProfileData): Promise<ApiResponse<ProfileResponse>> => {
    try {
      const response = await apiClient.post('/profile', data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return error.response.data;
      }
      // Network or other errors
      return {
        success: false,
        message: 'Network error. Please check your connection.',
        errors: []
      };
    }
  },

  // Get current user's profile
  getProfile: async (): Promise<ApiResponse<ProfileResponse>> => {
    try {
      const response = await apiClient.get('/profile');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return error.response.data;
      }
      return {
        success: false,
        message: 'Failed to fetch profile',
        errors: []
      };
    }
  },

  // Update profile
  updateProfile: async (data: Partial<ProfileData>): Promise<ApiResponse<ProfileResponse>> => {
    try {
      const response = await apiClient.put('/profile', data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return error.response.data;
      }
      return {
        success: false,
        message: 'Failed to update profile',
        errors: []
      };
    }
  },

  // Delete profile
  deleteProfile: async (): Promise<ApiResponse> => {
    try {
      const response = await apiClient.delete('/profile');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return error.response.data;
      }
      return {
        success: false,
        message: 'Failed to delete profile',
        errors: []
      };
    }
  },
};

// Helper function to get lifestyle label with emoji
export const lifestyleLabels: Record<string, string> = {
  'early-bird': '🌅 Early Bird',
  'night-owl': '🌙 Night Owl',
  'social': '🎉 Social Butterfly',
  'introvert': '📚 Quiet & Focused',
  'clean': '✨ Super Clean',
  'relaxed': '😌 Relaxed',
  'fitness': '💪 Fitness Enthusiast',
  'foodie': '🍕 Foodie',
  'minimalist': '🎨 Minimalist',
  'pet-lover': '🐾 Pet Lover',
  'gamer': '🎮 Gamer',
  'creative': '🎭 Creative'
};

export const getLifestyleLabel = (lifestyle: string): string => {
  return lifestyleLabels[lifestyle] || lifestyle;
};