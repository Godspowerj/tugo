import { Listing } from '@/src/component/home/ListingCard';
import { BusinessAd } from '@/src/component/home/BusinessAdCard';

export type FeedItem = Listing | BusinessAd;

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
        id: 'b1',
        type: 'business',
        businessType: 'eatery',
        title: 'Campus Bites Restaurant',
        description: '20% off for all UNILAG students! Fresh meals, fast delivery.',
        image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop',
        link: '#',
        targetUniversity: 'University of Lagos',
        location: 'Akoka, Lagos',
        isSponsored: true,
        ctaText: 'Order Now',
        rating: 4.8,
        priceRange: '₦₦'
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
    },
    {
        id: 'b2',
        type: 'business',
        businessType: 'barber',
        title: 'Fresh Cuts Salon',
        description: 'Best haircuts on campus. Student discount available every Tuesday.',
        image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=400&h=300&fit=crop',
        link: '#',
        targetUniversity: 'All Universities',
        location: 'Multiple Locations',
        isSponsored: false,
        ctaText: 'Book Appointment',
        rating: 4.5,
        priceRange: '₦'
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
