import React from 'react';
import { premiumEdits } from '../data/amazonFashion';

const PremiumEditGrid = () => {
  return (
    <section className="bg-gradient-to-br from-gray-900 to-slate-900 text-white py-16 px-4 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-6 drop-shadow-2xl">
            The Premium Edit
          </h2>
          <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Timeless picks from premium brands
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6 lg:gap-8">
          {premiumEdits.map((edit, index) => (
            <div
              key={index}
              className="group relative rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:rotate-1 bg-gradient-to-br from-gray-800 to-slate-800 p-4 lg:p-6"
            >
              {/* Color Overlay */}
              <div 
                className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                style={{ backgroundColor: edit.color }}
              />
              
              {/* Collage Images */}
              <div className="relative grid grid-cols-2 gap-1 h-48 lg:h-56">
                <div className="row-span-2">
                  <img
                    src={`https://images.unsplash.com/photo-1483985988355-763728e01a71?w=200&h=300&fit=crop&random=${index}`}
                    alt={edit.name}
                    className="w-full h-full object-cover rounded-lg shadow-md group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div>
                  <img
                    src={`https://images.unsplash.com/photo-1551028719-00167b16eac5?w=100&h=140&fit=crop&random=${index + 1}`}
                    alt={edit.name}
                    className="w-full h-full object-cover rounded-lg shadow-md"
                  />
                </div>
                <div>
                  <img
                    src={`https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=140&fit=crop&random=${index + 2}`}
                    alt={edit.name}
                    className="w-full h-full object-cover rounded-lg shadow-md"
                  />
                </div>
              </div>

              {/* Color Label */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-900 shadow-lg group-hover:bg-white">
                {edit.name}
              </div>

              {/* Hover CTA */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <button className="bg-white text-gray-900 font-bold px-6 py-3 rounded-full shadow-2xl hover:shadow-white/50 hover:scale-105 transition-all duration-200 w-full">
                  Shop the Edit →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PremiumEditGrid;
