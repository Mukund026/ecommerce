import React from 'react';

const HelpTopicList = ({ title, topics, className = '' }) => {
  return (
    <div className={`space-y-3 ${className}`}>
      <h4 className="font-bold text-gray-900 text-lg mb-4">{title}</h4>
      <ul className="space-y-2">
        {topics.map((topic, index) => (
          <li key={index}>
            <a href="#" className="text-blue-600 hover:text-blue-800 text-sm hover:underline transition-colors block">
              {topic}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HelpTopicList;

