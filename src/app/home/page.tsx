"use client"
import React from 'react';
import MainLayout from '@/src/component/MainLayout';
import HomeHeader from '@/src/component/home/HomeHeader';
import HomeFilters from '@/src/component/home/HomeFilters';
import FeedSection from '@/src/component/home/FeedSection';
import AIChatAssistant from '@/src/component/home/AIChatAssistant';
import { Skeleton } from '@/src/component/ui/Skeleton';
import { useHome } from '@/src/context/HomeContext';
import AuthGuard from '@/src/component/AuthGuard';

const TugoExplorePage: React.FC = () => {
  const { loading, showFilters } = useHome();

  return (
    <AuthGuard>
      <MainLayout fullWidth={true}>
        <div className="min-h-screen bg-black text-white overflow-x-hidden font-['Plus_Jakarta_Sans',sans-serif]">
          {/* Background gradients - adjusted for mobile */}
          {/* <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div> */}

          <HomeHeader />

          {showFilters && <HomeFilters />}

          {loading ? (
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 sm:pb-32">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="space-y-4 w-full">
                    <Skeleton className="h-48 sm:h-56 md:h-64 w-full rounded-2xl" />
                    <div className="space-y-2 px-1">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
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