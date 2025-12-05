import React from 'react';
import { WifiOff, RefreshCw } from 'lucide-react';

interface NetworkErrorProps {
    onRetry: () => void;
    title?: string;
    message?: string;
}

const NetworkError: React.FC<NetworkErrorProps> = ({
    onRetry,
    title = "No Connection",
    message = "Unable to connect to the server. Check your internet connection and try again."
}) => {
    return (
        <div className="min-h-[60vh] flex items-center justify-center px-6">
            <div className="max-w-sm w-full text-center">
                {/* Icon */}
                <div className="flex justify-center mb-6">
                    <div className="bg-zinc-900 rounded-full p-6 border border-zinc-800">
                        <WifiOff className="w-12 h-12 text-zinc-500" />
                    </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-3">
                    {title}
                </h3>

                {/* Message */}
                <p className="text-zinc-400 text-base leading-relaxed mb-8">
                    {message}
                </p>

                {/* Retry Button */}
                <button
                    onClick={onRetry}
                    className="w-full bg-white text-black py-4 rounded-2xl font-bold text-base hover:bg-zinc-100 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                    <RefreshCw className="w-5 h-5" />
                    Try Again
                </button>
            </div>
        </div>
    );
};

export default NetworkError;