import { apiClient } from '@/src/lib/axios';

export interface BusinessAdResponse {
  id: string;
  type: 'business';
  businessType: 'eatery' | 'barber' | 'service';
  title: string;
  description: string;
  image: string;
  link: string;
  targetUniversity: string;
  location: string;
  isSponsored: boolean;
  ctaText: string;
  rating?: number;
  priceRange?: string;
  hasDiscount?: boolean;
  discountDetails?: string;
}

export interface CreateBusinessAdInput {
  businessType: 'eatery' | 'barber' | 'laundry' | 'store' | 'service';
  businessName: string;
  description: string;
  location: string;
  targetUniversity: string;
  phoneNumber: string;
  website?: string;
  priceRange: '₦' | '₦₦' | '₦₦₦';
  ctaText: string;
  ctaLink?: string;
  images: string[]; // Cloudinary URLs
  hasDiscount?: boolean;
  discountDetails?: string;
  sponsorshipPackage: string;
}

interface ApiResponse<T> {
  data?: T;
  error?: string;
  success?: boolean;
}

export const businessAdApi = {
  async getBusinessAds(filters?: {
    university?: string;
    businessType?: string;
  }): Promise<ApiResponse<{ businessAds: BusinessAdResponse[]; count: number }>> {
    try {
      const params = new URLSearchParams();
      if (filters?.university) params.append('university', filters.university);
      if (filters?.businessType) params.append('businessType', filters.businessType);

      const response = await apiClient.get(`/business-ads?${params.toString()}`);
      return { data: response.data.data };
    } catch (error: any) {
      console.error('Business Ad API error:', error);
      return { error: error.response?.data?.message || 'Failed to fetch business ads' };
    }
  },

  async getBusinessAdById(id: string): Promise<ApiResponse<BusinessAdResponse>> {
    try {
      const response = await apiClient.get(`/business-ads/${id}`);
      return { data: response.data.data };
    } catch (error: any) {
      console.error('Business Ad API error:', error);
      return { error: error.response?.data?.message || 'Failed to fetch business ad' };
    }
  },

  async createBusinessAd(
    input: CreateBusinessAdInput
  ): Promise<ApiResponse<BusinessAdResponse>> {
    try {
      const response = await apiClient.post('/business-ads', input);
      return { data: response.data.data, success: true };
    } catch (error: any) {
      console.error('Business Ad API error:', error);
      return { error: error.response?.data?.message || 'Failed to create business ad' };
    }
  },

  async updateBusinessAd(
    id: string,
    input: Partial<CreateBusinessAdInput>
  ): Promise<ApiResponse<BusinessAdResponse>> {
    try {
      const response = await apiClient.patch(`/business-ads/${id}`, input);
      return { data: response.data.data, success: true };
    } catch (error: any) {
      console.error('Business Ad API error:', error);
      return { error: error.response?.data?.message || 'Failed to update business ad' };
    }
  },

  async deleteBusinessAd(id: string): Promise<ApiResponse<void>> {
    try {
      await apiClient.delete(`/business-ads/${id}`);
      return { data: undefined, success: true };
    } catch (error: any) {
      console.error('Business Ad API error:', error);
      return { error: error.response?.data?.message || 'Failed to delete business ad' };
    }
  },

  async incrementClicks(id: string): Promise<ApiResponse<void>> {
    try {
      await apiClient.post(`/business-ads/${id}/increment-clicks`);
      return { data: undefined };
    } catch (error: any) {
      console.error('Business Ad API error:', error);
      return { error: 'Failed to increment clicks' };
    }
  },

  async incrementViews(id: string): Promise<ApiResponse<void>> {
    try {
      await apiClient.post(`/business-ads/${id}/increment-views`);
      return { data: undefined };
    } catch (error: any) {
      console.error('Business Ad API error:', error);
      return { error: 'Failed to increment views' };
    }
  },
};