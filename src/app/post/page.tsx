"use client"
import React from 'react';
import MainLayout from '@/src/component/MainLayout';
import { useRouter } from 'next/navigation';
import { usePost } from '@/src/context/PostContext';
import AuthGuard from '@/src/component/AuthGuard';

// Imports for components
import PostHeader from '@/src/component/post/PostHeader';
import PostNavigation from '@/src/component/post/PostNavigation';
import CategorySelection from '@/src/component/post/CategorySelection';
import MediaContact from '@/src/component/post/MediaContact';

// Student Components
import ListingTypeSelection from '@/src/component/post/ListingTypeSelection';
import StudentBasicInfo from '@/src/component/post/StudentBasicInfo';
import StudentLocationPrice from '@/src/component/post/StudentLocationPrice';
import StudentBoost from '@/src/component/post/StudentBoost';
import StudentReview from '@/src/component/post/StudentReview';

// Business Components
import BusinessTypeSelection from '@/src/component/post/BusinessTypeSelection';
import BusinessInfo from '@/src/component/post/BusinessInfo';
import BusinessLocationTarget from "@/src/component/post/BusinessLocationTarget"
import BusinessSpecialOffers from '@/src/component/post/BusinessSpecialOffers';
import BusinessPackages from '@/src/component/post/BusinessPackages';
import BusinessReview from '@/src/component/post/BusinessReview';

const SPONSORED_PACKAGES = [
  {
    id: 'basic',
    name: 'Basic Boost',
    duration: '7 days',
    price: 2500,
    features: ['Top placement', '3x more views', 'Featured badge'],
    recommended: false
  },
  {
    id: 'premium',
    name: 'Premium',
    duration: '14 days',
    price: 4500,
    features: ['Top placement', '5x more views', 'Featured badge', 'Highlighted in search'],
    recommended: true,
    savings: '₦500 off'
  },
  {
    id: 'ultimate',
    name: 'Ultimate',
    duration: '30 days',
    price: 8000,
    features: ['Top placement', '10x more views', 'Featured badge', 'Highlighted in search', 'Priority support', 'Social media feature'],
    recommended: false,
    savings: '₦1,500 off'
  }
];

export default function UnifiedPostPage() {
  const router = useRouter();
  const {
    currentStep,
    steps,
    isStudentListing,
    isBusinessAd
  } = usePost();

  return (
    <AuthGuard>
      <MainLayout fullWidth={true}>
        <PostHeader
          onBack={() => router.back()}
        />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="md:p-8 min-h-[500px]">

            {/* Step 0: Choose Category */}
            {currentStep === 0 && (
              <CategorySelection />
            )}

            {/* Student Listing Steps */}
            {isStudentListing && (
              <>
                {currentStep === 1 && (
                  <ListingTypeSelection />
                )}
                {currentStep === 2 && (
                  <StudentBasicInfo />
                )}
                {currentStep === 3 && (
                  <StudentLocationPrice />
                )}
                {currentStep === 5 && (
                  <StudentBoost packages={SPONSORED_PACKAGES} />
                )}
                {currentStep === 6 && (
                  <StudentReview packages={SPONSORED_PACKAGES} />
                )}
              </>
            )}

            {/* Business Ad Steps */}
            {isBusinessAd && (
              <>
                {currentStep === 1 && (
                  <BusinessTypeSelection />
                )}
                {currentStep === 2 && (
                  <BusinessInfo />
                )}
                {currentStep === 3 && (
                  <BusinessLocationTarget />
                )}
                {currentStep === 5 && (
                  <BusinessSpecialOffers />
                )}
                {currentStep === 6 && (
                  <BusinessPackages packages={SPONSORED_PACKAGES} />
                )}
                {currentStep === 7 && (
                  <BusinessReview packages={SPONSORED_PACKAGES} />
                )}
              </>
            )}

            {/* Shared: Media & Contact */}
            {((isStudentListing && currentStep === 4) || (isBusinessAd && currentStep === 4)) && (
              <MediaContact />
            )}
          </div>

          <PostNavigation />
        </div>

        <style jsx>{`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in { animation: fade-in 0.3s ease-out; }
        `}</style>
      </MainLayout>
    </AuthGuard>
  );
}