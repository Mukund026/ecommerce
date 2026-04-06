import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation as useLocationContext } from '../context/LocationContext';
import { useNavigate } from 'react-router-dom';

const LocationModal = ({ isOpen, onClose }) => {
  const [pincode, setPincode] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const { updateLocation, loading, error, setError } = useLocationContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  const handleSignInClick = () => {
    onClose();
    setTimeout(() => navigate('/login'), 300);
  };

  const handleApply = () => {
    if (pincode.length === 6) {
      if (updateLocation(pincode)) {
        setPincode('');
        setIsVisible(false);
        setTimeout(onClose, 300);
      }
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm transition-all duration-300`}
      onClick={handleOverlayClick}
    >
      <div 
        className={`bg-white rounded-lg shadow-2xl w-full max-w-md mx-4 transform transition-all duration-300 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        <div className="p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Choose your location
          </h2>
          <p className="text-sm text-gray-600 mb-6 max-w-sm mx-auto leading-relaxed">
            Select a delivery location to see product availability and delivery options
          </p>
          
          <div className="space-y-4 mb-6">
            <button
              onClick={handleSignInClick}
              className="block w-full py-3 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors text-left no-underline"
            >
              Sign in to see your addresses
            </button>
            
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>or enter an Indian pincode</span>
            </div>
            
            {error && (
              <div className="text-red-500 text-xs mb-2 text-center bg-red-50 p-2 rounded">{error}</div>
            )}
            
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Pincode"
                value={pincode}
                onChange={(e) => {
                  setPincode(e.target.value.replace(/\D/g, '').slice(0, 6));
                  if (error) setError('');
                }}
                className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                maxLength={6}
              />
              <button
                onClick={handleApply}
                disabled={pincode.length !== 6 || loading}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  loading 
                    ? 'bg-gray-400 text-gray-700 cursor-not-allowed' 
                    : pincode.length === 6
                    ? 'bg-orange-600 text-white hover:bg-orange-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {loading ? 'Fetching...' : 'Apply'}
              </button>
            </div>
          </div>

          <button 
            onClick={handleClose}
            className="w-full py-2 px-4 text-sm text-gray-500 hover:text-gray-700 font-medium"
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationModal;

