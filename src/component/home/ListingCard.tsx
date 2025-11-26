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
        case 'roommate': return <Users className="w-4 h-4" />;
        case 'bunkmate': return <Bed className="w-4 h-4" />;
        case 'rental': return <Home className="w-4 h-4" />;
        default: return <Home className="w-4 h-4" />;
    }
};

const openWhatsApp = (phone: string, title: string) => {
    const message = encodeURIComponent(`Hi! I'm interested in your listing: ${title}`);
    window.open(`https://wa.me/${phone.replace(/\+/g, '')}?text=${message}`, '_blank');
};

const ListingCard: React.FC<ListingCardProps> = ({ listing, isSponsored = false }) => {
    return (
        <div className={`rounded-3xl overflow-hidden transition-all duration-300 backdrop-blur-sm group ${isSponsored
            ? 'bg-gradient-to-br from-white/15 to-white/5 border border-white/20'
            : 'bg-gradient-to-b from-white/10 to-white/5 border border-white/20 hover:border-white/40'
            }`}>
            <div className="relative h-80 md:h-96 overflow-hidden">
                <Image
                    src={listing.propertyImage}
                    alt={listing.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12">
                            <Image
                                src={listing.posterImage}
                                alt={listing.posterName}
                                fill
                                className="rounded-full border-2 border-white/80 object-cover"
                            />
                            {listing.posterVerified && (
                                <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-0.5 z-10">
                                    <CheckCircle className="w-4 h-4 text-white fill-current" />
                                </div>
                            )}
                        </div>
                        <div>
                            <p className="text-white font-bold">{listing.posterName}</p>
                            <p className="text-white/70 text-sm flex items-center gap-1">
                                {listing.posterVerified && <CheckCircle className="w-3 h-3" />}
                                Verified User
                            </p>
                        </div>
                    </div>

                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold bg-white/95 text-black backdrop-blur-sm">
                        {getTypeIcon(listing.listingType)}
                        <span className="capitalize">{listing.listingType}</span>
                    </span>
                </div>
            </div>

            <div className="p-6 space-y-4">
                <div className="flex items-start justify-between gap-3">
                    <h3 className="text-xl font-bold text-white flex-1">
                        {listing.title}
                    </h3>
                    <div className="text-right">
                        <span className="text-2xl font-black text-white">
                            ₦{listing.price.toLocaleString()}
                        </span>
                        <div className="text-sm text-gray-400">per {listing.priceType === 'monthly' ? 'month' : listing.priceType}</div>
                    </div>
                </div>

                <p className="text-gray-400 leading-relaxed">
                    {listing.description}
                </p>

                <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-400">
                        <Home className="w-4 h-4 mr-2" />
                        <span>{listing.university}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-400">
                            <MapPin className="w-4 h-4 mr-2" />
                            <span>{listing.location}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-400">
                            <Calendar className="w-4 h-4 mr-2" />
                            <span>{listing.availableFrom}</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3 pt-4">
                    <button
                        onClick={() => openWhatsApp(listing.posterPhone, listing.title)}
                        className="flex-1 flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-black px-4 py-3.5 rounded-full font-bold transition-all transform hover:scale-105 active:scale-95"
                    >
                        <MessageCircle className="w-5 h-5" />
                        <span>Contact</span>
                    </button>
                </div>

                {isSponsored && (
                    <div className="pt-3 border-t border-white/10">
                        <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                            <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                            <span className="font-semibold">Sponsored Listing</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ListingCard;
