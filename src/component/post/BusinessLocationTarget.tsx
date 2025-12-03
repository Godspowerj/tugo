import React from 'react';
import { MapPin, ExternalLink, Star } from 'lucide-react';
import { usePost } from '@/src/context/PostContext';

const VALID_UNIVERSITIES = [
    'All Universities',
    'University of Lagos',
    'University of Ibadan',
    'Obafemi Awolowo University',
    'University of Nigeria',
    'Covenant University',
    'Ahmadu Bello University',
    'Lagos State University',
];

export default function BusinessLocationTarget() {
    const { businessAdData, updateBusinessAd } = usePost();

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-black mb-2">Location & Target</h2>
                <p className="text-gray-400">Where and who to reach?</p>
            </div>

            <div className="space-y-5">
                <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                        Business Location *
                    </label>
                    <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            value={businessAdData.location}
                            onChange={(e) => updateBusinessAd({ location: e.target.value })}
                            placeholder="e.g., Yaba, Lagos"
                            className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 outline-none focus:border-white/30 transition-all"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                        Target University *
                    </label>
                    <select
                        value={businessAdData.targetUniversity}
                        onChange={(e) => updateBusinessAd({ targetUniversity: e.target.value })}
                        className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-white/30 transition-all appearance-none"
                    >
                        <option value="" className="bg-black">Select target audience</option>
                        {VALID_UNIVERSITIES.map(uni => (
                            <option key={uni} value={uni} className="bg-black">{uni}</option>
                        ))}
                    </select>
                    <p className="text-xs text-gray-500 mt-1">
                        Choose "All Universities" to reach all students
                    </p>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                        Website (Optional)
                    </label>
                    <div className="relative">
                        <ExternalLink className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="url"
                            value={businessAdData.website}
                            onChange={(e) => updateBusinessAd({ website: e.target.value })}
                            placeholder="https://yourwebsite.com"
                            className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 outline-none focus:border-white/30 transition-all"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                        Price Range
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                        {['₦', '₦₦', '₦₦₦'].map((range) => (
                            <button
                                key={range}
                                onClick={() => updateBusinessAd({ priceRange: range as any })}
                                className={`px-4 py-3 rounded-xl font-bold transition-all ${businessAdData.priceRange === range
                                    ? 'bg-white text-black'
                                    : 'bg-white/5 border border-white/10 hover:border-white/30'
                                    }`}
                            >
                                {range}
                            </button>
                        ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                        ₦ = Budget friendly • ₦₦ = Moderate • ₦₦₦ = Premium
                    </p>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                        Call-to-Action Text
                    </label>
                    <select
                        value={businessAdData.ctaText}
                        onChange={(e) => updateBusinessAd({ ctaText: e.target.value })}
                        className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-white/30 transition-all appearance-none"
                    >
                        <option value="Order Now" className="bg-black">Order Now</option>
                        <option value="Book Now" className="bg-black">Book Now</option>
                        <option value="Call Now" className="bg-black">Call Now</option>
                        <option value="Visit Us" className="bg-black">Visit Us</option>
                        <option value="Learn More" className="bg-black">Learn More</option>
                        <option value="Get Started" className="bg-black">Get Started</option>
                    </select>
                </div>

                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 flex gap-3">
                    <Star className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-gray-300">
                        <strong className="text-white">Tip:</strong> Ads with student discounts get 2x more engagement!
                    </div>
                </div>
            </div>
        </div>
    );
}
