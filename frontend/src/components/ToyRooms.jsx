import React from 'react';

const ToyRooms = () => {
  return (
    <section className="mb-12">
      <h2 className="text-xl font-bold text-gray-900 mb-8">Kids room toys</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all">
          <img 
            src="https://images.unsplash.com/photo-1615535157158-96d39f5e1fe5?w=400&h=300&fit=crop" 
            alt="Toy room 1"
            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <div className="absolute bottom-6 left-6 text-white">
            <h3 className="text-2xl font-bold mb-2">Dream Bedroom Set</h3>
            <p className="text-lg">₹2,499</p>
          </div>
        </div>
        <div className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all">
          <img 
            src="https://images.unsplash.com/photo-1600607689047-33aa7a2b395e?w=400&h=300&fit=crop" 
            alt="Toy room 2"
            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <div className="absolute bottom-6 left-6 text-white">
            <h3 className="text-2xl font-bold mb-2">Adventure Playroom</h3>
            <p className="text-lg">₹3,199</p>
          </div>
        </div>
        <div className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all">
          <img 
            src="https://images.unsplash.com/photo-1598928508446-7e458e67fbed?w=400&h=300&fit=crop" 
            alt="Toy room 3"
            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <div className="absolute bottom-6 left-6 text-white">
            <h3 className="text-2xl font-bold mb-2">Study Corner</h3>
            <p className="text-lg">₹1,999</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToyRooms;

