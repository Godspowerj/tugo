// src/components/Header.tsx
import React from 'react';

interface HeaderProps {
    title?: string;
}

const Header: React.FC<HeaderProps> = ({ title = 'Tugo' }) => {
    return (
        <header className="relative z-10 flex items-center justify-between px-8 py-6 animate-fade-in-down">
            <div className="flex items-center gap-3">
                {/* Logo with two dots */}
                <div className="flex items-center gap-1.5">
                    <div className="w-4.5 h-2.5 rounded-full bg-white"></div>
                    <div className="w-4.5 h-2.5 rounded-full bg-gray-400"></div>
                </div>
                <h2 className="text-2xl font-bold text-white tracking-tight">{title}</h2>
            </div>
        </header>
    );
};

export default Header;
