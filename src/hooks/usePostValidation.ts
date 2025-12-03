import { usePost } from '@/src/context/PostContext';

export const usePostValidation = () => {
    const { studentListingData, businessAdData, isStudentListing, currentStep } = usePost();

    const validateStep = (step: number): boolean => {
        if (isStudentListing) {
            switch (step) {
                case 1:
                    return studentListingData.listingType !== '';
                case 2:
                    return studentListingData.title.length >= 10 &&
                        studentListingData.description.length >= 50;
                case 3:
                    return !!(studentListingData.price &&
                        studentListingData.university &&
                        studentListingData.location &&
                        studentListingData.availableFrom);
                case 4:
                    return studentListingData.images.length > 0 &&
                        studentListingData.phoneNumber.length >= 10;
                default:
                    return true;
            }
        } else {
            switch (step) {
                case 1:
                    return businessAdData.businessType !== '';
                case 2:
                    return businessAdData.businessName.length >= 3 &&
                        businessAdData.description.length >= 50;
                case 3:
                    return !!(businessAdData.location && businessAdData.targetUniversity);
                case 4:
                    return businessAdData.images.length > 0 &&
                        businessAdData.phoneNumber.length >= 10;
                default:
                    return true;
            }
        }
    };

    const getValidationErrors = (step: number): string[] => {
        const errors: string[] = [];

        if (isStudentListing) {
            switch (step) {
                case 1:
                    if (!studentListingData.listingType) errors.push('Please select a listing type');
                    break;
                case 2:
                    if (studentListingData.title.length < 10) errors.push('Title must be at least 10 characters');
                    if (studentListingData.description.length < 50) errors.push('Description must be at least 50 characters');
                    break;
                case 3:
                    if (!studentListingData.price) errors.push('Price is required');
                    if (!studentListingData.university) errors.push('University is required');
                    if (!studentListingData.location) errors.push('Location is required');
                    if (!studentListingData.availableFrom) errors.push('Available from date is required');
                    break;
                case 4:
                    if (studentListingData.images.length === 0) errors.push('At least one image is required');
                    if (studentListingData.phoneNumber.length < 10) errors.push('Valid phone number is required');
                    break;
            }
        } else {
            switch (step) {
                case 1:
                    if (!businessAdData.businessType) errors.push('Please select a business type');
                    break;
                case 2:
                    if (businessAdData.businessName.length < 3) errors.push('Business name must be at least 3 characters');
                    if (businessAdData.description.length < 50) errors.push('Description must be at least 50 characters');
                    break;
                case 3:
                    if (!businessAdData.location) errors.push('Location is required');
                    if (!businessAdData.targetUniversity) errors.push('Target university is required');
                    break;
                case 4:
                    if (businessAdData.images.length === 0) errors.push('At least one image is required');
                    if (businessAdData.phoneNumber.length < 10) errors.push('Valid phone number is required');
                    break;
            }
        }

        return errors;
    };

    return {
        validateStep,
        getValidationErrors,
        isCurrentStepValid: validateStep(currentStep),
    };
};
