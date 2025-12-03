"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UIContextType {
    // Global Loading
    globalLoading: boolean;
    setGlobalLoading: (loading: boolean) => void;

    // Theme (for future use)
    theme: 'dark' | 'light';
    toggleTheme: () => void;

    // Modal Management
    activeModal: string | null;
    openModal: (modalId: string) => void;
    closeModal: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [globalLoading, setGlobalLoading] = useState(false);
    const [theme, setTheme] = useState<'dark' | 'light'>('dark');
    const [activeModal, setActiveModal] = useState<string | null>(null);

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    const openModal = (modalId: string) => {
        setActiveModal(modalId);
    };

    const closeModal = () => {
        setActiveModal(null);
    };

    const contextValue: UIContextType = {
        globalLoading,
        setGlobalLoading,
        theme,
        toggleTheme,
        activeModal,
        openModal,
        closeModal,
    };

    return (
        <UIContext.Provider value={contextValue}>
            {children}
        </UIContext.Provider>
    );
};

// Custom hook
export const useUI = () => {
    const context = useContext(UIContext);
    if (context === undefined) {
        throw new Error('useUI must be used within a UIProvider');
    }
    return context;
};
