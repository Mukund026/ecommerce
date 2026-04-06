import React from 'react';
import { freshNavCategories } from '../data/products';

const FreshNavbar = () => {
    return (
        <div className="bg-white-500 text-gray">
            <div className="max-w-screen-2xl mx-auto px-4 py-2">
                <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide">
                    {freshNavCategories.map((category, index) => (
                        <a
                            key={index}
                            href="#"
                            className="text-sm whitespace-nowrap hover:underline font-medium"
                            style={{
                                marginLeft: "10px",
                                color: category === "fresh" ? "greenyellow" : "black",
                                // fontWeight: category === "Fresh" ? "bold" : "500",
                                fontSize: category === "fresh" ? "25px" : "10px"
                            }}
                        >
                            {category}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FreshNavbar;

