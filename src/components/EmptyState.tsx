import React from 'react';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
    icon: LucideIcon;
    title: string;
    description: string;
    action?: {
        label: string;
        onClick: () => void;
    };
    secondaryAction?: {
        label: string;
        onClick: () => void;
    };
}

const EmptyState: React.FC<EmptyStateProps> = ({
    icon: Icon,
    title,
    description,
    action,
    secondaryAction
}) => {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            {/* Icon */}
            <div className="relative mb-6">
                <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center">
                    <Icon className="w-12 h-12 text-white/40" />
                </div>
            </div>

            {/* Text */}
            <h3 className="text-2xl font-bold text-white mb-2">
                {title}
            </h3>
            <p className="text-gray-400 max-w-md mb-8">
                {description}
            </p>

            {/* Actions */}
            {(action || secondaryAction) && (
                <div className="flex flex-col sm:flex-row gap-3">
                    {action && (
                        <button
                            onClick={action.onClick}
                            className="flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-black px-6 py-3 rounded-full font-bold transition-all transform hover:scale-105 active:scale-95"
                        >
                            {action.label}
                        </button>
                    )}
                    {secondaryAction && (
                        <button
                            onClick={secondaryAction.onClick}
                            className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 rounded-full font-bold transition-all transform hover:scale-105 active:scale-95"
                        >
                            {secondaryAction.label}
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default EmptyState;
