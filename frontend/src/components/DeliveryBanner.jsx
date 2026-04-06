import React, { useState } from 'react';
import { useLocation } from '../context/LocationContext';
import LocationModal from './LocationModal';

const DeliveryBanner = () => {
  const [showModal, setShowModal] = useState(false);
  const { formattedLocation } = useLocation();
  return (
    <div className="bg-white shadow-sm border rounded-lg p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900">Delivery</p>
        <p className="text-xs text-gray-500">As fast as 4 hours</p>
        </div>
      </div>
      <button 
        className="text-sm text-orange-600 font-medium hover:underline cursor-pointer select-none"
        onClick={() => {
          console.log('Delivery button clicked');
          setShowModal(true);
        }}
      >
        Delivery to {formattedLocation}
      </button>

      {showModal && (
        <LocationModal 
          isOpen={showModal} 
          onClose={() => setShowModal(false)} 
        />
      )}
    </div>
  );
};

export default DeliveryBanner;

