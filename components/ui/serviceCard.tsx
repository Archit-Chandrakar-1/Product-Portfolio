"use client";
import React, { useState } from 'react';
import { Modal } from './Modal';

interface ServiceItem {
  title: string;
  description: string;
  icon: string;
}

interface ServiceCardProps {
  service: ServiceItem;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Card UI: Matches the white card design (Photo 2) */}
      <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col items-center text-center p-6 space-y-4 border border-gray-100">
        
        {/* Placeholder for the Graphic (Simplified) */}
        <div className="w-full h-32 flex items-center justify-center bg-gray-50 rounded-lg mb-2">
            <span className="text-6xl">{service.icon}</span>
        </div>

        {/* Content */}
        <h3 className={`text-xl font-bold text-gray-900 transition-colors`}>
            {service.title}
        </h3>
        <p className="text-sm text-gray-600 flex-grow">
            {/* Displaying a truncated description for the main card */}
            {service.description.length > 80 
                ? service.description.substring(0, 80) + '...' 
                : service.description}
        </p>

        {/* Action Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full py-3 mt-4 text-center border-2 border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200"
        >
          Read More
        </button>
      </div>

      {/* Modal: Opens when the button is clicked */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={service.title}
      >
        <p className="text-lg font-medium text-gray-800">
            {/* The full, detailed description is shown here */}
            {service.description}
        </p>
        <p className="mt-4 text-gray-600">
            Thank you for your interest! For a detailed consultation on **{service.title}**, please feel free to reach out.
        </p>
      </Modal>
    </>
  );
};