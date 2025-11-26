import React from 'react';
import { MapPin, DollarSign } from 'lucide-react';

interface StudentListingData {
    university: string;
    location: string;
    price: string;
    priceType: 'monthly' | 'weekly' | 'daily';
    availableFrom: string;
}

interface StudentLocationPriceProps {
    data: StudentListingData;
    setData: (data: Partial<StudentListingData>) => void;
    validUniversities: string[];
}

export default function StudentLocationPrice({ data, setData, validUniversities }: StudentLocationPriceProps) {
    return (
        <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-black mb-2">Location & Pricing</h2>
                <p className="text-gray-400">Where and how much?</p>
            </div>

            <div className="space-y-5">
                <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                        University *
                    </label>
                    <select
                        value={data.university}
                        onChange={(e) => setData({ university: e.target.value })}
                        className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-white/30 transition-all appearance-none"
                    >
                        <option value="" className="bg-black">Select your university</option>
                        {validUniversities.filter(u => u !== 'All Universities').map(uni => (
                            <option key={uni} value={uni} className="bg-black">{uni}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                        Location/Area *
                    </label>
                    <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            value={data.location}
                            onChange={(e) => setData({ location: e.target.value })}
                            placeholder="e.g., Yaba, Lagos or Akoka"
                            className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 outline-none focus:border-white/30 transition-all"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">
                            Monthly Rent (₦) *
                        </label>
                        <div className="relative">
                            <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="number"
                                value={data.price}
                                onChange={(e) => setData({ price: e.target.value })}
                                placeholder="0"
                                className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 outline-none focus:border-white/30 transition-all"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">
                            Price Type *
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                            {['monthly', 'weekly', 'daily'].map((type) => (
                                <button
                                    key={type}
                                    onClick={() => setData({ priceType: type as any })}
                                    className={`px-3 py-3 rounded-xl font-semibold transition-all capitalize ${data.priceType === type
                                            ? 'bg-white text-black'
                                            : 'bg-white/5 border border-white/10 hover:border-white/30'
                                        }`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                        Available From *
                    </label>
                    <input
                        type="date"
                        value={data.availableFrom}
                        onChange={(e) => setData({ availableFrom: e.target.value })}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-white/30 transition-all"
                    />
                </div>
            </div>
        </div>
    );
}
