"use client";
import React from "react";
import BottomNav from "@/src/component/navigation";

interface MainLayoutProps {
    children: React.ReactNode;
    showNav?: boolean;
    className?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({
    children,
    showNav = true,
    className = "",
}) => {
    return (
        <div className="relative min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white overflow-x-hidden">
            {/* Ambient Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                {/* Gradient orbs */}
                <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] animate-float" />
                <div className="absolute bottom-20 right-10 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] animate-float-delayed" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 flex flex-col min-h-screen">
                {/* Main Content */}
                <main
                    className={`
                        flex-1 
                        ${showNav ? 'pb-28' : 'pb-8'}
                        ${className}
                    `}
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {children}
                    </div>
                </main>

                {/* Bottom Navigation */}
                {showNav && <BottomNav />}
            </div>

            {/* Global Styles */}
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700;800&display=swap');
                
                * {
                    font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
                }

                /* Smooth animations */
                @keyframes float {
                    0%, 100% { 
                        transform: translate(0, 0) scale(1);
                        opacity: 0.3;
                    }
                    33% { 
                        transform: translate(30px, -30px) scale(1.1);
                        opacity: 0.4;
                    }
                    66% { 
                        transform: translate(-20px, 20px) scale(0.9);
                        opacity: 0.35;
                    }
                }

                @keyframes float-delayed {
                    0%, 100% { 
                        transform: translate(0, 0) scale(1);
                        opacity: 0.25;
                    }
                    33% { 
                        transform: translate(-40px, 30px) scale(1.15);
                        opacity: 0.35;
                    }
                    66% { 
                        transform: translate(25px, -25px) scale(0.95);
                        opacity: 0.3;
                    }
                }

                .animate-float {
                    animation: float 20s ease-in-out infinite;
                }

                .animate-float-delayed {
                    animation: float-delayed 25s ease-in-out infinite;
                }

                /* Smooth scrolling */
                html {
                    scroll-behavior: smooth;
                }

                /* Hide scrollbar while maintaining functionality */
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }

                /* iOS safe area support */
                @supports (padding-bottom: env(safe-area-inset-bottom)) {
                    .safe-bottom {
                        padding-bottom: calc(1.5rem + env(safe-area-inset-bottom));
                    }
                }

                /* Prevent text selection on UI elements */
                button, nav {
                    -webkit-user-select: none;
                    user-select: none;
                }

                /* Better tap targets for mobile */
                @media (hover: none) and (pointer: coarse) {
                    button, a {
                        min-height: 44px;
                        min-width: 44px;
                    }
                }
            `}</style>
        </div>
    );
};

export default MainLayout;