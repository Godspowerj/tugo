"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { profileApi, ProfileResponse } from '@/src/api/profileApi';
import { toast } from 'sonner';

interface ProfileContextType {
    // Profile Data
    currentProfile: ProfileResponse | null;
    setCurrentProfile: (profile: ProfileResponse | null) => void;

    // Edit Modal
    isEditModalOpen: boolean;
    openEditModal: () => void;
    closeEditModal: () => void;

    // Profile Operations
    fetchProfile: () => Promise<void>;
    updateProfile: (updatedProfile: ProfileResponse) => void;
    uploadProfilePicture: (formData: FormData) => Promise<void>;

    // Loading States
    loading: boolean;
    uploading: boolean;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentProfile, setCurrentProfile] = useState<ProfileResponse | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);

    const openEditModal = () => setIsEditModalOpen(true);
    const closeEditModal = () => setIsEditModalOpen(false);

    const fetchProfile = async () => {
        setLoading(true);
        try {
            const response = await profileApi.getProfile();
            if (response.success && response.data) {
                setCurrentProfile(response.data);
            } else {
                toast.error(response.message || 'Failed to fetch profile');
            }
        } catch (error: any) {
            console.error('Error fetching profile:', error);
            toast.error('Failed to load profile');
        } finally {
            setLoading(false);
        }
    };

    const updateProfile = (updatedProfile: ProfileResponse) => {
        setCurrentProfile(updatedProfile);
    };

    const uploadProfilePicture = async (formData: FormData) => {
        setUploading(true);
        try {
            const response = await profileApi.uploadProfilePicture(formData);
            if (response.success && response.data) {
                toast.success("Profile picture uploaded!");
                setCurrentProfile(response.data.profile);
            } else {
                toast.error(response.message || "Failed to upload image");
            }
        } catch (error) {
            console.error("Upload error:", error);
            toast.error("Failed to upload image");
        } finally {
            setUploading(false);
        }
    };

    const contextValue: ProfileContextType = {
        currentProfile,
        setCurrentProfile,
        isEditModalOpen,
        openEditModal,
        closeEditModal,
        fetchProfile,
        updateProfile,
        uploadProfilePicture,
        loading,
        uploading,
    };

    return (
        <ProfileContext.Provider value={contextValue}>
            {children}
        </ProfileContext.Provider>
    );
};

// Custom hook
export const useProfile = () => {
    const context = useContext(ProfileContext);
    if (context === undefined) {
        throw new Error('useProfile must be used within a ProfileProvider');
    }
    return context;
};
