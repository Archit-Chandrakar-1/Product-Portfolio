import React from 'react';

// Props for the Modal component
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    // Backdrop - fixed overlay covering the entire screen
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity"
      onClick={onClose} // Close modal when clicking the backdrop
    >
      {/* Modal Container */}
      <div 
        className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto transform transition-all p-6 relative"
        onClick={(e) => e.stopPropagation()} // Stop click events from closing the modal
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-900 transition-colors p-1 rounded-full"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        
        {/* Body */}
        <div className="text-gray-700 space-y-4">
          {children}
        </div>
      </div>
    </div>
  );
};