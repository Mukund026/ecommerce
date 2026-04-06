import React from 'react';

const SectionTitle = ({ title, subtitle, action }) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <div>
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      </div>
      {action && (
        <a href={action.link} className="text-sm text-blue-600 hover:underline font-medium">
          {action.text}
        </a>
      )}
    </div>
  );
};

export default SectionTitle;

