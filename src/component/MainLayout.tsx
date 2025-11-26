"use client";
import React from "react";
import BottomNav from "@/src/component/navigation";

interface MainLayoutProps {
    children: React.ReactNode;
    showNav?: boolean; // Option to hide nav on certain pages
    className?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({
    children,
    showNav = true,
    className = "",
}) => {
    return (
        <div className="relative min-h-screen bg-black text-white font-['Plus_Jakarta_Sans',sans-serif]">
            {/* Animated Background - consistent across all pages */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
                <div
                    className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"
                    style={{ animationDelay: "1s" }}
                ></div>
            </div>

            {/* Main Content Area */}
            <main
                className={`relative z-10 ${showNav ? "pb-24 sm:pb-28" : "pb-6"
                    } ${className}`}
            >
                {children}
            </main>

            {/* Bottom Navigation */}
            {showNav && <BottomNav />}

            {/* Global Styles */}
            <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700;800&display=swap');
        
        /* Safe area for iOS devices */
        @supports (padding: max(0px)) {
          .safe-area-bottom {
            padding-bottom: max(env(safe-area-inset-bottom), 0px);
          }
        }

        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }

        /* Hide scrollbar but keep functionality */
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        /* Custom animations */
        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
        </div>
    );
};

export default MainLayout;
