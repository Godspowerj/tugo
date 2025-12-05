import { usePost } from '@/src/context/PostContext';

export const usePostValidation = () => {
    const { studentListingData, currentStep } = usePost();

    const validateStep = (step: number): boolean => {
        switch (step) {
            case 0:
                return studentListingData.listingType !== '';
            case 1:
                return studentListingData.title.length >= 10 &&
                    studentListingData.description.length >= 50;
            case 2:
                return !!(studentListingData.price &&
                    studentListingData.university &&
                    studentListingData.location &&
                    studentListingData.availableFrom);
            case 3:
                return studentListingData.images.length > 0 &&
                    studentListingData.phoneNumber.length >= 10;
            default:
                return true;
        }
    };

    const getValidationErrors = (step: number): string[] => {
        const errors: string[] = [];

        switch (step) {
            case 0:
                if (!studentListingData.listingType) errors.push('Please select a listing type');
                break;
            case 1:
                if (studentListingData.title.length < 10) errors.push('Title must be at least 10 characters');
                if (studentListingData.description.length < 50) errors.push('Description must be at least 50 characters');
                break;
            case 2:
                if (!studentListingData.price) errors.push('Price is required');
                if (!studentListingData.university) errors.push('University is required');
                if (!studentListingData.location) errors.push('Location is required');
                if (!studentListingData.availableFrom) errors.push('Available from date is required');
                break;
            case 3:
                if (studentListingData.images.length === 0) errors.push('At least one image is required');
                if (studentListingData.phoneNumber.length < 10) errors.push('Valid phone number is required');
                break;
        }

        return errors;
    };

    return {
        validateStep,
        getValidationErrors,
        isCurrentStepValid: validateStep(currentStep),
    };
};
