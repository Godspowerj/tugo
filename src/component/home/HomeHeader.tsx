import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';

interface HomeHeaderProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    showFilters: boolean;
    setShowFilters: (show: boolean) => void;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({
    searchQuery,
    setSearchQuery,
    showFilters,
    setShowFilters,
}) => {
    return (
        <div className="relative z-10 bg-black/80 backdrop-blur-xl border-b border-white/10 sticky top-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-gray-400"></div>
                        </div>
                        <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">Tugo</h1>
                    </div>
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all ${showFilters ? 'bg-white text-black' : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                            }`}
                    >
                        <SlidersHorizontal className="w-4 h-4" />
                        <span>Filters</span>
                    </button>
                </div>

                <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search by location, university, or keyword..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-white/40 transition-all"
                    />
                </div>
            </div>
        </div>
    );
};

export default HomeHeader;
