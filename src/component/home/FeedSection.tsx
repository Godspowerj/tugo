// FeedSection.tsx - Fixed
import React from 'react';
import ListingCard from './ListingCard';
import BusinessAdCard from './BusinessAdCard';
import { FeedItem } from '@/src/lib/mockData';
import { motion, AnimatePresence } from 'framer-motion';

interface FeedSectionProps {
    sponsoredItems: FeedItem[];
    regularItems: FeedItem[];
}

const FeedSection: React.FC<FeedSectionProps> = ({ sponsoredItems, regularItems }) => {
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