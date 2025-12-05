"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UNIVERSITIES } from '@/src/lib/mockData';

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
    error: string | null;
    filteredItems: any[];
    sponsoredItems: any[];
    regularItems: any[];
    fetchFeedData: () => Promise<void>;
    refreshFeed: () => Promise<void>;

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
    const [error, setError] = useState<string | null>(null);
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

            // Fetch listings
            const listingsResult = await listingApi.getListings();

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
                    posterName: listing.posterName || 'Anonymous',
                    posterImage: listing.posterImage,
                    posterPhone: listing.posterPhone,
                    posterVerified: listing.posterVerified || false,
                    propertyImage: listing.images?.[0] || '',
                    availableFrom: listing.availableFrom,
                }));
                allItems.push(...formattedListings);
            }

            setFeedItems(allItems);
            console.log('📊 Fetched feed data:', {
                totalItems: allItems.length,
                listings: allItems.filter(i => i.type === 'listing').length,
                allItems: allItems
            });
        } catch (error: any) {
            console.error('Error fetching feed:', error);
            setError(error.message || 'Failed to fetch feed data');
            setFeedItems([]);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Filter feed items based on search query, type, and university
     */
    const filteredItems = feedItems.filter(item => {
        // Search filter - Check if search query matches title, description, location, or university
        const matchesSearch = searchQuery
            ? (item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.university?.toLowerCase().includes(searchQuery.toLowerCase()))
            : true;

        // Type filter - Show items based on selected type
        let matchesType = true;
        if (selectedType !== 'all') {
            matchesType = item.listingType === selectedType;
        }

        // University filter
        const matchesUniversity = selectedUniversity === 'All Universities'
            ? true
            : item.university === selectedUniversity;

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
        error,
        filteredItems,
        sponsoredItems,
        regularItems,
        fetchFeedData,
        refreshFeed: fetchFeedData,
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
