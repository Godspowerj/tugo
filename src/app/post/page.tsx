"use client"
import React from 'react';
import MainLayout from '@/src/components/MainLayout';
import { useRouter } from 'next/navigation';
import { usePost } from '@/src/context/PostContext';
import AuthGuard from '@/src/components/AuthGuard';

// Imports for components
import PostHeader from '@/src/components/post/PostHeader';
import PostNavigation from '@/src/components/post/PostNavigation';
import MediaContact from '@/src/components/post/MediaContact';

// Student Components
import ListingTypeSelection from '@/src/components/post/ListingTypeSelection';
import StudentBasicInfo from '@/src/components/post/StudentBasicInfo';
import StudentLocationPrice from '@/src/components/post/StudentLocationPrice';
import StudentBoost from '@/src/components/post/StudentBoost';
import StudentReview from '@/src/components/post/StudentReview';

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

export default function PostPage() {
  const router = useRouter();
  const { currentStep } = usePost();

  return (
    <AuthGuard>
      <MainLayout fullWidth={true}>
        <PostHeader
          onBack={() => router.back()}
        />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="md:p-8 min-h-[500px]">

            {/* Step 0: Choose Listing Type */}
            {currentStep === 0 && (
              <ListingTypeSelection />
            )}

            {/* Step 1: Basic Info */}
            {currentStep === 1 && (
              <StudentBasicInfo />
            )}

            {/* Step 2: Location & Price */}
            {currentStep === 2 && (
              <StudentLocationPrice />
            )}

            {/* Step 3: Media & Contact */}
            {currentStep === 3 && (
              <MediaContact />
            )}

            {/* Step 4: Boost */}
            {currentStep === 4 && (
              <StudentBoost packages={SPONSORED_PACKAGES} />
            )}

            {/* Step 5: Review */}
            {currentStep === 5 && (
              <StudentReview packages={SPONSORED_PACKAGES} />
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