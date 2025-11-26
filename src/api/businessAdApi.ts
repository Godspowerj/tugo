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
  businessType: 'eatery' | 'barber' | 'service';
  title: string;
  description: string;
  image: string;
  link: string;
  targetUniversity: string;
  location: string;
  ctaText: string;
  rating?: number;
  priceRange?: string;
  hasDiscount?: boolean;
  discountDetails?: string;
  isSponsored?: boolean;
}

interface ApiResponse<T> {
  data?: T;
  error?: string;
  success?: boolean;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const businessAdApi = {
  async getBusinessAds(filters?: {
    university?: string;
    businessType?: string;
  }): Promise<ApiResponse<{ businessAds: BusinessAdResponse[]; count: number }>> {
    try {
      const params = new URLSearchParams();
      if (filters?.university) params.append('university', filters.university);
      if (filters?.businessType) params.append('businessType', filters.businessType);

      const response = await fetch(`${API_BASE}/api/business-ads?${params.toString()}`);
      const json = await response.json();

      if (!response.ok) {
        return { error: json.error || 'Failed to fetch business ads' };
      }

      return { data: json.data };
    } catch (error) {
      console.error('Business Ad API error:', error);
      return { error: 'Network error. Please try again.' };
    }
  },

  async getBusinessAdById(id: string): Promise<ApiResponse<BusinessAdResponse>> {
    try {
      const response = await fetch(`${API_BASE}/api/business-ads/${id}`);
      const json = await response.json();

      if (!response.ok) {
        return { error: json.error || 'Failed to fetch business ad' };
      }

      return { data: json.data };
    } catch (error) {
      console.error('Business Ad API error:', error);
      return { error: 'Network error. Please try again.' };
    }
  },

  async createBusinessAd(
    input: CreateBusinessAdInput
  ): Promise<ApiResponse<BusinessAdResponse>> {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

      const response = await fetch(`${API_BASE}/api/business-ads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(input),
      });

      const json = await response.json();

      if (!response.ok) {
        return { error: json.error || 'Failed to create business ad' };
      }

      return { data: json.data };
    } catch (error) {
      console.error('Business Ad API error:', error);
      return { error: 'Network error. Please try again.' };
    }
  },

  async updateBusinessAd(
    id: string,
    input: Partial<CreateBusinessAdInput>
  ): Promise<ApiResponse<BusinessAdResponse>> {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

      const response = await fetch(`${API_BASE}/api/business-ads/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(input),
      });

      const json = await response.json();

      if (!response.ok) {
        return { error: json.error || 'Failed to update business ad' };
      }

      return { data: json.data };
    } catch (error) {
      console.error('Business Ad API error:', error);
      return { error: 'Network error. Please try again.' };
    }
  },

  async deleteBusinessAd(id: string): Promise<ApiResponse<void>> {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

      const response = await fetch(`${API_BASE}/api/business-ads/${id}`, {
        method: 'DELETE',
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      const json = await response.json();

      if (!response.ok) {
        return { error: json.error || 'Failed to delete business ad' };
      }

      return { data: undefined };
    } catch (error) {
      console.error('Business Ad API error:', error);
      return { error: 'Network error. Please try again.' };
    }
  },

  async incrementClicks(id: string): Promise<ApiResponse<void>> {
    try {
      await fetch(`${API_BASE}/api/business-ads/${id}/increment-clicks`, {
        method: 'POST',
      });
      return { data: undefined };
    } catch (error) {
      console.error('Business Ad API error:', error);
      return { error: 'Failed to increment clicks' };
    }
  },

  async incrementViews(id: string): Promise<ApiResponse<void>> {
    try {
      await fetch(`${API_BASE}/api/business-ads/${id}/increment-views`, {
        method: 'POST',
      });
      return { data: undefined };
    } catch (error) {
      console.error('Business Ad API error:', error);
      return { error: 'Failed to increment views' };
    }
  },
};