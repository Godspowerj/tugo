import axios from 'axios';

export interface WaitlistResponse {
    success: boolean;
    message?: string;
    error?: string;
}

export const waitlistApi = {
    joinWaitlist: async (email: string): Promise<WaitlistResponse> => {
        try {
            const response = await axios.post('https://tugobackend.onrender.com/api/waitlist', { email });
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
