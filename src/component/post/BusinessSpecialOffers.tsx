import React from 'react';
import { usePost } from '@/src/context/PostContext';

export default function BusinessSpecialOffers() {
    const { businessAdData, updateBusinessAd } = usePost();

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-black mb-2">Special Offers</h2>
                <p className="text-gray-400">Attract more students with discounts (Optional)</p>
            </div>

            <div className="space-y-5">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h4 className="font-bold text-white mb-1">Student Discount</h4>
                            <p className="text-sm text-gray-400">Offer a special discount to students</p>
                        </div>
                        <button
                            onClick={() => updateBusinessAd({ hasDiscount: !businessAdData.hasDiscount })}
                            className={`relative w-14 h-8 rounded-full transition-all ${businessAdData.hasDiscount ? 'bg-green-500' : 'bg-white/20'
                                }`}
                        >
                            <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${businessAdData.hasDiscount ? 'right-1' : 'left-1'
                                }`} />
                        </button>
                    </div>

                    {businessAdData.hasDiscount && (
                        <div className="animate-fade-in">
                            <label className="block text-sm font-semibold text-gray-300 mb-2">
                                Discount Details
                            </label>
                            <input
                                type="text"
                                value={businessAdData.discountDetails}
                                onChange={(e) => updateBusinessAd({ discountDetails: e.target.value })}
                                placeholder="e.g., 20% off for all students with valid ID"
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 outline-none focus:border-white/30 transition-all"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
