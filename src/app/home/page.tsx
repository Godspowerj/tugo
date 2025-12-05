"use client"
import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import MainLayout from '@/src/components/MainLayout';
import HomeHeader from '@/src/components/home/HomeHeader';
import HomeFilters from '@/src/components/home/HomeFilters';
import FeedSection from '@/src/components/home/FeedSection';
import AIChatAssistant from '@/src/components/home/AIChatAssistant';
import { CardSkeleton } from '@/src/components/PageLoading';
import { useHome } from '@/src/context/HomeContext';
import AuthGuard from '@/src/components/AuthGuard';

const TugoExplorePage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { loading, showFilters, refreshFeed } = useHome();

  // Auto-refresh feed when returning from post creation
  useEffect(() => {
    const shouldRefresh = searchParams.get('refresh');
    if (shouldRefresh === 'true') {
      refreshFeed();
      // Clean up URL
      router.replace('/home');
    }
  }, [searchParams, refreshFeed, router]);

  return (
    <AuthGuard>
      <MainLayout fullWidth={true}>
        <div className="min-h-screen bg-black text-white overflow-x-hidden font-['Plus_Jakarta_Sans',sans-serif]">
          <HomeHeader />

          {showFilters && <HomeFilters />}

          {loading ? (
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 sm:pb-32">
              <CardSkeleton count={6} />
            </div>
          ) : (
            <FeedSection />
          )}

          <AIChatAssistant />

          <style jsx global>{`
            @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700;800&display=swap');
            
            /* Prevent horizontal scroll */
            html, body {
              overflow-x: hidden;
              max-width: 100vw;
            }
            
            /* Ensure all containers respect viewport width */
            * {
              box-sizing: border-box;
            }
          `}</style>
        </div>
      </MainLayout>
    </AuthGuard>
  );
};

export default TugoExplorePage;