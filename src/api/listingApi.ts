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
  propertyImage: string;
  availableFrom: string;
  isSponsored?: boolean;
  posterName: string;
  posterImage: string;
  posterPhone: string;
  posterVerified?: boolean;
}

interface ApiResponse<T> {
  data?: T;
  error?: string;
  success?: boolean;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

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

      const response = await fetch(`${API_BASE}/api/listings?${params.toString()}`);
      const json = await response.json();

      if (!response.ok) {
        return { error: json.error || 'Failed to fetch listings' };
      }

      return { data: json.data };
    } catch (error) {
      console.error('Listing API error:', error);
      return { error: 'Network error. Please try again.' };
    }
  },

  async getListingById(id: string): Promise<ApiResponse<ListingResponse>> {
    try {
      const response = await fetch(`${API_BASE}/api/listings/${id}`);
      const json = await response.json();

      if (!response.ok) {
        return { error: json.error || 'Failed to fetch listing' };
      }

      return { data: json.data };
    } catch (error) {
      console.error('Listing API error:', error);
      return { error: 'Network error. Please try again.' };
    }
  },

  async createListing(
    input: CreateListingInput
  ): Promise<ApiResponse<ListingResponse>> {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

      const response = await fetch(`${API_BASE}/api/listings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(input),
      });

      const json = await response.json();

      if (!response.ok) {
        return { error: json.error || 'Failed to create listing' };
      }

      return { data: json.data };
    } catch (error) {
      console.error('Listing API error:', error);
      return { error: 'Network error. Please try again.' };
    }
  },

  async updateListing(
    id: string,
    input: Partial<CreateListingInput>
  ): Promise<ApiResponse<ListingResponse>> {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

      const response = await fetch(`${API_BASE}/api/listings/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(input),
      });

      const json = await response.json();

      if (!response.ok) {
        return { error: json.error || 'Failed to update listing' };
      }

      return { data: json.data };
    } catch (error) {
      console.error('Listing API error:', error);
      return { error: 'Network error. Please try again.' };
    }
  },

  async deleteListing(id: string): Promise<ApiResponse<void>> {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

      const response = await fetch(`${API_BASE}/api/listings/${id}`, {
        method: 'DELETE',
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      const json = await response.json();

      if (!response.ok) {
        return { error: json.error || 'Failed to delete listing' };
      }

      return { data: undefined };
    } catch (error) {
      console.error('Listing API error:', error);
      return { error: 'Network error. Please try again.' };
    }
  },

  async incrementContacts(id: string): Promise<ApiResponse<void>> {
    try {
      await fetch(`${API_BASE}/api/listings/${id}/increment-contacts`, {
        method: 'POST',
      });
      return { data: undefined };
    } catch (error) {
      console.error('Listing API error:', error);
      return { error: 'Failed to increment contacts' };
    }
  },

  async incrementViews(id: string): Promise<ApiResponse<void>> {
    try {
      await fetch(`${API_BASE}/api/listings/${id}/increment-views`, {
        method: 'POST',
      });
      return { data: undefined };
    } catch (error) {
      console.error('Listing API error:', error);
      return { error: 'Failed to increment views' };
    }
  },
};