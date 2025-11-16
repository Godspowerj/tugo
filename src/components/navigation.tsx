import React from "react";
import { User } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

const BottomNav = () => {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    {
      id: 1,
      label: "Explore",
      path: "/home",
      icon: (
        <svg
          className="w-5 sm:w-6 h-5 sm:h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      ),
      activeWrapper:
        "w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white flex items-center justify-center transition-all",
      inactiveWrapper:
        "w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all group-hover:scale-110",
      activeText: "text-xs font-bold text-white",
      inactiveText:
        "text-xs font-semibold text-gray-400 group-hover:text-white transition-colors",
      activeIcon: "text-black",
      inactiveIcon: "text-gray-400 group-hover:text-white transition-colors",
    },
    {
      id: 2,
      label: "Matches",
      path: "/matches",
      icon: (
        <svg
          className="w-5 sm:w-6 h-5 sm:h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      ),
      activeWrapper:
        "w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white flex items-center justify-center transition-all",
      inactiveWrapper:
        "w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all group-hover:scale-110",
      activeText: "text-xs font-bold text-white",
      inactiveText:
        "text-xs font-semibold text-gray-400 group-hover:text-white transition-colors",
      activeIcon: "text-black",
      inactiveIcon: "text-gray-400 group-hover:text-white transition-colors",
    },
    {
      id: 3,
      label: "Profile",
      path: "/profile",
      icon: (
        <User className="w-5 sm:w-6 h-5 sm:h-6" />
      ),
      activeWrapper:
        "w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white flex items-center justify-center transition-all",
      inactiveWrapper:
        "w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all group-hover:scale-110",
      activeText: "text-xs font-bold text-white",
      inactiveText:
        "text-xs font-semibold text-gray-400 group-hover:text-white transition-colors",
      activeIcon: "text-black",
      inactiveIcon: "text-gray-400 group-hover:text-white transition-colors",
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 px-4 sm:px-6 py-3 sm:py-4 bg-black/80 backdrop-blur-lg border-t border-white/10 safe-area-bottom">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.path;

          return (
            <button
              key={item.id}
              onClick={() => router.push(item.path)}
              className="flex flex-col items-center gap-1 sm:gap-1.5 group min-w-[60px] sm:min-w-[70px]"
            >
              <div className={isActive ? item.activeWrapper : item.inactiveWrapper}>
                {React.cloneElement(item.icon, {
                  className:
                    item.icon.props.className +
                    " " +
                    (isActive ? item.activeIcon : item.inactiveIcon),
                })}
              </div>

              <span className={isActive ? item.activeText : item.inactiveText}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
