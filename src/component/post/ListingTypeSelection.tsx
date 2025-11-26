import React from 'react';
import { Users, Bed, Home } from 'lucide-react';

type ListingType = 'roommate' | 'bunkmate' | 'rental' | '';

interface ListingTypeSelectionProps {
    listingType: ListingType;
    setListingType: (type: ListingType) => void;
}

export default function ListingTypeSelection({ listingType, setListingType }: ListingTypeSelectionProps) {
    const listingTypes = [
        { id: 'roommate', emoji: '👥', title: 'Roommate', description: 'Looking for someone to share apartment', icon: Users },
        { id: 'bunkmate', emoji: '🛏️', title: 'Bunkmate', description: 'Share a bunk bed in hostel', icon: Bed },
        { id: 'rental', emoji: '🏠', title: 'Full Rental', description: 'Entire room, apartment, or studio', icon: Home }
    ];

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-black mb-2">Choose Listing Type</h2>
                <p className="text-gray-400">What type of accommodation?</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {listingTypes.map((type) => (
                    <button
                        key={type.id}
                        onClick={() => setListingType(type.id as ListingType)}
                        className={`p-6 rounded-2xl border-2 transition-all text-left ${listingType === type.id ? 'bg-white text-black border-white' : 'bg-white/5 border-white/10 hover:border-white/30'
                            }`}
                    >
                        <div className="text-4xl mb-3">{type.emoji}</div>
                        <h3 className="font-bold text-lg mb-2">{type.title}</h3>
                        <p className={`text-sm ${listingType === type.id ? 'text-black/70' : 'text-gray-400'}`}>
                            {type.description}
                        </p>
                    </button>
                ))}
            </div>
        </div>
    );
}
