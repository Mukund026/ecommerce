import { Link } from 'react-router-dom';
import { electronicsCategories } from '../data/electronicsCategories';

const MegaDropdown = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="absolute top-full left-0 w-full bg-white shadow-2xl border-t z-50"
      onMouseEnter={() => {}}
      onMouseLeave={onClose}
    >
      <div className="max-w-screen-2xl mx-auto py-6 px-4">
        <div className="grid grid-cols-4 gap-6">
          {electronicsCategories.map((category) => (
            <div key={category.id} className="space-y-3">
              <h3 className="font-bold text-gray-800 text-sm">
                {category.name}
              </h3>
              {category.columns.map((column, colIndex) => (
                <div key={colIndex}>
                  {column.isPromo ? (
                    // Promo Cards Column
                    <div className="space-y-2">
                      {column.promoCards?.map((card, cardIndex) => (
                        <Link 
                          key={cardIndex}
                          to={card.link}
                          className="block group"
                          onClick={onClose}
                        >
                          <div className="relative overflow-hidden rounded">
                            <img 
                              src={card.image} 
                              alt={card.caption}
                              className="w-full h-24 object-cover group-hover:scale-105 transition-transform"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                              <p className="text-white text-xs font-medium">
                                {card.caption}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    // Regular Items Column
                    <div>
                      <h4 className="text-blue-600 text-xs font-medium mb-1 hover:underline cursor-pointer">
                        {column.title}
                      </h4>
                      <ul className="space-y-1">
                        {column.items?.map((item, itemIndex) => (
                          <li key={itemIndex}>
                            <Link 
                              to="/" 
                              className="text-xs text-gray-600 hover:text-blue-600 hover:underline"
                              onClick={onClose}
                            >
                              {item}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MegaDropdown;

