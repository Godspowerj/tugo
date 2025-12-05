"use client";
import { useAuth } from '@/src/context/authContext';
import MainLayout from '@/src/components/MainLayout';
import PageLoading from '@/src/components/PageLoading';
import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, LogIn, UserPlus } from 'lucide-react';

interface AuthGuardProps {
    children: ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    // Show loading state
    if (isLoading) {
        return (
            <MainLayout fullWidth={true}>
                <PageLoading
                    variant="inline"
                    message="Checking authentication..."
                />
            </MainLayout>
        );
    }

    // Show authentication required
    if (!isAuthenticated) {
        return (
            <MainLayout fullWidth={true}>
                <div className="min-h-[70vh] flex items-center justify-center px-6">
                    <div className="max-w-sm w-full text-center">
                        {/* Icon */}
                        <div className="flex justify-center mb-6">
                            <div className="bg-zinc-900 rounded-full p-6 border border-zinc-800">
                                <Lock className="w-12 h-12 text-zinc-500" />
                            </div>
                        </div>

                        {/* Title */}
                        <h2 className="text-2xl font-bold text-white mb-3">
                            Authentication Required
                        </h2>

                        {/* Message */}
                        <p className="text-zinc-400 text-base leading-relaxed mb-8">
                            You need to be logged in to access this page.
                        </p>

                        {/* Actions */}
                        <div className="space-y-3">
                            <button
                                onClick={() => router.push('/auth/login')}
                                className="w-full bg-white text-black py-4 rounded-2xl font-bold text-base hover:bg-zinc-100 transition-all active:scale-95 flex items-center justify-center gap-2"
                            >
                                <LogIn className="w-5 h-5" />
                                Sign In
                            </button>
                            <button
                                onClick={() => router.push('/auth/register')}
                                className="w-full bg-zinc-800 text-white py-4 rounded-2xl font-bold text-base hover:bg-zinc-700 transition-all active:scale-95 flex items-center justify-center gap-2"
                            >
                                <UserPlus className="w-5 h-5" />
                                Create Account
                            </button>
                        </div>
                    </div>
                </div>
            </MainLayout>
        );
    }

    // User is authenticated, render children
    return <>{children}</>;
}
