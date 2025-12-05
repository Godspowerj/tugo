"use client";
import { useAuth } from '@/src/context/authContext';
import MainLayout from '@/src/components/MainLayout';
import PageLoading from '@/src/components/PageLoading';
import ErrorPage from '@/src/components/ErrorPage';
import { ReactNode } from 'react';

interface AuthGuardProps {
    children: ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
    const { isAuthenticated, isLoading } = useAuth();

    // Show loading state using unified PageLoading component
    if (isLoading) {
        return (
            <MainLayout fullWidth={true}>
                <PageLoading
                    variant="inline"
                    message="Checking authentication..."
                    size="md"
                    showBranding={false}
                />
            </MainLayout>
        );
    }

    // Show authentication required using unified ErrorPage component
    if (!isAuthenticated) {
        return (
            <MainLayout fullWidth={true}>
                <ErrorPage
                    type="unauthorized"
                    variant="inline"
                    title="Authentication Required"
                    message="You need to be logged in to access this page. Please sign in or create an account to continue."
                    showHomeButton={false}
                    showLoginButton
                />
            </MainLayout>
        );
    }

    // User is authenticated, render children
    return <>{children}</>;
}
