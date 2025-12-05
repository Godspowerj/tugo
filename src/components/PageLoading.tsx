'use client';

import React from 'react';

interface PageLoadingProps {
    variant?: 'fullscreen' | 'inline' | 'overlay';
    message?: string;
}

/**
 * Simple and classy loading component for Tugo
 * 
 * @example
 * <PageLoading variant="fullscreen" message="Loading..." />
 * <PageLoading variant="inline" />
 * <PageLoading variant="overlay" message="Saving..." />
 */
export default function PageLoading({
    variant = 'fullscreen',
    message = 'Loading...'
}: PageLoadingProps) {
    const LoaderContent = () => (
        <div className="text-center">
            {/* Simple Spinner */}
            <div className="w-12 h-12 border-4 border-zinc-800 border-t-white rounded-full animate-spin mx-auto mb-4"></div>

            {/* Message */}
            {message && (
                <p className="text-white text-base font-medium">{message}</p>
            )}
        </div>
    );

    // Full screen
    if (variant === 'fullscreen') {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <LoaderContent />
            </div>
        );
    }

    // Inline
    if (variant === 'inline') {
        return (
            <div className="flex items-center justify-center py-20">
                <LoaderContent />
            </div>
        );
    }

    // Overlay
    if (variant === 'overlay') {
        return (
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
                <LoaderContent />
            </div>
        );
    }

    return null;
}

/**
 * Skeleton loader for listing cards - matches ListingCard structure
 */
export function CardSkeleton({ count = 4 }: { count?: number }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {Array.from({ length: count }).map((_, i) => (
                <div
                    key={i}
                    className="w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-zinc-900/50 border border-zinc-800 animate-pulse"
                >
                    {/* Image Section - matches the card's image area */}
                    <div className="relative h-64 sm:h-72 md:h-80 lg:h-96 bg-zinc-800">
                        {/* Gradient overlay skeleton */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                        {/* Bottom overlay with poster info skeleton */}
                        <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2 sm:gap-3">
                                {/* Avatar skeleton */}
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-zinc-700 rounded-full"></div>
                                <div className="space-y-1.5">
                                    {/* Name skeleton */}
                                    <div className="h-4 w-24 bg-zinc-700 rounded"></div>
                                    {/* Verified badge skeleton */}
                                    <div className="h-3 w-20 bg-zinc-700/60 rounded"></div>
                                </div>
                            </div>
                            {/* Type badge skeleton */}
                            <div className="h-8 w-16 sm:w-24 bg-zinc-700 rounded-full"></div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-4 sm:p-5 md:p-6 space-y-3 sm:space-y-4">
                        {/* Title and price row */}
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 space-y-2">
                                <div className="h-5 sm:h-6 w-3/4 bg-zinc-800 rounded"></div>
                            </div>
                            <div className="text-right space-y-1.5">
                                <div className="h-6 sm:h-7 w-24 bg-zinc-800 rounded"></div>
                                <div className="h-3 w-16 bg-zinc-800/60 rounded"></div>
                            </div>
                        </div>

                        {/* Description skeleton */}
                        <div className="space-y-2">
                            <div className="h-4 w-full bg-zinc-800 rounded"></div>
                            <div className="h-4 w-5/6 bg-zinc-800 rounded"></div>
                        </div>

                        {/* Details skeleton */}
                        <div className="space-y-2">
                            <div className="h-4 w-40 bg-zinc-800/70 rounded"></div>
                            <div className="flex items-center justify-between">
                                <div className="h-4 w-28 bg-zinc-800/70 rounded"></div>
                                <div className="h-4 w-24 bg-zinc-800/70 rounded"></div>
                            </div>
                        </div>

                        {/* Contact button skeleton */}
                        <div className="pt-3 sm:pt-4">
                            <div className="h-11 sm:h-12 w-full bg-zinc-800 rounded-full"></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}