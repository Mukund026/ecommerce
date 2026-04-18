import React from 'react';
import { Link } from 'react-router-dom';
import { freshCategories } from '../data/products-updated.js';

const FreshNavbar = ({ activeSlug }) => {
    return (
        <div className="bg-white-500 text-gray">
            <div className="max-w-screen-2xl mx-auto px-4 py-2">
                <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide">
                    {/* Always highlighted "fresh" most left */}
                    <Link
                        to="/fresh"
                        style={{
                            color: "greenyellow",
                            fontSize: "25px",
                            fontWeight: "bold"
                        }}
                    >
                        fresh
                    </Link>
                    {freshCategories.map((category) => {
                        const isActive = category.slug === activeSlug;
                        const fontSize = "16px"; // Same size for all
                        return (
                            <Link
                                key={category.id}
                                to={`/fresh/${category.slug}`}
                                className="text-sm whitespace-nowrap font-medium hover:no-underline"
                                style={{
                                    marginLeft: "10px",
                                    color: isActive ? "green" : "black",
                                    fontSize: fontSize,
                                    fontWeight: isActive ? "bold" : "medium"
                                }}
                            >
                                {category.name}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default FreshNavbar;

