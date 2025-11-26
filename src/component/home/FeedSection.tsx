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
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-6 pb-32">
            {sponsoredItems.length > 0 && (
                <div className="mb-12">
                    <h2 className="text-2xl font-black text-white mb-6">Featured Listings</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {sponsoredItems.map((item, idx) => (
                            item.type === 'listing'
                                ? <ListingCard key={item.id} listing={item} isSponsored />
                                : <BusinessAdCard key={item.id} ad={item} isSponsored isCompact={idx % 3 !== 0} />
                        ))}
                    </div>
                </div>
            )}

            <div>
                <h2 className="text-2xl font-black text-white mb-6">All Listings</h2>
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <AnimatePresence>
                        {regularItems.map((item, idx) => (
                            <motion.div
                                layout
                                key={item.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
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
