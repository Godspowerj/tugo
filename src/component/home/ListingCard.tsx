// ListingCard.tsx - Fixed
import React from 'react';
import { Users, Bed, Home, CheckCircle, MapPin, Calendar, MessageCircle, Star } from 'lucide-react';
import Image from 'next/image';

export interface Listing {
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

interface ListingCardProps {
    listing: Listing;
    isSponsored?: boolean;
}

const getTypeIcon = (type: string) => {
    switch (type) {
        case 'roommate': return <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" />;
        case 'bunkmate': return <Bed className="w-3.5 h-3.5 sm:w-4 sm:h-4" />;
        case 'rental': return <Home className="w-3.5 h-3.5 sm:w-4 sm:h-4" />;
        default: return <Home className="w-3.5 h-3.5 sm:w-4 sm:h-4" />;
    }
};

const openWhatsApp = (phone: string, title: string) => {
    const message = encodeURIComponent(`Hi! I'm interested in your listing: ${title}`);
    window.open(`https://wa.me/${phone.replace(/\+/g, '')}?text=${message}`, '_blank');
};

const ListingCard: React.FC<ListingCardProps> = ({ listing, isSponsored = false }) => {
    return (
        <div className={`w-full rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-300 backdrop-blur-sm group ${
            isSponsored
                ? 'bg-gradient-to-br from-white/15 to-white/5 border border-white/20'
                : 'bg-gradient-to-b from-white/10 to-white/5 border border-white/20 hover:border-white/40'
        }`}>
            {/* Image section */}
            <div className="relative h-64 sm:h-72 md:h-80 lg:h-96 overflow-hidden">
                <Image
                    src={listing.propertyImage}
                    alt={listing.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    priority={isSponsored}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                {/* Bottom overlay with poster info */}
                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                        <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
                            <Image
                                src={listing.posterImage}
                                alt={listing.posterName}
                                fill
                                className="rounded-full border-2 border-white/80 object-cover"
                            />
                            {listing.posterVerified && (
                                <div className="absolute -bottom-0.5 -right-0.5 sm:-bottom-1 sm:-right-1 bg-blue-500 rounded-full p-0.5 z-10">
                                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-white fill-current" />
                                </div>
                            )}
                        </div>
                        <div className="min-w-0">
                            <p className="text-white font-bold text-sm sm:text-base truncate">{listing.posterName}</p>
                            <p className="text-white/70 text-xs sm:text-sm flex items-center gap-1">
                                {listing.posterVerified && <CheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0" />}
                                <span className="truncate">Verified User</span>
                            </p>
                        </div>
                    </div>

                    <span className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold bg-white/95 text-black backdrop-blur-sm flex-shrink-0">
                        {getTypeIcon(listing.listingType)}
                        <span className="capitalize hidden sm:inline">{listing.listingType}</span>
                    </span>
                </div>
            </div>

            {/* Content section */}
            <div className="p-4 sm:p-5 md:p-6 space-y-3 sm:space-y-4">
                {/* Title and price */}
                <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg sm:text-xl font-bold text-white flex-1 line-clamp-2">
                        {listing.title}
                    </h3>
                    <div className="text-right flex-shrink-0">
                        <span className="text-xl sm:text-2xl font-black text-white whitespace-nowrap">
                            ₦{listing.price.toLocaleString()}
                        </span>
                        <div className="text-xs sm:text-sm text-gray-400 whitespace-nowrap">
                            per {listing.priceType === 'monthly' ? 'month' : listing.priceType}
                        </div>
                    </div>
                </div>

                {/* Description */}
                <p className="text-gray-400 leading-relaxed text-sm sm:text-base line-clamp-2">
                    {listing.description}
                </p>

                {/* Details */}
                <div className="space-y-2">
                    <div className="flex items-center text-xs sm:text-sm text-gray-400">
                        <Home className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
                        <span className="truncate">{listing.university}</span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center text-xs sm:text-sm text-gray-400 min-w-0">
                            <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
                            <span className="truncate">{listing.location}</span>
                        </div>
                        <div className="flex items-center text-xs sm:text-sm text-gray-400 flex-shrink-0">
                            <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2" />
                            <span className="whitespace-nowrap">{listing.availableFrom}</span>
                        </div>
                    </div>
                </div>

                {/* Contact button */}
                <div className="flex items-center gap-3 pt-3 sm:pt-4">
                    <button
                        onClick={() => openWhatsApp(listing.posterPhone, listing.title)}
                        className="flex-1 flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-black px-4 py-3 sm:py-3.5 rounded-full text-sm sm:text-base font-bold transition-all transform hover:scale-105 active:scale-95"
                    >
                        <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span>Contact</span>
                    </button>
                </div>

                {/* Sponsored badge */}
                {isSponsored && (
                    <div className="pt-2 sm:pt-3 border-t border-white/10">
                        <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                            <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-yellow-500 fill-yellow-500" />
                            <span className="font-semibold">Sponsored Listing</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ListingCard;