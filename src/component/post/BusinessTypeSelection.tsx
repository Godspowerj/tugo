import React from 'react';
import { UtensilsCrossed, Scissors, ShoppingBag, Store, Briefcase } from 'lucide-react';

type BusinessType = 'eatery' | 'barber' | 'laundry' | 'store' | 'service' | '';

interface BusinessTypeSelectionProps {
    businessType: BusinessType;
    setBusinessType: (type: BusinessType) => void;
}

export default function BusinessTypeSelection({ businessType, setBusinessType }: BusinessTypeSelectionProps) {
    const businessTypes = [
        { id: 'eatery', emoji: '🍕', title: 'Restaurant/Eatery', description: 'Food delivery, restaurants, cafes', icon: UtensilsCrossed },
        { id: 'barber', emoji: '✂️', title: 'Salon/Barber', description: 'Hair salons, barber shops, beauty', icon: Scissors },
        { id: 'laundry', emoji: '🧺', title: 'Laundry Service', description: 'Washing, dry cleaning services', icon: ShoppingBag },
        { id: 'store', emoji: '🏪', title: 'Retail Store', description: 'Shops, boutiques, bookstores', icon: Store },
        { id: 'service', emoji: '🔧', title: 'Other Services', description: 'Printing, repairs, tutoring, etc.', icon: Briefcase }
    ];

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-black mb-2">Choose Business Type</h2>
                <p className="text-gray-400">What kind of business are you advertising?</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {businessTypes.map((type) => (
                    <button
                        key={type.id}
                        onClick={() => setBusinessType(type.id as BusinessType)}
                        className={`p-6 rounded-2xl border-2 transition-all text-left ${businessType === type.id ? 'bg-white text-black border-white' : 'bg-white/5 border-white/10 hover:border-white/30'
                            }`}
                    >
                        <div className="text-4xl mb-3">{type.emoji}</div>
                        <h3 className="font-bold text-base mb-2">{type.title}</h3>
                        <p className={`text-sm ${businessType === type.id ? 'text-black/70' : 'text-gray-400'}`}>
                            {type.description}
                        </p>
                    </button>
                ))}
            </div>
        </div>
    );
}
