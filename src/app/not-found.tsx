'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Home, Search, AlertCircle } from 'lucide-react';

export default function NotFound() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex items-center justify-center p-4">
            <div className="max-w-md w-full text-center space-y-8">
                {/* 404 Icon */}
                <div className="relative">
                    <div className="text-9xl font-black text-white/10">404</div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <AlertCircle className="w-24 h-24 text-white/80" />
                    </div>
                </div>

                {/* Message */}
                <div className="space-y-4">
                    <h1 className="text-4xl font-bold text-white">
                        Page Not Found
                    </h1>
                    <p className="text-lg text-gray-300">
                        Oops! The page you're looking for doesn't exist or has been moved.
                    </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => router.push('/home')}
                        className="flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-black px-6 py-3 rounded-full font-bold transition-all transform hover:scale-105 active:scale-95"
                    >
                        <Home className="w-5 h-5" />
                        <span>Go Home</span>
                    </button>
                    <button
                        onClick={() => router.back()}
                        className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 rounded-full font-bold transition-all transform hover:scale-105 active:scale-95"
                    >
                        <Search className="w-5 h-5" />
                        <span>Go Back</span>
                    </button>
                </div>

                {/* Helpful Links */}
                <div className="pt-8 border-t border-white/10">
                    <p className="text-sm text-gray-400 mb-4">Looking for something specific?</p>
                    <div className="flex flex-wrap gap-3 justify-center">
                        <button
                            onClick={() => router.push('/home')}
                            className="text-sm text-white/70 hover:text-white underline"
                        >
                            Browse Listings
                        </button>
                        <span className="text-white/30">•</span>
                        <button
                            onClick={() => router.push('/post')}
                            className="text-sm text-white/70 hover:text-white underline"
                        >
                            Create Post
                        </button>
                        <span className="text-white/30">•</span>
                        <button
                            onClick={() => router.push('/profile')}
                            className="text-sm text-white/70 hover:text-white underline"
                        >
                            My Profile
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
