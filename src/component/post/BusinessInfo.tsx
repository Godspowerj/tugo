import React from 'react';
import { usePost } from '@/src/context/PostContext';

export default function BusinessInfo() {
    const { businessAdData, updateBusinessAd } = usePost();

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-black mb-2">Business Information</h2>
                <p className="text-gray-400">Tell students about your business</p>
            </div>

            <div className="space-y-5">
                <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                        Business Name *
                    </label>
                    <input
                        type="text"
                        value={businessAdData.businessName}
                        onChange={(e) => updateBusinessAd({ businessName: e.target.value })}
                        placeholder="e.g., Campus Bites Restaurant"
                        maxLength={100}
                        className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 outline-none focus:border-white/30 transition-all"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                        Description *
                    </label>
                    <textarea
                        value={businessAdData.description}
                        onChange={(e) => updateBusinessAd({ description: e.target.value })}
                        placeholder="Describe your business, services, what makes you special..."
                        rows={8}
                        maxLength={500}
                        className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 outline-none focus:border-white/30 transition-all resize-none"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        {businessAdData.description.length}/500 characters (min 50)
                    </p>
                </div>
            </div>
        </div>
    );
}
