const ProductRankCard = ({ product }) => {
  return (
    <div className="group bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-200 border hover:border-gray-200">
      {/* Rank Badge */}
      <div className="absolute z-10 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-br-lg -top-2 -right-2">
        #{product.rank}
      </div>
      
      {/* Image */}
      <div className="relative p-4 pt-8 h-40 flex items-center justify-center bg-gray-50 group-hover:bg-gray-100 transition-colors">
        <img 
          src={product.image} 
          alt={product.title}
          className="h-32 w-auto max-w-full object-contain group-hover:scale-105 transition-transform duration-200"
        />
        {product.videoPreview && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <i className="fas fa-play-circle text-3xl text-white"></i>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors mb-2 leading-tight">
          {product.title}
        </h3>
        
        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex text-sm text-orange-500 mr-1">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-1.512a1 1 0 00-1.175 0l-2.8 1.512c-.785.57-1.84-.197-1.54-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-sm text-gray-500 ml-1">({product.reviews.toLocaleString()})</span>
        </div>
        
        {/* Price */}
        <div className="font-bold text-lg text-orange-600">
          {product.price}
        </div>
      </div>
    </div>
  );
};

export default ProductRankCard;
