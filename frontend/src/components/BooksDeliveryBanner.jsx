import React from 'react';

const BooksDeliveryBanner = () => {
  return (
    <div className="bg-orange-100 mx-4 mt-4 rounded-lg overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-6 py-4">
        <div className="flex items-center justify-center gap-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="text-center">
            <p className="text-orange-800 font-semibold text-lg">
              Get <span className="font-bold">FREE Delivery</span> on your first order
            </p>
            <p className="text-orange-700 text-sm">
              No minimum order requirement for Books Bazaar orders
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BooksDeliveryBanner;

