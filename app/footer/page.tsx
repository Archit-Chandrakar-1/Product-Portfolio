"use client";

import React from "react";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-black border-t border-neutral-800 py-12 px-6 lg:px-8 text-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0">
        
        {/* --- LEFT SECTION: Brand & Copyright --- */}
        <div className="flex items-center gap-4">
          <span className="text-2xl font-bold text-white tracking-tight">AC</span>
          <div className="h-6 w-px bg-neutral-800"></div> {/* Vertical Separator */}
          <p className="text-neutral-500 uppercase tracking-wide font-medium">
            © 2026 Archit Chandrakar
          </p>
        </div>

        {/* --- CENTER SECTION: Navigation Links --- */}
        <nav className="flex flex-wrap justify-center gap-8">
          {["Services", "Projects", "Certifications", "Blog", "Contact"].map((item) => (
            <a 
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-neutral-400 hover:text-white transition-colors duration-200 font-medium"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* --- RIGHT SECTION: Back to Top --- */}
        <div className="flex items-center gap-4">
          <span className="text-neutral-500 hidden sm:block">Back to top</span>
          <button 
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-400 hover:bg-neutral-900 hover:text-white hover:border-neutral-700 transition-all duration-300 group"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </footer>
  );
}