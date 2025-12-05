import { Listing } from '@/src/components/home/ListingCard';

export type FeedItem = Listing;

export const MOCK_FEED_ITEMS: FeedItem[] = [
    {
        id: '1',
        type: 'listing',
        listingType: 'roommate',
        title: 'Spacious Room Near Campus',
        description: 'Looking for a clean, responsible roommate. Apartment is 10 mins walk from university. Fully furnished with WiFi included.',
        price: 450,
        priceType: 'monthly',
        university: 'University of Lagos',
        location: 'Yaba, Lagos',
        isSponsored: true,
        posterName: 'Chioma A.',
        posterImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
        posterPhone: '+2348012345678',
        posterVerified: true,
        propertyImage: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop',
        availableFrom: 'Jan 1, 2025'
    },
    {
        id: '2',
        type: 'listing',
        listingType: 'bunkmate',
        title: 'Female Bunkmate Needed',
        description: 'Seeking female student to share bunk in hostel. Safe environment, close to library and cafeteria.',
        price: 200,
        priceType: 'monthly',
        university: 'University of Ibadan',
        location: 'UI Campus, Ibadan',
        isSponsored: false,
        posterName: 'Amina B.',
        posterImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
        posterPhone: '+2348098765432',
        posterVerified: true,
        propertyImage: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=300&fit=crop',
        availableFrom: 'Dec 15, 2024'
    },
    {
        id: '3',
        type: 'listing',
        listingType: 'rental',
        title: 'Self-Con Apartment',
        description: 'Newly built self-contained apartment. Tiled, running water, and secure compound.',
        price: 350000,
        priceType: 'monthly',
        university: 'Lagos State University',
        location: 'Ojo, Lagos',
        isSponsored: false,
        posterName: 'Tunde O.',
        posterImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
        posterPhone: '+2348055555555',
        posterVerified: true,
        propertyImage: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=300&fit=crop',
        availableFrom: 'Immediate'
    }
];

export const UNIVERSITIES = [
    'All Universities',
    'University of Lagos',
    'University of Ibadan',
    'Covenant University',
    'Lagos State University',
    'Obafemi Awolowo University'
];
