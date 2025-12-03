"use client";
import { useAuth } from '@/src/context/authContext';
import MainLayout from '@/src/component/MainLayout';
import Link from 'next/link';
import { ReactNode } from 'react';
import LoadingSpinner from '@/src/component/LoadingSpinner';

interface AuthGuardProps {
    children: ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
    const { isAuthenticated, isLoading } = useAuth();

    // Show loading state
    if (isLoading) {
        return (
            <MainLayout fullWidth={true}>
                <div className="flex items-center justify-center min-h-[80vh]">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                        <p className="text-gray-400">Loading...</p>
                    </div>
                </div>
            </MainLayout>
        );
    }

    // Show authentication required message
    if (!isAuthenticated) {
        return (
            <MainLayout fullWidth={true}>
                <div className="flex items-center justify-center min-h-[80vh] px-4">
                    <div className="max-w-md w-full text-center space-y-6">
                        <div className="bg-white/5 p-6 rounded-full w-20 h-20 mx-auto flex items-center justify-center backdrop-blur-sm">
                            <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-2">Authentication Required</h2>
                            <p className="text-gray-400">
                                You need to be logged in to create a post. Please sign in or create an account to continue.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Link href="/auth/login">
                                <button className="px-6 py-3 bg-white text-black rounded-full font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 active:scale-95 w-full sm:w-auto">
                                    Sign In
                                </button>
                            </Link>
                            <Link href="/auth/register">
                                <button className="px-6 py-3 bg-white/10 text-white rounded-full font-semibold hover:bg-white/20 transition-all border border-white/20 w-full sm:w-auto">
                                    Create Account
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </MainLayout>
        );
    }

    // User is authenticated, render children
    return <>{children}</>;
}
