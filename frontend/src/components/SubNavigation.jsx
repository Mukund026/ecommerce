import React from 'react';

const SubNavigation = () => {
  return (
    <div className="bg-white py-4 px-4 border-b border-gray-200">
      <div className="max-w-[1440px] mx-auto flex space-x-6 text-sm font-medium">
        <a href="/bestsellers" className="text-gray-500 hover:text-gray-900 pb-4 border-b-2 border-transparent hover:border-orange-500">
          Bestsellers
        </a>
        <a href="/hot-new-releases" className="text-orange-600 pb-4 border-b-4 border-orange-500 font-semibold">
          Hot New Releases
        </a>
        <a href="#" className="text-gray-500 hover:text-gray-900 pb-4 border-b-2 border-transparent hover:border-orange-500">
          Movers and Shakers
        </a>
        <a href="#" className="text-gray-500 hover:text-gray-900 pb-4 border-b-2 border-transparent hover:border-orange-500">
          Most Wished For
        </a>
        <a href="#" className="text-gray-500 hover:text-gray-900 pb-4 border-b-2 border-transparent hover:border-orange-500">
          Most Gifted
        </a>
      </div>
    </div>
  );
};

export default SubNavigation;
