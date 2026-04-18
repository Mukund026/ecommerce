import React, { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useSmartphones } from "../hooks/useSmartphones";
import Pagination from "../components/Pagination";
import Footer from "../components/Footer";

const SmartphonesListPage = () => {
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;
  const [brand, setBrand] = useState("");
  const [sort, setSort] = useState("");

  const { smartphones, loading, error, totalPages } = useSmartphones({
    limit: 20,
    page,
  });

  const brands = [...new Set(
    smartphones.map(p => (p.name || "").split(" ")[0])
  )];

  let filteredPhones = smartphones;

  if (brand) {
    filteredPhones = filteredPhones.filter(p =>
      p.name.toLowerCase().includes(brand.toLowerCase())
    );
  }

  if (sort === "low") {
    filteredPhones.sort((a, b) => a.price - b.price);
  } else if (sort === "high") {
    filteredPhones.sort((a, b) => b.price - a.price);
  }

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">All Smartphones</h1>

        <div className="flex flex-wrap gap-4 mb-6">
          {/* Brand Filter */}
          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">All Brands</option>
            {brands.map((b, i) => (
              <option key={i} value={b}>{b}</option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">Sort By</option>
            <option value="low">Price: Low → High</option>
            <option value="high">Price: High → Low</option>
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filteredPhones.map((phone) => (
            <div key={phone._id} className="bg-white p-4 rounded shadow">
              <Link to={`/product/${phone._id}`} className="block">
                <img
                  src={phone.image}
                  alt={phone.name}
                  className="h-32 mx-auto object-contain"
                />
                <p className="text-sm mt-2">{phone.name}</p>
                <p className="font-bold text-green-600">₹{phone.price}</p>
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <Pagination currentPage={page} totalPages={totalPages || 1} basePath="/smartphones/more" />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SmartphonesListPage;
