import React from 'react';
import { Users, Bed, Home, ChevronDown } from 'lucide-react';

interface HomeFiltersProps {
    selectedType: string;
    setSelectedType: (type: string) => void;
    selectedUniversity: string;
    setSelectedUniversity: (uni: string) => void;
    universities: string[];
}

const HomeFilters: React.FC<HomeFiltersProps> = ({
    selectedType,
    setSelectedType,
    selectedUniversity,
    setSelectedUniversity,
    universities,
}) => {
    return (
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 pb-4">
            <div className="mt-4 space-y-3 sm:space-y-4 animate-fade-in">
                {/* Horizontal scroll filters */}
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-3 px-3 sm:mx-0 sm:px-0">
                    <button
                        onClick={() => setSelectedType('all')}
                        className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex-shrink-0 ${
                            selectedType === 'all'
                                ? 'bg-white text-black'
                                : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                        }`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setSelectedType('roommate')}
                        className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-1.5 flex-shrink-0 ${
                            selectedType === 'roommate'
                                ? 'bg-white text-black'
                                : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                        }`}
                    >
                        <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        Roommates
                    </button>
                    <button
                        onClick={() => setSelectedType('bunkmate')}
                        className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-1.5 flex-shrink-0 ${
                            selectedType === 'bunkmate'
                                ? 'bg-white text-black'
                                : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                        }`}
                    >
                        <Bed className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        Bunkmates
                    </button>
                    <button
                        onClick={() => setSelectedType('rental')}
                        className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-1.5 flex-shrink-0 ${
                            selectedType === 'rental'
                                ? 'bg-white text-black'
                                : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                        }`}
                    >
                        <Home className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        Rentals
                    </button>
                </div>
                
                {/* University dropdown */}
                <div className="relative w-full">
                    <select
                        value={selectedUniversity}
                        onChange={(e) => setSelectedUniversity(e.target.value)}
                        className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white text-sm sm:text-base focus:outline-none focus:border-white/40 appearance-none pr-10"
                    >
                        {universities.map(uni => (
                            <option key={uni} value={uni} className="bg-black">{uni}</option>
                        ))}
                    </select>
                    <ChevronDown className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-white pointer-events-none" />
                </div>
            </div>
            <style jsx>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in { animation: fade-in 0.2s ease-out; }
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </div>
    );
};

export default HomeFilters;
