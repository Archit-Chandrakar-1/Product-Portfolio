"use client";

import React from 'react';
import { useTheme } from '@/app/context/ThemeContext';


const CelestialBody = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div 
      className="absolute right-[-10%] md:right-[-5%] top-1/2 -translate-y-1/2 z-10 cursor-pointer transition-transform duration-1000 ease-in-out hover:scale-105"
      onClick={toggleTheme}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] animate-float-slow">
        
        {/* --- SUN (Visible in Dark Mode) --- */}
        <div 
          className={`absolute inset-0 rounded-full transition-opacity duration-1000 ${
             isDark ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background: 'radial-gradient(circle at 30% 30%, #fbbf24, #d97706, #b45309)',
            boxShadow: '0 0 60px 20px rgba(251, 191, 36, 0.4), 0 0 120px 60px rgba(245, 158, 11, 0.2), inset 0 0 40px rgba(255, 255, 255, 0.5)'
          }}
        >
            {/* Sun Flares/Glow */}
            <div className="absolute -inset-10 rounded-full bg-orange-500/20 blur-3xl animate-pulse-slow"></div>
        </div>

        {/* --- MOON (Visible in Light Mode) --- */}
        <div 
          className={`absolute inset-0 rounded-full transition-opacity duration-1000 ${
             !isDark ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background: 'radial-gradient(circle at 30% 30%, #f3f4f6, #9ca3af, #4b5563)',
            boxShadow: '0 0 30px 10px rgba(0,0,0,0.1), inset -20px -20px 50px rgba(0,0,0,0.5)'
          }}
        >
            {/* Craters */}
            <div className="absolute top-[20%] left-[25%] w-[15%] h-[15%] rounded-full bg-gray-400/30 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.4)]"></div>
            <div className="absolute top-[50%] left-[20%] w-[10%] h-[10%] rounded-full bg-gray-400/30 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.4)]"></div>
            <div className="absolute top-[60%] left-[60%] w-[20%] h-[20%] rounded-full bg-gray-400/20 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.4)]"></div>
            
            {/* Moon Glow */}
            <div className="absolute -inset-4 rounded-full bg-gray-200/20 blur-xl"></div>
        </div>

      </div>

      {/* Helper Text (Optional) */}
      <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-12 text-sm font-medium tracking-widest uppercase transition-colors duration-500 ${
        isDark ? 'text-white/30' : 'text-black/30'
      }`}>
        {/* Click to switch mode */}
      </div>
    </div>
  );
};

export default CelestialBody;