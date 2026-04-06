import React from 'react';

const HelpCard = ({ icon, title, description, link }) => {
  return (
    <a href={link} className="group bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg hover:border-gray-300 transition-all duration-200 flex gap-4">
      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-blue-50 transition-colors">
        <span className="text-xl">{icon}</span>
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors mb-1 leading-tight">{title}</h3>
        <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
      </div>
    </a>
  );
};

export default HelpCard;

