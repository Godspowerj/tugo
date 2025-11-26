"use client"
import React, { useState } from 'react';
import MainLayout from '@/src/component/MainLayout';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

// Imports for new components
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
import BusinessLocationTarget from '@/src/component/post/BusinessLocationTarget';
import BusinessSpecialOffers from '@/src/component/post/BusinessSpecialOffers';
import BusinessPackages from '@/src/component/post/BusinessPackages';
import BusinessReview from '@/src/component/post/BusinessReview';

// Types
type PostCategory = 'student-listing' | 'business-ad';
type ListingType = 'roommate' | 'bunkmate' | 'rental' | '';
type BusinessType = 'eatery' | 'barber' | 'laundry' | 'store' | 'service' | '';

interface StudentListingData {
  listingType: ListingType;
  title: string;
  description: string;
  price: string;
  priceType: 'monthly' | 'weekly' | 'daily';
  university: string;
  location: string;
  availableFrom: string;
  phoneNumber: string;
  images: File[];
}

interface BusinessAdData {
  businessType: BusinessType;
  businessName: string;
  description: string;
  location: string;
  targetUniversity: string;
  phoneNumber: string;
  website: string;
  priceRange: '₦' | '₦₦' | '₦₦₦';
  ctaText: string;
  ctaLink: string;
  images: File[];
  hasDiscount: boolean;
  discountDetails: string;
}

const VALID_UNIVERSITIES = [
  'All Universities',
  'University of Lagos',
  'University of Ibadan',
  'Obafemi Awolowo University',
  'University of Nigeria',
  'Covenant University',
  'Ahmadu Bello University',
  'Lagos State University',
];

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
  const [postCategory, setPostCategory] = useState<PostCategory | ''>('');
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<string>('');

  const [studentListingData, setStudentListingData] = useState<StudentListingData>({
    listingType: '',
    title: '',
    description: '',
    price: '',
    priceType: 'monthly',
    university: '',
    location: '',
    availableFrom: '',
    phoneNumber: '',
    images: []
  });

  const [businessAdData, setBusinessAdData] = useState<BusinessAdData>({
    businessType: '',
    businessName: '',
    description: '',
    location: '',
    targetUniversity: '',
    phoneNumber: '',
    website: '',
    priceRange: '₦₦',
    ctaText: 'Contact Us',
    ctaLink: '',
    images: [],
    hasDiscount: false,
    discountDetails: ''
  });

  const isStudentListing = postCategory === 'student-listing';
  const isBusinessAd = postCategory === 'business-ad';

  const steps = isStudentListing ? [
    { id: 0, title: 'What to Post', subtitle: 'Choose your category' },
    { id: 1, title: 'Listing Type', subtitle: 'What are you posting?' },
    { id: 2, title: 'Basic Info', subtitle: 'Title and description' },
    { id: 3, title: 'Details', subtitle: 'Location, price & availability' },
    { id: 4, title: 'Media & Contact', subtitle: 'Photos and phone number' },
    { id: 5, title: 'Boost Your Listing', subtitle: 'Get more visibility' },
    { id: 6, title: 'Review & Publish', subtitle: 'Final check' }
  ] : [
    { id: 0, title: 'What to Post', subtitle: 'Choose your category' },
    { id: 1, title: 'Business Type', subtitle: 'What kind of business?' },
    { id: 2, title: 'Business Info', subtitle: 'Name and description' },
    { id: 3, title: 'Location & Target', subtitle: 'Where and who?' },
    { id: 4, title: 'Media & Contact', subtitle: 'Photos and contact info' },
    { id: 5, title: 'Special Offers', subtitle: 'Discounts and promotions' },
    { id: 6, title: 'Advertising Package', subtitle: 'Choose your visibility' },
    { id: 7, title: 'Review & Publish', subtitle: 'Final check' }
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const currentImages = isStudentListing ? studentListingData.images : businessAdData.images;

    if (files.length + currentImages.length > 5) {
      toast.error('Maximum 5 images allowed');
      return;
    }

    const newImages = [...currentImages, ...files];

    if (isStudentListing) {
      setStudentListingData({ ...studentListingData, images: newImages });
    } else {
      setBusinessAdData({ ...businessAdData, images: newImages });
    }

    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    const currentImages = isStudentListing ? studentListingData.images : businessAdData.images;
    const newImages = currentImages.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);

    if (isStudentListing) {
      setStudentListingData({ ...studentListingData, images: newImages });
    } else {
      setBusinessAdData({ ...businessAdData, images: newImages });
    }
    setImagePreviews(newPreviews);
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    if (currentStep === 0) return postCategory !== '';

    if (isStudentListing) {
      switch (currentStep) {
        case 1: return studentListingData.listingType !== '';
        case 2: return studentListingData.title.length >= 10 && studentListingData.description.length >= 50;
        case 3: return !!(studentListingData.price && studentListingData.university && studentListingData.location && studentListingData.availableFrom);
        case 4: return studentListingData.images.length > 0 && studentListingData.phoneNumber.length >= 10;
        case 5: return true; // Sponsorship is optional
        default: return true;
      }
    } else {
      switch (currentStep) {
        case 1: return businessAdData.businessType !== '';
        case 2: return businessAdData.businessName.length >= 3 && businessAdData.description.length >= 50;
        case 3: return !!(businessAdData.location && businessAdData.targetUniversity);
        case 4: return businessAdData.images.length > 0 && businessAdData.phoneNumber.length >= 10;
        case 5: return true; // Offers optional
        case 6: return selectedPackage !== ''; // Must select package for business
        default: return true;
      }
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // TODO: Replace with actual API call
      const dataToSend = isStudentListing ? {
        category: 'student-listing',
        ...studentListingData,
        isSponsored: selectedPackage !== '',
        sponsorshipPackage: selectedPackage
      } : {
        category: 'business-ad',
        ...businessAdData,
        sponsorshipPackage: selectedPackage
      };

      console.log('Submitting:', dataToSend);

      await new Promise(resolve => setTimeout(resolve, 2000));

      toast.success(isBusinessAd ? 'Business ad published! 🎉' : 'Listing published successfully! 🎉');
      router.push('/explore');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to publish. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <PostHeader
        currentStep={currentStep}
        totalSteps={steps.length}
        stepTitle={steps[currentStep].title}
        onBack={() => router.back()}
      />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-b from-white/10 to-white/5 rounded-3xl border border-white/20 p-6 md:p-8 min-h-[500px]">

          {/* Step 0: Choose Category */}
          {currentStep === 0 && (
            <CategorySelection
              postCategory={postCategory}
              setPostCategory={setPostCategory}
            />
          )}

          {/* Student Listing Steps */}
          {isStudentListing && (
            <>
              {currentStep === 1 && (
                <ListingTypeSelection
                  listingType={studentListingData.listingType}
                  setListingType={(type) => setStudentListingData({ ...studentListingData, listingType: type })}
                />
              )}
              {currentStep === 2 && (
                <StudentBasicInfo
                  title={studentListingData.title}
                  setTitle={(title) => setStudentListingData({ ...studentListingData, title })}
                  description={studentListingData.description}
                  setDescription={(description) => setStudentListingData({ ...studentListingData, description })}
                />
              )}
              {currentStep === 3 && (
                <StudentLocationPrice
                  data={studentListingData}
                  setData={(data) => setStudentListingData({ ...studentListingData, ...data })}
                  validUniversities={VALID_UNIVERSITIES}
                />
              )}
              {currentStep === 5 && (
                <StudentBoost
                  selectedPackage={selectedPackage}
                  setSelectedPackage={setSelectedPackage}
                  packages={SPONSORED_PACKAGES}
                />
              )}
              {currentStep === 6 && (
                <StudentReview
                  data={studentListingData}
                  imagePreviews={imagePreviews}
                  selectedPackage={selectedPackage}
                  packages={SPONSORED_PACKAGES}
                />
              )}
            </>
          )}

          {/* Business Ad Steps */}
          {isBusinessAd && (
            <>
              {currentStep === 1 && (
                <BusinessTypeSelection
                  businessType={businessAdData.businessType}
                  setBusinessType={(type) => setBusinessAdData({ ...businessAdData, businessType: type })}
                />
              )}
              {currentStep === 2 && (
                <BusinessInfo
                  businessName={businessAdData.businessName}
                  setBusinessName={(name) => setBusinessAdData({ ...businessAdData, businessName: name })}
                  description={businessAdData.description}
                  setDescription={(desc) => setBusinessAdData({ ...businessAdData, description: desc })}
                />
              )}
              {currentStep === 3 && (
                <BusinessLocationTarget
                  data={businessAdData}
                  setData={(data) => setBusinessAdData({ ...businessAdData, ...data })}
                  validUniversities={VALID_UNIVERSITIES}
                />
              )}
              {currentStep === 5 && (
                <BusinessSpecialOffers
                  hasDiscount={businessAdData.hasDiscount}
                  setHasDiscount={(has) => setBusinessAdData({ ...businessAdData, hasDiscount: has })}
                  discountDetails={businessAdData.discountDetails}
                  setDiscountDetails={(details) => setBusinessAdData({ ...businessAdData, discountDetails: details })}
                />
              )}
              {currentStep === 6 && (
                <BusinessPackages
                  selectedPackage={selectedPackage}
                  setSelectedPackage={setSelectedPackage}
                  packages={SPONSORED_PACKAGES}
                />
              )}
              {currentStep === 7 && (
                <BusinessReview
                  data={businessAdData}
                  imagePreviews={imagePreviews}
                  selectedPackage={selectedPackage}
                  packages={SPONSORED_PACKAGES}
                />
              )}
            </>
          )}

          {/* Shared: Media & Contact */}
          {((isStudentListing && currentStep === 4) || (isBusinessAd && currentStep === 4)) && (
            <MediaContact
              images={isStudentListing ? studentListingData.images : businessAdData.images}
              phoneNumber={isStudentListing ? studentListingData.phoneNumber : businessAdData.phoneNumber}
              setPhoneNumber={(phone) => isStudentListing
                ? setStudentListingData({ ...studentListingData, phoneNumber: phone })
                : setBusinessAdData({ ...businessAdData, phoneNumber: phone })
              }
              handleImageUpload={handleImageUpload}
              removeImage={removeImage}
              imagePreviews={imagePreviews}
              isStudentListing={isStudentListing}
            />
          )}
        </div>

        <PostNavigation
          currentStep={currentStep}
          totalSteps={steps.length}
          loading={loading}
          canProceed={canProceed()}
          onPrev={handlePrev}
          onNext={handleNext}
          onSubmit={handleSubmit}
          isBusinessAd={isBusinessAd}
        />
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out; }
      `}</style>
    </MainLayout>
  );
}