import { apiClient } from '../lib/axios';
import axios from 'axios';

export interface WaitlistResponse {
    success: boolean;
    message?: string;
    error?: string;
}

export const waitlistApi = {
    joinWaitlist: async (email: string): Promise<WaitlistResponse> => {
        try {
            const response = await apiClient.post('/waitlist', { email });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return error.response.data;
            }
            return {
                success: false,
                error: 'Network error. Please try again.',
            };
        }
    },
};
