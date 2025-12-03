"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

// Types
type PostCategory = 'student-listing' | 'business-ad' | '';
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

interface PostContextType {
    // Category & Step
    postCategory: PostCategory;
    setPostCategory: (category: PostCategory) => void;
    currentStep: number;
    setCurrentStep: (step: number) => void;

    // Student Listing Data
    studentListingData: StudentListingData;
    updateStudentListing: (data: Partial<StudentListingData>) => void;

    // Business Ad Data
    businessAdData: BusinessAdData;
    updateBusinessAd: (data: Partial<BusinessAdData>) => void;

    // Images
    imagePreviews: string[];
    handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    removeImage: (index: number) => void;

    // Sponsorship
    selectedPackage: string;
    setSelectedPackage: (pkg: string) => void;

    // Navigation
    handleNext: () => void;
    handlePrev: () => void;
    canProceed: () => boolean;

    // Submit
    loading: boolean;
    handleSubmit: () => Promise<void>;

    // Helpers
    isStudentListing: boolean;
    isBusinessAd: boolean;
    steps: Array<{ id: number; title: string; subtitle: string }>;

    // Reset
    resetForm: () => void;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

/**
 * List of valid universities in Nigeria
 * Used to validate university selection in listings and business ads
 */
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

export const PostProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const router = useRouter();

    const [postCategory, setPostCategory] = useState<PostCategory>('');
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

    /**
     * Update student listing data with validation
     */
    const updateStudentListing = (data: Partial<StudentListingData>) => {
        // Validate university if it's being updated
        if (data.university && data.university !== 'All Universities') {
            if (!VALID_UNIVERSITIES.includes(data.university)) {
                toast.error('Please select a valid university');
                return;
            }
        }
        setStudentListingData(prev => ({ ...prev, ...data }));
    };

    /**
     * Update business ad data with validation
     */
    const updateBusinessAd = (data: Partial<BusinessAdData>) => {
        // Validate university if it's being updated
        if (data.targetUniversity && data.targetUniversity !== 'All Universities') {
            if (!VALID_UNIVERSITIES.includes(data.targetUniversity)) {
                toast.error('Please select a valid university');
                return;
            }
        }
        setBusinessAdData(prev => ({ ...prev, ...data }));
    };

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
            // Upload images to Cloudinary first
            const imageFiles = isStudentListing ? studentListingData.images : businessAdData.images;
            let imageUrls: string[] = [];

            if (imageFiles.length > 0) {
                const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
                const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

                if (cloudName && uploadPreset) {
                    try {
                        toast.info('📸 Uploading images... This may take a moment.');
                        const { uploadMultipleToCloudinary } = await import('@/src/lib/cloudinary');
                        imageUrls = await uploadMultipleToCloudinary(imageFiles);
                        toast.success('✅ Images uploaded successfully!');
                    } catch (uploadError: any) {
                        console.warn('Image upload failed:', uploadError.message);
                        toast.warning('⚠️ Could not upload images. Your post will be created without images. You can add them later.');
                    }
                } else {
                    console.log('Cloudinary credentials missing, skipping upload');
                    toast.info('ℹ️ Image upload is not configured. Your post will be created without images.');
                }
            }

            if (isStudentListing) {
                // Create student listing
                const { listingApi } = await import('@/src/api/listingApi');
                const result = await listingApi.createListing({
                    listingType: studentListingData.listingType as 'roommate' | 'bunkmate' | 'rental',
                    title: studentListingData.title,
                    description: studentListingData.description,
                    price: Number(studentListingData.price),
                    priceType: studentListingData.priceType,
                    university: studentListingData.university,
                    location: studentListingData.location,
                    availableFrom: studentListingData.availableFrom,
                    phoneNumber: studentListingData.phoneNumber,
                    images: imageUrls,
                    isSponsored: selectedPackage !== '',
                    sponsorshipPackage: selectedPackage || undefined,
                });

                if (result.error) {
                    throw new Error(result.error);
                }

                toast.success('Listing published successfully! 🎉');
            } else {
                // Create business ad
                const { businessAdApi } = await import('@/src/api/businessAdApi');
                const result = await businessAdApi.createBusinessAd({
                    businessType: businessAdData.businessType as 'eatery' | 'barber' | 'laundry' | 'store' | 'service',
                    businessName: businessAdData.businessName,
                    description: businessAdData.description,
                    location: businessAdData.location,
                    targetUniversity: businessAdData.targetUniversity,
                    phoneNumber: businessAdData.phoneNumber,
                    website: businessAdData.website || undefined,
                    priceRange: businessAdData.priceRange,
                    ctaText: businessAdData.ctaText,
                    ctaLink: businessAdData.ctaLink || undefined,
                    images: imageUrls,
                    hasDiscount: businessAdData.hasDiscount,
                    discountDetails: businessAdData.discountDetails || undefined,
                    sponsorshipPackage: selectedPackage,
                });

                if (result.error) {
                    throw new Error(result.error);
                }

                toast.success('Business ad published! 🎉');
            }

            router.push('/home');
        } catch (error: any) {
            console.error('Full Error Object:', error);
            console.error('Error Message:', error.message);
            console.error('Error Stack:', error.stack);
            toast.error(error.message || 'Failed to publish. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setPostCategory('');
        setCurrentStep(0);
        setImagePreviews([]);
        setSelectedPackage('');
        setStudentListingData({
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
        setBusinessAdData({
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
    };

    const contextValue: PostContextType = {
        postCategory,
        setPostCategory,
        currentStep,
        setCurrentStep,
        studentListingData,
        updateStudentListing,
        businessAdData,
        updateBusinessAd,
        imagePreviews,
        handleImageUpload,
        removeImage,
        selectedPackage,
        setSelectedPackage,
        handleNext,
        handlePrev,
        canProceed,
        loading,
        handleSubmit,
        isStudentListing,
        isBusinessAd,
        steps,
        resetForm,
    };

    return (
        <PostContext.Provider value={contextValue}>
            {children}
        </PostContext.Provider>
    );
};

// Custom hook
export const usePost = () => {
    const context = useContext(PostContext);
    if (context === undefined) {
        throw new Error('usePost must be used within a PostProvider');
    }
    return context;
};
