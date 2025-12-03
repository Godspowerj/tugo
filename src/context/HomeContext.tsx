"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { MOCK_FEED_ITEMS, UNIVERSITIES } from '@/src/lib/mockData';

interface HomeContextType {
    // Search & Filters
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    showFilters: boolean;
    setShowFilters: (show: boolean) => void;
    selectedType: string;
    setSelectedType: (type: string) => void;
    selectedUniversity: string;
    setSelectedUniversity: (university: string) => void;

    // Feed Data
    feedItems: any[];
    loading: boolean;
    filteredItems: any[];
    sponsoredItems: any[];
    regularItems: any[];
    fetchFeedData: () => Promise<void>;

    // AI Chat
    showAIChat: boolean;
    setShowAIChat: (show: boolean) => void;
    chatMessages: { role: string; content: string }[];
    setChatMessages: (messages: { role: string; content: string }[]) => void;
    chatInput: string;
    setChatInput: (input: string) => void;

    // Constants
    universities: string[];
}

const HomeContext = createContext<HomeContextType | undefined>(undefined);

export const HomeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [selectedType, setSelectedType] = useState('all');
    const [selectedUniversity, setSelectedUniversity] = useState('All Universities');
    const [showAIChat, setShowAIChat] = useState(false);
    const [chatMessages, setChatMessages] = useState<{ role: string; content: string }[]>([
        { role: 'assistant', content: 'Hi! I\'m your Tugo assistant. How can I help you find the perfect accommodation today?' }
    ]);
    const [chatInput, setChatInput] = useState('');
    const [loading, setLoading] = useState(true);
    const [feedItems, setFeedItems] = useState<any[]>([]);

    useEffect(() => {
        fetchFeedData();
    }, []);

    // Re-fetch data when the page becomes visible (e.g., when user returns from creating a post)
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (!document.hidden) {
                fetchFeedData();
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    const fetchFeedData = async () => {
        setLoading(true);
        try {
            const { listingApi } = await import('@/src/api/listingApi');
            const { businessAdApi } = await import('@/src/api/businessAdApi');

            // Fetch both listings and business ads in parallel
            const [listingsResult, businessAdsResult] = await Promise.all([
                listingApi.getListings(),
                businessAdApi.getBusinessAds()
            ]);

            const allItems = [];

            // Format listings - Convert backend data to frontend format
            if (listingsResult.data?.listings) {
                const formattedListings = listingsResult.data.listings.map((listing: any) => ({
                    id: listing.id,
                    type: 'listing',
                    listingType: listing.listingType,
                    title: listing.title,
                    description: listing.description,
                    price: listing.price,
                    priceType: listing.priceType,
                    university: listing.university,
                    location: listing.location,
                    isSponsored: listing.isSponsored,
                    posterName: listing.user?.fullName || 'Anonymous',
                    posterImage: listing.user?.profile?.profilePicture || '',
                    posterPhone: listing.phoneNumber,
                    posterVerified: true,
                    // Safe array access - use optional chaining to avoid errors
                    propertyImage: listing.images?.[0] || '',
                    availableFrom: listing.availableFrom,
                }));
                allItems.push(...formattedListings);
            }

            // Format business ads - Convert backend data to frontend format
            if (businessAdsResult.data?.businessAds) {
                const formattedAds = businessAdsResult.data.businessAds.map((ad: any) => ({
                    id: ad.id,
                    type: 'business',
                    businessType: ad.businessType,
                    title: ad.businessName,
                    description: ad.description,
                    // Safe array access - use optional chaining to avoid errors
                    image: ad.images?.[0] || '',
                    link: ad.ctaLink || '',
                    targetUniversity: ad.targetUniversity,
                    location: ad.location,
                    isSponsored: ad.isSponsored || false,
                    ctaText: ad.ctaText,
                    rating: ad.rating,
                    priceRange: ad.priceRange,
                    hasDiscount: ad.hasDiscount,
                    discountDetails: ad.discountDetails,
                }));
                allItems.push(...formattedAds);
            }

            setFeedItems(allItems);
            console.log('📊 Fetched feed data:', {
                totalItems: allItems.length,
                listings: allItems.filter(i => i.type === 'listing').length,
                businessAds: allItems.filter(i => i.type === 'business').length,
                allItems: allItems
            });
        } catch (error) {
            console.error('Error fetching feed:', error);
            // Fallback to mock data if API fails
            console.log('Using mock data as fallback...');
            setFeedItems(MOCK_FEED_ITEMS);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Filter feed items based on search query, type, and university
     * This makes it easy for users to find exactly what they're looking for
     */
    const filteredItems = feedItems.filter(item => {
        // Search filter - Check if search query matches title, description, location, or university
        const matchesSearch = searchQuery
            ? (item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                // Only check university for listings (business ads don't have this field)
                (item.type === 'listing' && item.university?.toLowerCase().includes(searchQuery.toLowerCase())))
            : true;

        // Type filter - Show items based on selected type
        let matchesType = true;
        if (selectedType !== 'all') {
            if (item.type === 'listing') {
                // For listings, match the listing type (roommate, bunkmate, rental)
                matchesType = item.listingType === selectedType;
            } else {
                // Business ads don't match roommate/bunkmate/rental filters
                matchesType = false;
            }
        }

        // University filter - Only applies to listings
        const matchesUniversity = selectedUniversity === 'All Universities'
            ? true
            : (item.type === 'listing' && item.university === selectedUniversity);

        return matchesSearch && matchesType && matchesUniversity;
    });

    const sponsoredItems = filteredItems.filter(item => item.isSponsored);
    const regularItems = filteredItems.filter(item => !item.isSponsored);

    console.log('🔍 Filter state:', {
        searchQuery,
        selectedType,
        selectedUniversity,
        feedItemsCount: feedItems.length,
        filteredItemsCount: filteredItems.length,
        sponsoredCount: sponsoredItems.length,
        regularCount: regularItems.length
    });

    const contextValue: HomeContextType = {
        searchQuery,
        setSearchQuery,
        showFilters,
        setShowFilters,
        selectedType,
        setSelectedType,
        selectedUniversity,
        setSelectedUniversity,
        feedItems,
        loading,
        filteredItems,
        sponsoredItems,
        regularItems,
        fetchFeedData,
        showAIChat,
        setShowAIChat,
        chatMessages,
        setChatMessages,
        chatInput,
        setChatInput,
        universities: UNIVERSITIES,
    };

    return (
        <HomeContext.Provider value={contextValue}>
            {children}
        </HomeContext.Provider>
    );
};

// Custom hook
export const useHome = () => {
    const context = useContext(HomeContext);
    if (context === undefined) {
        throw new Error('useHome must be used within a HomeProvider');
    }
    return context;
};
