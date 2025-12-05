"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

// Types
type ListingType = 'roommate' | 'bunkmate' | 'rental' | '';

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

interface PostContextType {
    // Step
    currentStep: number;
    setCurrentStep: (step: number) => void;

    // Student Listing Data
    studentListingData: StudentListingData;
    updateStudentListing: (data: Partial<StudentListingData>) => void;

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
    steps: Array<{ id: number; title: string; subtitle: string }>;

    // Reset
    resetForm: () => void;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

/**
 * List of valid universities in Nigeria
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

    const steps = [
        { id: 0, title: 'Listing Type', subtitle: 'What are you posting?' },
        { id: 1, title: 'Basic Info', subtitle: 'Title and description' },
        { id: 2, title: 'Details', subtitle: 'Location, price & availability' },
        { id: 3, title: 'Media & Contact', subtitle: 'Photos and phone number' },
        { id: 4, title: 'Boost Your Listing', subtitle: 'Get more visibility' },
        { id: 5, title: 'Review & Publish', subtitle: 'Final check' }
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

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const currentImages = studentListingData.images;

        if (files.length + currentImages.length > 5) {
            toast.error('Maximum 5 images allowed');
            return;
        }

        const newImages = [...currentImages, ...files];
        setStudentListingData({ ...studentListingData, images: newImages });

        files.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviews(prev => [...prev, reader.result as string]);
            };
            reader.readAsDataURL(file);
        });
    };

    const removeImage = (index: number) => {
        const currentImages = studentListingData.images;
        const newImages = currentImages.filter((_, i) => i !== index);
        const newPreviews = imagePreviews.filter((_, i) => i !== index);

        setStudentListingData({ ...studentListingData, images: newImages });
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
        switch (currentStep) {
            case 0: return studentListingData.listingType !== '';
            case 1: return studentListingData.title.length >= 10 && studentListingData.description.length >= 50;
            case 2: return !!(studentListingData.price && studentListingData.university && studentListingData.location && studentListingData.availableFrom);
            case 3: return studentListingData.images.length > 0 && studentListingData.phoneNumber.length >= 10;
            case 4: return true; // Sponsorship is optional
            default: return true;
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            // Upload images to Cloudinary first
            const imageFiles = studentListingData.images;
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

            // Navigate to home and trigger refresh
            router.push('/home?refresh=true');
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
    };

    const contextValue: PostContextType = {
        currentStep,
        setCurrentStep,
        studentListingData,
        updateStudentListing,
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
