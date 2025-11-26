// components/BottomNav.tsx
// Responsive bottom navigation for Tugo app

"use client";
import React from "react";
import { Search, PlusCircle, User } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

const BottomNav = () => {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    {
      id: "explore",
      label: "Explore",
      path: "/home",
      icon: Search,
    },
    {
      id: "post",
      label: "Post",
      path: "/post",
      icon: PlusCircle,
      isSpecial: true, // Center button with special styling
    },
    {
      id: "profile",
      label: "Profile",
      path: "/profile",
      icon: User,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-t border-white/10 ">
      {/* Gradient overlay for depth */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      
      <div className="max-w-md mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-around py-2 sm:py-3 relative">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            const Icon = item.icon;

            // Special styling for the center Post button
            if (item.isSpecial) {
              return (
                <button
                  key={item.id}
                  onClick={() => router.push(item.path)}
                  className="flex flex-col items-center gap-1 group relative -mt-4 sm:-mt-5"
                  aria-label={item.label}
                >
                  {/* Outer glow effect */}
                  <div className="absolute inset-0 blur-xl bg-white/20 rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Main button */}
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-white to-gray-200 flex items-center justify-center shadow-lg shadow-white/25 group-hover:scale-110 group-active:scale-95 transition-all duration-200">
                    <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-black" strokeWidth={2.5} />
                  </div>
                  
                  {/* Label */}
                  <span className="text-[10px] sm:text-xs font-bold text-white mt-1">
                    {item.label}
                  </span>
                </button>
              );
            }

            // Regular nav items
            return (
              <button
                key={item.id}
                onClick={() => router.push(item.path)}
                className="flex flex-col items-center gap-1.5 sm:gap-2 group min-w-[60px] sm:min-w-[70px] py-2"
                aria-label={item.label}
              >
                {/* Icon wrapper with active state */}
                <div
                  className={`relative w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center transition-all duration-200 ${
                    isActive
                      ? "bg-white scale-105"
                      : "bg-white/5 group-hover:bg-white/10 group-hover:scale-105"
                  }`}
                >
                  {/* Active indicator dot */}
                  {isActive && (
                    <div className="absolute -top-1 right-1/2 translate-x-1/2 w-1 h-1 rounded-full bg-white animate-pulse" />
                  )}
                  
                  <Icon
                    className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-200 ${
                      isActive
                        ? "text-black"
                        : "text-gray-400 group-hover:text-white"
                    }`}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                </div>

                {/* Label */}
                <span
                  className={`text-[10px] sm:text-xs font-semibold transition-colors duration-200 ${
                    isActive
                      ? "text-white"
                      : "text-gray-500 group-hover:text-gray-300"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Safe area for iOS devices with notch */}
      <div className="h-safe-area-inset-bottom bg-black/90" />
      
    </nav>
  );
};

export default BottomNav;