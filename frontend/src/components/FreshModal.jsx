import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation as useLocationContext } from '../context/LocationContext';

const FreshModal = ({ isOpen, onClose }) => {
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

  const handleSkip = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleSkip();
    }
  };

  if (!isOpen) return null;

  const featureCards = [
    {
      icon: '🥬',
      title: 'Fruits, vegetables & groceries',
      description: 'Fresh produce and daily essentials'
    },
    {
      icon: '🚚',
      title: '2-hour delivery',
      description: 'In select cities'
    },
    {
      icon: '💰',
      title: 'Super savings',
      description: 'Up to 50% off'
    }
  ];

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-all duration-300`}
      onClick={handleOverlayClick}
    >
      <div 
        className={`bg-white rounded-lg shadow-2xl w-full max-w-2xl mx-4 transform transition-all duration-300 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🥬</span>
            <span className="text-xl font-bold text-green-600">fresh</span>
          </div>
          <button 
            onClick={handleSkip}
            className="text-gray-500 hover:text-gray-700 font-medium"
          >
            Skip
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Feature Cards */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {featureCards.map((card, index) => (
              <div 
                key={index} 
                className="text-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors cursor-pointer"
              >
                <div className="text-4xl mb-2">{card.icon}</div>
                <h3 className="font-bold text-gray-800 text-sm">{card.title}</h3>
                <p className="text-xs text-gray-600 mt-1">{card.description}</p>
              </div>
            ))}
          </div>

          {/* Location Section */}
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Location helps us show you relevant products and offers
            </p>
            <button
              onClick={handleSignInClick}
              className="block w-full py-3 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors text-left no-underline mb-4 mx-auto max-w-sm"
            >
              Sign in to see your addresses
            </button>
            <div className="flex items-center justify-center gap-3">
              {error && (
                <div className="text-red-500 text-xs bg-red-50 p-2 rounded">{error}</div>
              )}
              <input
                type="text"
                placeholder="Enter Indian pincode"
                value={pincode}
                onChange={(e) => {
                  setPincode(e.target.value.replace(/\D/g, '').slice(0, 6));
                  if (error) setError('');
                }}
                className="border-2 border-gray-300 rounded-lg px-4 py-2 w-48 focus:border-green-500 focus:outline-none"
                maxLength={6}
              />
              <button
                onClick={handleApply}
                disabled={pincode.length !== 6 || loading}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  loading 
                    ? 'bg-gray-400 text-gray-700 cursor-not-allowed' 
                    : pincode.length === 6
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {loading ? 'Fetching...' : 'Apply'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreshModal;

