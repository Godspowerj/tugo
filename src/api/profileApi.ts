import axios, { AxiosError } from 'axios';
import { apiClient } from '../lib/axios';

export interface ProfileData {
  university: string;
  major: string;
  year: string;
  bio: string;
  lifestyle: string[];
  profilePicture?: string;
}

export interface ProfileResponse {
  id: number;
  userId: number;
  university: string;
  major: string;
  year: string;
  bio: string;
  lifestyles: string[];
  profilePicture?: string;
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

export const profileApi = {
  createProfile: async (data: ProfileData): Promise<ApiResponse<ProfileResponse>> => {
    try {
      const response = await apiClient.post('/profile', data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return error.response.data;
      }
      return {
        success: false,
        message: 'Network error. Please check your connection.',
        errors: []
      };
    }
  },

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

  uploadProfilePicture: async (formData: FormData): Promise<ApiResponse<{ profilePicture: string; profile: ProfileResponse }>> => {
    try {
      const response = await apiClient.post('/profile/upload-picture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return error.response.data;
      }
      return {
        success: false,
        message: 'Failed to upload profile picture',
        errors: []
      };
    }
  },
};

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