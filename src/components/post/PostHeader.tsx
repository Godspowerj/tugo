import React from 'react';
import { X } from 'lucide-react';
import { usePost } from '@/src/context/PostContext';

interface PostHeaderProps {
    onBack: () => void;
}

export default function PostHeader({ onBack }: PostHeaderProps) {
    const { currentStep, steps } = usePost();

    return (
        <header className="sticky top-0 z-10 bg-black/80 backdrop-blur-xl border-b border-white/10">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-2xl font-black">Create Post</h1>
                        <p className="text-sm text-gray-400 mt-1">
                            Step {currentStep + 1} of {steps.length} - {steps[currentStep].title}
                        </p>
                    </div>
                    <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full transition">
                        <X className="w-6 h-6" />
                    </button>
                </div>
                <div className="flex gap-2">
                    {Array.from({ length: steps.length }).map((_, idx) => (
                        <div key={idx} className={`flex-1 h-2 rounded-full transition-all ${idx <= currentStep ? 'bg-white' : 'bg-white/20'}`} />
                    ))}
                </div>
            </div>
        </header>
    );
}
