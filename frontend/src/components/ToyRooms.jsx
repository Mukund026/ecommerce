import React from 'react';

const ToyRooms = ({ products = [] }) => {
  const displayProducts = products.length > 0 ? products.slice(0, 3) : [];

  return (
    <section className="mb-12">
      <h2 className="text-xl font-bold text-gray-900 mb-8">Kids room toys</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayProducts.map((product, idx) => (
          <div key={product.id || idx} className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all">
            <img
              src={product.image}
              alt={product.title || product.name}
              className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              onError={(e) => { e.target.src = '/api/placeholder-image.jpg'; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-2xl font-bold mb-2 line-clamp-1">{product.title || product.name}</h3>
              <p className="text-lg">₹{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ToyRooms;
