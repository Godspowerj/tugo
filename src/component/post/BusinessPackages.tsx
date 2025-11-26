import React from 'react';
import { Star, Check, Building2 } from 'lucide-react';

interface Package {
    id: string;
    name: string;
    duration: string;
    price: number;
    features: string[];
    recommended: boolean;
    savings?: string;
}

interface BusinessPackagesProps {
    selectedPackage: string;
    setSelectedPackage: (pkgId: string) => void;
    packages: Package[];
}

export default function BusinessPackages({ selectedPackage, setSelectedPackage, packages }: BusinessPackagesProps) {
    return (
        <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-black mb-2">Choose Your Package</h2>
                <p className="text-gray-400">Select how long you want your ad to run</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {packages.map((pkg) => (
                    <button
                        key={pkg.id}
                        onClick={() => setSelectedPackage(pkg.id)}
                        className={`relative p-6 rounded-2xl border-2 transition-all text-left ${selectedPackage === pkg.id
                                ? 'bg-white text-black border-white scale-105'
                                : 'bg-white/5 border-white/10 hover:border-white/30'
                            }`}
                    >
                        {pkg.recommended && (
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-black px-3 py-1 rounded-full flex items-center gap-1">
                                <Star className="w-3 h-3 fill-black" />
                                BEST VALUE
                            </div>
                        )}

                        <div className="mb-4">
                            <h3 className="font-black text-xl mb-1">{pkg.name}</h3>
                            <p className={`text-sm ${selectedPackage === pkg.id ? 'text-black/70' : 'text-gray-400'}`}>
                                {pkg.duration}
                            </p>
                        </div>

                        <div className="mb-4">
                            <span className="text-3xl font-black">₦{pkg.price.toLocaleString()}</span>
                            {pkg.savings && (
                                <div className="text-xs text-green-500 font-bold mt-1">{pkg.savings}</div>
                            )}
                        </div>

                        <ul className="space-y-2">
                            {pkg.features.map((feature, idx) => (
                                <li key={idx} className={`text-sm flex items-center gap-2 ${selectedPackage === pkg.id ? 'text-black' : 'text-gray-300'}`}>
                                    <Check className="w-4 h-4 flex-shrink-0" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </button>
                ))}
            </div>

            <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-6">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Building2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h4 className="font-bold text-white mb-2">Why advertise on Tugo?</h4>
                        <ul className="space-y-1 text-sm text-gray-300">
                            <li>✓ Reach thousands of students daily</li>
                            <li>✓ Targeted by university location</li>
                            <li>✓ Direct WhatsApp/call integration</li>
                            <li>✓ Analytics and performance tracking</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
