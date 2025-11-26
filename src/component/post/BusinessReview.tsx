import React from 'react';
import { UtensilsCrossed, Scissors, ShoppingBag, Store, Briefcase, MapPin, Home, Phone, ExternalLink, Star, AlertCircle } from 'lucide-react';

interface BusinessAdData {
    businessType: 'eatery' | 'barber' | 'laundry' | 'store' | 'service' | '';
    businessName: string;
    description: string;
    location: string;
    targetUniversity: string;
    phoneNumber: string;
    website: string;
    priceRange: '₦' | '₦₦' | '₦₦₦';
    ctaText: string;
    hasDiscount: boolean;
    discountDetails: string;
}

interface Package {
    id: string;
    name: string;
    duration: string;
    price: number;
}

interface BusinessReviewProps {
    data: BusinessAdData;
    imagePreviews: string[];
    selectedPackage: string;
    packages: Package[];
}

export default function BusinessReview({ data, imagePreviews, selectedPackage, packages }: BusinessReviewProps) {
    return (
        <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-black mb-2">Review Your Business Ad</h2>
                <p className="text-gray-400">Final check before publishing</p>
            </div>

            <div className="space-y-6">
                {/* Preview Card */}
                <div className="bg-gradient-to-br from-white/12 to-white/5 rounded-2xl border-2 border-white/20 overflow-hidden">
                    {imagePreviews.length > 0 && (
                        <div className="relative h-64">
                            <img
                                src={imagePreviews[0]}
                                alt="Business cover"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                            <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-full">
                                {data.businessType === 'eatery' && <UtensilsCrossed className="w-5 h-5" />}
                                {data.businessType === 'barber' && <Scissors className="w-5 h-5" />}
                                {data.businessType === 'laundry' && <ShoppingBag className="w-5 h-5" />}
                                {data.businessType === 'store' && <Store className="w-5 h-5" />}
                                {data.businessType === 'service' && <Briefcase className="w-5 h-5" />}
                                <span className="text-black text-xs font-black uppercase">{data.businessType}</span>
                            </div>
                        </div>
                    )}

                    <div className="p-6 space-y-4">
                        <div className="flex items-start justify-between gap-3">
                            <h3 className="text-xl font-bold text-white flex-1">{data.businessName}</h3>
                            <span className="text-sm font-bold text-gray-300 bg-white/10 px-3 py-1 rounded-full">{data.priceRange}</span>
                        </div>

                        <p className="text-gray-400">{data.description}</p>

                        {data.hasDiscount && data.discountDetails && (
                            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-3 flex items-center gap-2">
                                <Star className="w-5 h-5 text-green-400 flex-shrink-0" />
                                <span className="text-sm text-green-400 font-semibold">{data.discountDetails}</span>
                            </div>
                        )}

                        <div className="space-y-2 text-sm">
                            <div className="flex items-center text-gray-400">
                                <MapPin className="w-4 h-4 mr-2" />
                                {data.location}
                            </div>
                            <div className="flex items-center text-gray-400">
                                <Home className="w-4 h-4 mr-2" />
                                Target: {data.targetUniversity}
                            </div>
                            <div className="flex items-center text-gray-400">
                                <Phone className="w-4 h-4 mr-2" />
                                {data.phoneNumber}
                            </div>
                            {data.website && (
                                <div className="flex items-center text-gray-400">
                                    <ExternalLink className="w-4 h-4 mr-2" />
                                    {data.website}
                                </div>
                            )}
                        </div>

                        <div className="pt-3 border-t border-white/10">
                            <div className="flex items-center justify-center gap-2 text-xs">
                                <Star className="w-3.5 h-3.5 text-purple-500 fill-purple-500" />
                                <span className="font-semibold text-gray-400">
                                    Sponsored Business - {packages.find(p => p.id === selectedPackage)?.name}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                        <h4 className="font-bold text-white mb-2">Business Info</h4>
                        <ul className="space-y-1 text-sm text-gray-400">
                            <li>✓ Type: {data.businessType}</li>
                            <li>✓ Target: {data.targetUniversity}</li>
                            <li>✓ Photos: {imagePreviews.length}</li>
                            <li>✓ CTA: {data.ctaText}</li>
                        </ul>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-xl p-4">
                        <h4 className="font-bold text-white mb-2">Advertising Package</h4>
                        <ul className="space-y-1 text-sm text-gray-300">
                            <li>✓ {packages.find(p => p.id === selectedPackage)?.name}</li>
                            <li>✓ Duration: {packages.find(p => p.id === selectedPackage)?.duration}</li>
                            <li>✓ Cost: ₦{packages.find(p => p.id === selectedPackage)?.price.toLocaleString()}</li>
                            <li>✓ Features: Top placement, highlighted</li>
                        </ul>
                    </div>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 flex gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-gray-300">
                        After clicking "Publish", you'll be redirected to payment. Your ad will go live once payment is confirmed.
                    </div>
                </div>
            </div>
        </div>
    );
}
