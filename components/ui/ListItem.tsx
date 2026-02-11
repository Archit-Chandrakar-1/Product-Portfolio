"use client";
import React, { useState } from 'react';
import { Modal } from './Modal'; // Assuming Modal.tsx is in the same directory (or adjust path)

interface ServiceItem {
  title: string;
  description: string;
}

interface ListItemProps {
  service: ServiceItem;
  index: number; // To display '01', '02', etc.
}

export const ListItem: React.FC<ListItemProps> = ({ service, index }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Format index to be '01', '02', '03', etc.
  const formattedIndex = String(index + 1).padStart(2, '0');
  
  // Tailwind classes for hover effect
  const primaryTextColor = isHovered ? 'text-white' : 'text-black';
  const primaryBgColor = isHovered ? 'bg-black' : 'bg-white';
  const secondaryTextColor = isHovered ? 'text-gray-200' : 'text-gray-700';

  return (
    <>
      <div 
        className={`w-full py-10 px-4 md:px-0 border-t border-black transition-all duration-300 ${primaryBgColor}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsModalOpen(true)}
        style={{ cursor: 'pointer' }} // Visual cue that the row is clickable
      >
        <div className="flex justify-between items-start mx-auto max-w-7xl">
          
          {/* Left Section: Index and Title */}
          <div className="flex items-start w-5/12 sm:w-4/12 md:w-3/12 space-x-6">
            <span className={`text-xl font-light transition-colors duration-300 ${secondaryTextColor}`}>
              {formattedIndex}
            </span>
            <h2 className={`text-4xl sm:text-4xl font-extrabold tracking-tight leading-none transition-colors duration-300 ${primaryTextColor}`}>
              {service.title}
            </h2>
          </div>

          {/* Center Section: Description */}
          <div className="w-5/12 md:w-6/12 pt-1">
            <p className={`text-lg transition-colors duration-300 ${secondaryTextColor}`}>
              {/* Using the description as the brief text */}
              {service.description.length > 100 
                  ? service.description.substring(0, 100) + '...' 
                  : service.description}
            </p>
          </div>

          {/* Right Section: Arrow Button */}
          <div className="w-2/12 md:w-1/12 flex justify-end">
            <div 
              className={`w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full border-2 transition-all duration-300 
                ${isHovered ? 'border-white' : 'border-black'} 
                ${isHovered ? 'text-white' : 'text-black'}`
              }
            >
              {/* SVG for the arrow icon */}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6L16 12M16 12L10 18M16 12H6"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modal Reused: Same modal opens on click */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={service.title}
      >
        <p className="text-lg font-medium text-gray-800">
            {service.description}
        </p>
        <p className="mt-4 text-gray-600">
            To discuss **{service.title}** further, please get in touch!
        </p>
      </Modal>
    </>
  );
};