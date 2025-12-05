"use client";
import React from "react";
import { Search, PlusCircle, User } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

const BottomNav = () => {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { id: "explore", label: "Explore", path: "/home", icon: Search },
    { id: "post", label: "Post", path: "/post", icon: PlusCircle },
    { id: "profile", label: "Profile", path: "/profile", icon: User },
  ];

  return (
    <nav className="fixed bottom-6 left-0 right-0 z-50 px-6">
      <div className="max-w-sm mx-auto">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 px-4 py-4 shadow-2xl">
          <div className="flex items-center justify-around">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  onClick={() => router.push(item.path)}
                  className="flex flex-col items-center gap-2 min-w-[70px]"
                >
                  <Icon
                    className={`w-6 h-6 transition-all ${isActive ? 'text-white scale-110' : 'text-white/50'}`}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                  <span className={`text-xs font-medium ${isActive ? 'text-white' : 'text-white/50'}`}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;