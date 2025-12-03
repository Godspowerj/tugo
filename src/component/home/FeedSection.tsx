// FeedSection.tsx - Fixed
import React from 'react';
import ListingCard from './ListingCard';
import BusinessAdCard from './BusinessAdCard';
import { motion, AnimatePresence } from 'framer-motion';
import { useHome } from '@/src/context/HomeContext';

const FeedSection: React.FC = () => {
    const { sponsoredItems, regularItems, feedItems, searchQuery, selectedType, selectedUniversity } = useHome();
    const isEmpty = sponsoredItems.length === 0 && regularItems.length === 0;
    const hasNoListingsAtAll = feedItems.length === 0;
    const hasActiveFilters = searchQuery !== '' || selectedType !== 'all' || selectedUniversity !== 'All Universities';
    console.log("isEmpty", isEmpty);
    console.log("hasNoListingsAtAll", hasNoListingsAtAll);
    console.log("hasActiveFilters", hasActiveFilters);
    
    if (isEmpty) {
        return (
            <div className="flex flex-col items-center justify-center py-20 px-4 text-center z-10 relative">
                <div className="bg-white/5 p-6 rounded-full mb-4 backdrop-blur-sm">
                    <svg
                        className="w-12 h-12 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        {hasNoListingsAtAll ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        )}
                    </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                    {hasNoListingsAtAll ? 'No listings yet' : 'No listings found'}
                </h3>
                <p className="text-gray-400 max-w-md">
                    {hasNoListingsAtAll
                        ? "There are no listings available at the moment. Be the first to post and help students find their perfect accommodation!"
                        : hasActiveFilters
                            ? "We couldn't find any listings matching your criteria. Try adjusting your filters or search terms."
                            : "No listings are currently available. Check back later for new opportunities!"
                    }
                </p>
            </div>
        );
    }

    return (
        <div className="relative z-10 w-full md:max-w-7xl max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 pb-24 sm:pb-32">
            {/* Sponsored section */}
            {sponsoredItems.length > 0 && (
                <div className="mb-8 sm:mb-12">
                    <h2 className="text-xl sm:text-2xl font-black text-white mb-4 sm:mb-6 px-1">Featured Listings</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                        {sponsoredItems.map((item, idx) => (
                            <div key={item.id} className="w-full">
                                {item.type === 'listing'
                                    ? <ListingCard listing={item} isSponsored />
                                    : <BusinessAdCard ad={item} isSponsored isCompact={idx % 3 !== 0} />
                                }
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Regular listings */}
            <div>
                <h2 className="text-xl sm:text-2xl font-black text-white mb-4 sm:mb-6 px-1">All Listings</h2>
                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6"
                >
                    <AnimatePresence>
                        {regularItems.map((item, idx) => (
                            <motion.div
                                layout
                                key={item.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className="w-full"
                            >
                                {item.type === 'listing'
                                    ? <ListingCard listing={item} />
                                    : <BusinessAdCard ad={item} isCompact={idx % 3 !== 0} />
                                }
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
};

export default FeedSection;