import React from 'react';
import { UtensilsCrossed, Scissors, ShoppingBag, Star, MapPin, ExternalLink, Shirt, Store } from 'lucide-react';
import Image from 'next/image';

export interface BusinessAd {
    id: string;
    type: 'business';
    // All 5 business types supported by the backend
    businessType: 'eatery' | 'barber' | 'laundry' | 'store' | 'service';
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
}

interface BusinessAdCardProps {
    ad: BusinessAd;
    isSponsored?: boolean;
    isCompact?: boolean;
}

/**
 * Returns the appropriate icon for each business type
 * This makes it easy to visually identify different business categories
 */
const getBusinessIcon = (type: string) => {
    switch (type) {
        case 'eatery':  // Restaurants, cafes, food vendors
            return <UtensilsCrossed className="w-5 h-5" />;
        case 'barber':  // Barbershops, salons
            return <Scissors className="w-5 h-5" />;
        case 'laundry': // Laundry and dry cleaning services
            return <Shirt className="w-5 h-5" />;
        case 'store':   // Retail stores, shops
            return <Store className="w-5 h-5" />;
        case 'service': // General services
            return <ShoppingBag className="w-5 h-5" />;
        default:        // Fallback icon
            return <ShoppingBag className="w-5 h-5" />;
    }
};

const BusinessAdCard: React.FC<BusinessAdCardProps> = ({ ad, isSponsored = false, isCompact = false }) => {
    return (
        <div className={`rounded-3xl overflow-hidden transition-all duration-300 backdrop-blur-sm group ${isCompact ? 'col-span-1' : 'md:col-span-2'
            } ${isSponsored
                ? 'bg-gradient-to-br from-white/15 to-white/5 border border-white/20'
                : 'bg-gradient-to-br from-white/12 to-white/5 border border-white/20 hover:border-white/40'
            }`}>
            <div className={`relative ${isCompact ? 'h-48' : 'h-64 md:h-80'} overflow-hidden`}>
                {ad.image && (
                    <Image
                        src={ad.image}
                        alt={`${ad.title} - ${ad.businessType} business`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                )}
                {!ad.image && (
                    <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                        <Store className="w-16 h-16 text-gray-500" />
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-full z-10">
                    {getBusinessIcon(ad.businessType)}
                    <span className="text-black text-xs font-bold uppercase">{ad.businessType}</span>
                </div>

                {ad.rating && (
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-yellow-400 px-3 py-2 rounded-full z-10">
                        <Star className="w-4 h-4 fill-black text-black" />
                        <span className="text-black text-sm font-black">{ad.rating}</span>
                    </div>
                )}
            </div>

            <div className="p-6 space-y-4">
                <div className="flex items-start justify-between gap-3">
                    <h3 className={`${isCompact ? 'text-lg' : 'text-xl'} font-bold text-white flex-1`}>
                        {ad.title}
                    </h3>
                    {ad.priceRange && (
                        <span className="text-sm font-bold text-gray-300 bg-white/10 px-3 py-1 rounded-full">{ad.priceRange}</span>
                    )}
                </div>

                <p className={`text-gray-400 leading-relaxed ${isCompact ? 'text-sm' : ''}`}>
                    {ad.description}
                </p>

                <div className="flex items-center text-sm text-gray-400">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{ad.location}</span>
                </div>

                <button
                    onClick={() => window.open(ad.link, '_blank')}
                    className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-black px-4 py-3.5 rounded-full font-bold transition-all transform hover:scale-105 active:scale-95"
                >
                    <span>{ad.ctaText}</span>
                    <ExternalLink className="w-5 h-5" />
                </button>

                {isSponsored && (
                    <div className="pt-3 border-t border-white/10">
                        <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                            <Star className="w-3.5 h-3.5 text-purple-500 fill-purple-500" />
                            <span className="font-semibold">Sponsored Business</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BusinessAdCard;
