const CategoryHeading = () => {
  return (
    <section className="mb-8 pb-6 border-b bg-white rounded-lg shadow-sm p-6">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            Buy products across Home,Kitchen,Garden,Furniture,Sports and more online at Amazon India
          </h1>
          <p className="text-xl text-gray-600">250,000+ results</p>
        </div>
        <div className="flex items-center gap-3 mt-4 lg:mt-0">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm whitespace-nowrap">Sort by:</span>
          <select className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Avg. Customer Review</option>
          </select>
        </div>
      </div>
    </section>
  );
};

export default CategoryHeading;
