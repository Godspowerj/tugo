import React from 'react';
import { AlertCircle } from 'lucide-react';
import { usePost } from '@/src/context/PostContext';

export default function StudentBasicInfo() {
    const { studentListingData, updateStudentListing } = usePost();

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-black mb-2">Basic Information</h2>
                <p className="text-gray-400">Tell us about your listing</p>
            </div>

            <div className="space-y-5">
                <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                        Listing Title *
                    </label>
                    <input
                        type="text"
                        value={studentListingData.title}
                        onChange={(e) => updateStudentListing({ title: e.target.value })}
                        placeholder="e.g., Clean Roommate Needed Near Campus"
                        maxLength={100}
                        className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 outline-none focus:border-white/30 transition-all"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        {studentListingData.title.length}/100 characters (min 10)
                    </p>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                        Description *
                    </label>
                    <textarea
                        value={studentListingData.description}
                        onChange={(e) => updateStudentListing({ description: e.target.value })}
                        placeholder="Describe your space, what you're looking for, amenities, rules, etc..."
                        rows={8}
                        maxLength={1000}
                        className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 outline-none focus:border-white/30 transition-all resize-none"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        {studentListingData.description.length}/1000 characters (min 50)
                    </p>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 flex gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-gray-300">
                        <strong className="text-white">Pro tip:</strong> Include details about location, amenities, your lifestyle, and what you're looking for. Clear descriptions get more responses!
                    </div>
                </div>
            </div>
        </div>
    );
}
