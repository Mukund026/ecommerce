import React from 'react';

const SignInPromo = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-4 rounded-lg shadow-lg mb-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <svg className="w-8 h-8 text-blue-200" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <div>
            <h3 className="font-semibold text-lg">Sign in now for personalized deals</h3>
            <p className="text-blue-100 text-sm">Unlock exclusive offers and rewards</p>
          </div>
        </div>
        <a href="/login" className="bg-white text-blue-600 font-bold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 whitespace-nowrap">
          Sign in
        </a>
      </div>
    </div>
  );
};

export default SignInPromo;
