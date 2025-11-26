import React from 'react';
import { Home, Store, AlertCircle } from 'lucide-react';

type PostCategory = 'student-listing' | 'business-ad';

interface CategorySelectionProps {
    postCategory: PostCategory | '';
    setPostCategory: (category: PostCategory) => void;
}

export default function CategorySelection({ postCategory, setPostCategory }: CategorySelectionProps) {
    return (
        <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-black mb-2">What would you like to post?</h2>
                <p className="text-gray-400">Choose the type of post you want to create</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button
                    onClick={() => setPostCategory('student-listing')}
                    className={`relative p-8 rounded-2xl border-2 transition-all text-left ${postCategory === 'student-listing'
                            ? 'bg-white text-black border-white'
                            : 'bg-white/5 border-white/10 hover:border-white/30'
                        }`}
                >
                    <div className="absolute top-4 right-4">
                        <Home className="w-8 h-8" />
                    </div>
                    <div className="text-5xl mb-4">🏠</div>
                    <h3 className="font-black text-2xl mb-2">Student Listing</h3>
                    <p className={`text-sm mb-4 ${postCategory === 'student-listing' ? 'text-black/70' : 'text-gray-400'}`}>
                        Post a roommate, bunkmate, or rental listing. Perfect for students looking for accommodation.
                    </p>
                    <div className="flex items-center gap-2 text-xs">
                        <span className={`px-2 py-1 rounded-full ${postCategory === 'student-listing' ? 'bg-black/10' : 'bg-white/10'}`}>
                            Free to post
                        </span>
                        <span className={`px-2 py-1 rounded-full ${postCategory === 'student-listing' ? 'bg-black/10' : 'bg-white/10'}`}>
                            Optional boost
                        </span>
                    </div>
                </button>

                <button
                    onClick={() => setPostCategory('business-ad')}
                    className={`relative p-8 rounded-2xl border-2 transition-all text-left ${postCategory === 'business-ad'
                            ? 'bg-white text-black border-white'
                            : 'bg-white/5 border-white/10 hover:border-white/30'
                        }`}
                >
                    <div className="absolute top-4 right-4 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full p-2">
                        <Store className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-5xl mb-4">💼</div>
                    <h3 className="font-black text-2xl mb-2">Business Ad</h3>
                    <p className={`text-sm mb-4 ${postCategory === 'business-ad' ? 'text-black/70' : 'text-gray-400'}`}>
                        Advertise your business to students. Restaurants, salons, services, and more.
                    </p>
                    <div className="flex items-center gap-2 text-xs">
                        <span className={`px-2 py-1 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold`}>
                            Sponsored
                        </span>
                        <span className={`px-2 py-1 rounded-full ${postCategory === 'business-ad' ? 'bg-black/10' : 'bg-white/10'}`}>
                            Reach thousands
                        </span>
                    </div>
                </button>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 flex gap-3">
                <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-gray-300">
                    <strong className="text-white">Student Listings</strong> are for accommodation (roommates, bunk beds, rentals).
                    <br />
                    <strong className="text-white">Business Ads</strong> are for companies and services targeting students.
                </div>
            </div>
        </div>
    );
}
