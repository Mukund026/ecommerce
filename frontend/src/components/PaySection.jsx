import React from 'react';

const PaySection = ({ title, children }) => {
  return (
    <section className="mb-12">
      <h3 className="text-xl font-bold text-gray-900 mb-6">{title}</h3>
      <div className="bg-white rounded-xl shadow-sm border p-6">
        {children}
      </div>
    </section>
  );
};

export default PaySection;

