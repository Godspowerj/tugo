import React from 'react';
import { Users, Bed, Home, MapPin, Phone, Star } from 'lucide-react';
import { usePost } from '@/src/context/PostContext';

interface Package {
    id: string;
    name: string;
    duration: string;
    price: number;
}

interface StudentReviewProps {
    packages: Package[];
}

export default function StudentReview({ packages }: StudentReviewProps) {
    const { studentListingData, imagePreviews, selectedPackage } = usePost();

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-black mb-2">Review Your Listing</h2>
                <p className="text-gray-400">Make sure everything looks good</p>
            </div>

            <div className="space-y-6">
                {/* Preview Card */}
                <div className="bg-white/5 rounded-2xl border border-white/20 overflow-hidden">
                    {imagePreviews.length > 0 && (
                        <div className="relative h-64">
                            <img
                                src={imagePreviews[0]}
                                alt="Cover"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                            <div className="absolute bottom-4 left-4 right-4">
                                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold bg-white/90 text-black mb-2">
                                    {studentListingData.listingType === 'roommate' && <><Users className="w-4 h-4" /> Roommate</>}
                                    {studentListingData.listingType === 'bunkmate' && <><Bed className="w-4 h-4" /> Bunkmate</>}
                                    {studentListingData.listingType === 'rental' && <><Home className="w-4 h-4" /> Rental</>}
                                </span>
                            </div>
                        </div>
                    )}

                    <div className="p-6 space-y-4">
                        <div className="flex items-start justify-between gap-3">
                            <h3 className="text-xl font-bold text-white flex-1">{studentListingData.title}</h3>
                            <div className="text-right">
                                <span className="text-2xl font-black text-white">₦{parseInt(studentListingData.price || '0').toLocaleString()}</span>
                                <div className="text-sm text-gray-400">per {studentListingData.priceType}</div>
                            </div>
                        </div>

                        <p className="text-gray-400 line-clamp-3">{studentListingData.description}</p>

                        <div className="space-y-2 text-sm">
                            <div className="flex items-center text-gray-400">
                                <Home className="w-4 h-4 mr-2" />
                                {studentListingData.university}
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center text-gray-400">
                                    <MapPin className="w-4 h-4 mr-2" />
                                    {studentListingData.location}
                                </div>
                                <div className="flex items-center text-gray-400">
                                    <Phone className="w-4 h-4 mr-2" />
                                    {studentListingData.phoneNumber}
                                </div>
                            </div>
                        </div>

                        {selectedPackage && (
                            <div className="pt-3 border-t border-white/10">
                                <div className="flex items-center justify-center gap-2 text-xs">
                                    <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                                    <span className="font-semibold text-gray-400">
                                        Sponsored Listing - {packages.find(p => p.id === selectedPackage)?.name}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Summary Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                        <h4 className="font-bold text-white mb-2">Listing Details</h4>
                        <ul className="space-y-1 text-sm text-gray-400">
                            <li>✓ Type: {studentListingData.listingType}</li>
                            <li>✓ University: {studentListingData.university}</li>
                            <li>✓ Available: {new Date(studentListingData.availableFrom).toLocaleDateString()}</li>
                            <li>✓ Photos: {imagePreviews.length}</li>
                        </ul>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                        <h4 className="font-bold text-white mb-2">Visibility</h4>
                        <ul className="space-y-1 text-sm text-gray-400">
                            {selectedPackage ? (
                                <>
                                    <li>✓ Sponsored: Yes</li>
                                    <li>✓ Duration: {packages.find(p => p.id === selectedPackage)?.duration}</li>
                                    <li>✓ Cost: ₦{packages.find(p => p.id === selectedPackage)?.price.toLocaleString()}</li>
                                </>
                            ) : (
                                <>
                                    <li>✓ Standard posting</li>
                                    <li>✓ Free listing</li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
