'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
    WifiOff,
    AlertTriangle,
    FileQuestion,
    Lock,
    ServerCrash,
    RefreshCw,
    Home,
    ArrowLeft
} from 'lucide-react';

type ErrorType = 'network' | 'notFound' | 'unauthorized' | 'server' | 'generic';

interface ErrorPageProps {
    type?: ErrorType;
    title?: string;
    message?: string;
    onRetry?: () => void;
    showHomeButton?: boolean;
    showBackButton?: boolean;
}

/**
 * Simple and clean error page for Tugo
 * 
 * @example
 * <ErrorPage type="network" onRetry={refetch} />
 * <ErrorPage type="notFound" showHomeButton />
 * <ErrorPage type="server" onRetry={refetch} />
 */
export default function ErrorPage({
    type = 'generic',
    title,
    message,
    onRetry,
    showHomeButton = true,
    showBackButton = false,
}: ErrorPageProps) {
    const router = useRouter();

    const errorConfigs = {
        network: {
            icon: WifiOff,
            title: 'No Connection',
            message: "Unable to connect. Check your internet and try again."
        },
        notFound: {
            icon: FileQuestion,
            title: 'Page Not Found',
            message: "The page you're looking for doesn't exist."
        },
        unauthorized: {
            icon: Lock,
            title: 'Access Denied',
            message: "You don't have permission to view this page."
        },
        server: {
            icon: ServerCrash,
            title: 'Server Error',
            message: 'Something went wrong. Please try again.'
        },
        generic: {
            icon: AlertTriangle,
            title: 'Something Went Wrong',
            message: 'An error occurred. Please try again.'
        }
    };

    const config = errorConfigs[type];
    const Icon = config.icon;
    const displayTitle = title || config.title;
    const displayMessage = message || config.message;

    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-6">
            <div className="max-w-sm w-full text-center">
                {/* Icon */}
                <div className="flex justify-center mb-6">
                    <div className="bg-zinc-900 rounded-full p-6 border border-zinc-800">
                        <Icon className="w-12 h-12 text-zinc-500" />
                    </div>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-white mb-3">
                    {displayTitle}
                </h2>

                {/* Message */}
                <p className="text-zinc-400 text-base leading-relaxed mb-8">
                    {displayMessage}
                </p>

                {/* Actions */}
                <div className="space-y-3">
                    {onRetry && (
                        <button
                            onClick={onRetry}
                            className="w-full bg-white text-black py-4 rounded-2xl font-bold text-base hover:bg-zinc-100 transition-all active:scale-95 flex items-center justify-center gap-2"
                        >
                            <RefreshCw className="w-5 h-5" />
                            Try Again
                        </button>
                    )}

                    <div className="flex gap-3">
                        {showBackButton && (
                            <button
                                onClick={() => router.back()}
                                className="flex-1 bg-zinc-800 text-white py-4 rounded-2xl font-bold text-base hover:bg-zinc-700 transition-all active:scale-95 flex items-center justify-center gap-2"
                            >
                                <ArrowLeft className="w-5 h-5" />
                                Back
                            </button>
                        )}

                        {showHomeButton && (
                            <button
                                onClick={() => router.push('/home')}
                                className={`${showBackButton ? 'flex-1' : 'w-full'} bg-zinc-800 text-white py-4 rounded-2xl font-bold text-base hover:bg-zinc-700 transition-all active:scale-95 flex items-center justify-center gap-2`}
                            >
                                <Home className="w-5 h-5" />
                                Home
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

/**
 * Inline error message
 */
export function InlineError({ message }: { message: string }) {
    return (
        <div className="flex items-center gap-2 text-red-400 text-sm p-3 bg-red-500/10 border border-red-500/30 rounded-xl">
            <AlertTriangle className="w-4 h-4" />
            <span>{message}</span>
        </div>
    );
}