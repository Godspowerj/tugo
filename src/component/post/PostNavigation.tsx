import React from 'react';
import { Check } from 'lucide-react';

interface PostNavigationProps {
    currentStep: number;
    totalSteps: number;
    loading: boolean;
    canProceed: boolean;
    onPrev: () => void;
    onNext: () => void;
    onSubmit: () => void;
    isBusinessAd: boolean;
}

export default function PostNavigation({
    currentStep,
    totalSteps,
    loading,
    canProceed,
    onPrev,
    onNext,
    onSubmit,
    isBusinessAd
}: PostNavigationProps) {
    return (
        <div className="flex items-center justify-between gap-4 mt-6">
            {currentStep > 0 ? (
                <button onClick={onPrev} disabled={loading} className="px-6 py-3 text-gray-400 hover:text-white font-semibold transition-colors disabled:opacity-50">
                    Back
                </button>
            ) : (
                <div />
            )}

            {currentStep < totalSteps - 1 ? (
                <button
                    onClick={onNext}
                    disabled={!canProceed}
                    className={`px-8 py-3.5 rounded-full font-bold transition-all ${canProceed ? 'bg-white text-black hover:bg-gray-100 transform hover:scale-105 active:scale-95' : 'bg-white/20 text-gray-500 cursor-not-allowed'
                        }`}
                >
                    Continue
                </button>
            ) : (
                <button
                    onClick={onSubmit}
                    disabled={loading || !canProceed}
                    className="px-8 py-3.5 bg-white text-black rounded-full font-bold hover:bg-gray-100 transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 flex items-center gap-2"
                >
                    {loading ? (
                        <>
                            <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                            Publishing...
                        </>
                    ) : (
                        <>
                            <Check className="w-5 h-5" />
                            Publish {isBusinessAd ? 'Business Ad' : 'Listing'}
                        </>
                    )}
                </button>
            )}
        </div>
    );
}
