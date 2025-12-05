import React from 'react';
import ListingCard from './ListingCard';
import { motion, AnimatePresence } from 'framer-motion';
import { useHome } from '@/src/context/HomeContext';
import NetworkError from '../NetworkError';
import { Home as HomeIcon, Search } from 'lucide-react';

const FeedSection: React.FC = () => {
    const { sponsoredItems, regularItems, feedItems, searchQuery, selectedType, selectedUniversity, error, refreshFeed } = useHome();
    const isEmpty = sponsoredItems.length === 0 && regularItems.length === 0;
    const hasNoListingsAtAll = feedItems.length === 0;
    const hasActiveFilters = searchQuery !== '' || selectedType !== 'all' || selectedUniversity !== 'All Universities';

    // Network/server errors
    if (error) {
        return (
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 sm:pb-32">
                <NetworkError
                    onRetry={refreshFeed}
                    title="Unable to Load Feed"
                    message={error}
                />
            </div>
        );
    }

    // Empty state
    if (isEmpty) {
        return (
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 sm:pb-32">
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="bg-zinc-900 p-6 rounded-full mb-6 border border-zinc-800">
                        {hasNoListingsAtAll ? (
                            <HomeIcon className="w-12 h-12 text-zinc-500" />
                        ) : (
                            <Search className="w-12 h-12 text-zinc-500" />
                        )}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">
                        {hasNoListingsAtAll ? 'No listings yet' : 'No listings found'}
                    </h3>
                    <p className="text-zinc-400 max-w-md leading-relaxed">
                        {hasNoListingsAtAll
                            ? "There are no listings available at the moment. Be the first to post!"
                            : hasActiveFilters
                                ? "We couldn't find any listings matching your criteria. Try adjusting your filters."
                                : "No listings are currently available. Check back later!"
                        }
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 sm:pb-32">
            {/* Sponsored section */}
            {sponsoredItems.length > 0 && (
                <div className="mb-8 sm:mb-12">
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Featured Listings</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                        {sponsoredItems.map((item) => (
                            <div key={item.id} className="w-full">
                                <ListingCard listing={item} isSponsored />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Regular listings */}
            <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">All Listings</h2>
                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6"
                >
                    <AnimatePresence>
                        {regularItems.map((item) => (
                            <motion.div
                                layout
                                key={item.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className="w-full"
                            >
                                <ListingCard listing={item} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
};

export default FeedSection;