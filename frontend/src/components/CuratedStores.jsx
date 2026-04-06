import { Link } from "react-router-dom";
import { curatedStores } from "../data/smartphones";

const CuratedStores = () => {
  return (
    <div className="mb-6">
      {/* Background Section */}
      <div 
        className="rounded-lg p-6 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }}
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Discover Curated Smartphone Stores
          </h2>
          <p className="text-purple-200 mb-4">
            Find the perfect phone for your needs from our carefully curated collections
          </p>
          
          {/* Store Category Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {curatedStores.map((store) => (
              <Link 
                key={store.id}
                to={`/smartphones?category=${store.name.toLowerCase().replace(' ', '-')}`}
                className="block group"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 hover:bg-white/20 transition-colors">
                  {/* Image */}
                  <div className="h-20 mb-2 rounded overflow-hidden">
                    <img
                      src={store.image}
                      alt={store.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                    />
                  </div>
                  
                  {/* Name */}
                  <h3 className="text-white font-semibold text-sm text-center">
                    {store.name}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-purple-200 text-xs text-center mt-1">
                    {store.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CuratedStores;

