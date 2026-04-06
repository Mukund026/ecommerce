import React from 'react';

const AccountSection = ({ title, links }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-4">
      <h3 className="font-bold text-gray-900 mb-3">{title}</h3>
      <ul className="space-y-2">
        {links.map((link, index) => (
          <li key={index}>
            <a 
              href={link.url || '#'}
              className="text-sm text-gray-600 hover:text-orange-600 hover:underline transition-colors"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AccountSection;

