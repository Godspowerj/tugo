import React from 'react';

interface Package {
    id: string;
    name: string;
    duration: string;
    price: number;
    features: string[];
    recommended: boolean;
    savings?: string;
}

interface StudentBoostProps {
    selectedPackage: string;
    setSelectedPackage: (pkgId: string) => void;
    packages: Package[];
}

export default function StudentBoost({ selectedPackage, setSelectedPackage, packages }: StudentBoostProps) {
    return (
        <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-black mb-2">Boost Your Listing</h2>
                <p className="text-gray-400">Get more visibility (Optional)</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                    onClick={() => setSelectedPackage('')}
                    className={`p-6 rounded-2xl border-2 transition-all ${selectedPackage === '' ? 'bg-white text-black border-white' : 'bg-white/5 border-white/10 hover:border-white/30'
                        }`}
                >
                    <div className="text-3xl mb-3">🆓</div>
                    <h3 className="font-bold text-lg mb-2">Free Post</h3>
                    <p className={`text-sm mb-3 ${selectedPackage === '' ? 'text-black/70' : 'text-gray-400'}`}>
                        Standard visibility
                    </p>
                    <div className="text-2xl font-black">Free</div>
                </button>

                {packages.map((pkg) => (
                    <button
                        key={pkg.id}
                        onClick={() => setSelectedPackage(pkg.id)}
                        className={`relative p-6 rounded-2xl border-2 transition-all ${selectedPackage === pkg.id ? 'bg-white text-black border-white' : 'bg-white/5 border-white/10 hover:border-white/30'
                            }`}
                    >
                        {pkg.recommended && (
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-500 text-black text-xs font-black px-3 py-1 rounded-full">
                                POPULAR
                            </div>
                        )}
                        <div className="text-3xl mb-3">⚡</div>
                        <h3 className="font-bold text-lg mb-2">{pkg.name}</h3>
                        <p className={`text-sm mb-3 ${selectedPackage === pkg.id ? 'text-black/70' : 'text-gray-400'}`}>
                            {pkg.duration}
                        </p>
                        <div className="text-2xl font-black">₦{pkg.price.toLocaleString()}</div>
                    </button>
                ))}
            </div>
        </div>
    );
}
