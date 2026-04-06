import React from 'react';

const AccountCard = ({ icon, title, description, link }) => {
  return (
    <a 
      href={link || '#'}
      className="block bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-all duration-200 hover:border-orange-400 group"
    >
      <div className="flex items-start gap-3">
        <div className="text-2xl shrink-0">{icon}</div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-900 group-hover:text-orange-600 transition-colors">
            {title}
          </h3>
          {description && (
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">{description}</p>
          )}
        </div>
      </div>
    </a>
  );
};

export default AccountCard;

