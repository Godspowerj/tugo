import { apiClient } from '@/src/lib/axios';

export interface ListingResponse {
  id: string;
  type: 'listing';
  listingType: 'roommate' | 'bunkmate' | 'rental';
  title: string;
  description: string;
  price: number;
  priceType: 'monthly' | 'weekly' | 'daily';
  university: string;
  location: string;
  isSponsored: boolean;
  posterName: string;
  posterImage: string;
  posterPhone: string;
  posterVerified: boolean;
  propertyImage: string;
  availableFrom: string;
}

export interface CreateListingInput {
  listingType: 'roommate' | 'bunkmate' | 'rental';
  title: string;
  description: string;
  price: number;
  priceType: 'monthly' | 'weekly' | 'daily';
  university: string;
  location: string;
  availableFrom: string;
  phoneNumber: string;
  images: string[]; // Cloudinary URLs
  isSponsored?: boolean;
  sponsorshipPackage?: string;
}

interface ApiResponse<T> {
  data?: T;
  error?: string;
  success?: boolean;
}

export const listingApi = {
  async getListings(filters?: {
    type?: string;
    university?: string;
    search?: string;
  }): Promise<ApiResponse<{ listings: ListingResponse[]; count: number }>> {
    try {
      const params = new URLSearchParams();
      if (filters?.type) params.append('type', filters.type);
      if (filters?.university) params.append('university', filters.university);
      if (filters?.search) params.append('search', filters.search);

      const response = await apiClient.get(`/listings?${params.toString()}`);
      return { data: response.data.data };
    } catch (error: any) {
      console.error('Listing API error:', error);
      return { error: error.response?.data?.message || 'Failed to fetch listings' };
    }
  },

  async getListingById(id: string): Promise<ApiResponse<ListingResponse>> {
    try {
      const response = await apiClient.get(`/listings/${id}`);
      return { data: response.data.data };
    } catch (error: any) {
      console.error('Listing API error:', error);
      return { error: error.response?.data?.message || 'Failed to fetch listing' };
    }
  },

  async createListing(
    input: CreateListingInput
  ): Promise<ApiResponse<ListingResponse>> {
    try {
      const response = await apiClient.post('/listings', input);
      return { data: response.data.data, success: true };
    } catch (error: any) {
      console.error('Listing API error:', error);
      return { error: error.response?.data?.message || 'Failed to create listing' };
    }
  },

  async updateListing(
    id: string,
    input: Partial<CreateListingInput>
  ): Promise<ApiResponse<ListingResponse>> {
    try {
      const response = await apiClient.patch(`/listings/${id}`, input);
      return { data: response.data.data, success: true };
    } catch (error: any) {
      console.error('Listing API error:', error);
      return { error: error.response?.data?.message || 'Failed to update listing' };
    }
  },

  async deleteListing(id: string): Promise<ApiResponse<void>> {
    try {
      await apiClient.delete(`/listings/${id}`);
      return { data: undefined, success: true };
    } catch (error: any) {
      console.error('Listing API error:', error);
      return { error: error.response?.data?.message || 'Failed to delete listing' };
    }
  },

  async incrementContacts(id: string): Promise<ApiResponse<void>> {
    try {
      await apiClient.post(`/listings/${id}/increment-contacts`);
      return { data: undefined };
    } catch (error: any) {
      console.error('Listing API error:', error);
      return { error: 'Failed to increment contacts' };
    }
  },

  async incrementViews(id: string): Promise<ApiResponse<void>> {
    try {
      await apiClient.post(`/listings/${id}/increment-views`);
      return { data: undefined };
    } catch (error: any) {
      console.error('Listing API error:', error);
      return { error: 'Failed to increment views' };
    }
  },

  async getMyListings(): Promise<ApiResponse<{ listings: ListingResponse[]; count: number }>> {
    try {
      const response = await apiClient.get('/listings/my-listings');
      return { data: response.data.data, success: true };
    } catch (error: any) {
      console.error('Listing API error:', error);
      return { error: error.response?.data?.message || 'Failed to fetch my listings' };
    }
  },
};