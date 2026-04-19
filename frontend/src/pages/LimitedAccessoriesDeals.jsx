import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import API from "../api/axios.js";
import Pagination from "../components/Pagination";
import Footer from "../components/Footer";

const LimitedAccessoriesDeals = () => {
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;
  const limit = 20;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchLimitedDeals = async () => {
      try {
        setLoading(true);
        const response = await API.get("/accessories", {
          params: { page, limit },
        });
        setProducts(response.data.products || []);
        setTotalPages(response.data.totalPages || 1);
      } catch (error) {
        console.error("Failed to fetch:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLimitedDeals();
  }, [page]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading limited deals...
      </div>
    );

  const styles = {
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
      gap: "20px",
    },
    card: {
      border: "1px solid #ddd",
      padding: "15px",
      borderRadius: "10px",
      background: "#fff",
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    },
    image: {
      width: "100%",
      height: "200px",
      objectFit: "contain",
    },
    price: {
      color: "green",
      fontWeight: "bold",
    },
    strike: {
      textDecoration: "line-through",
      color: "gray",
      fontSize: "14px",
    },
    brand: {
      fontSize: "14px",
      color: "#555",
    },
    desc: {
      fontSize: "13px",
      color: "#777",
    },
  };

  return (
    <div style={{ padding: "20px", minHeight: "100vh" }}>
      <h1 style={{ marginBottom: "20px" }}>Limited Accessories Deals</h1>

      <div style={styles.grid}>
        {products.map((product, index) => (
          <div key={product._id || index} style={styles.card}>
            {product.image && product.image.length > 0 ? (
              <img
                src={`http://localhost:5000${Array.isArray(product.image) ? product.image[0] : product.image}`}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "200px",
                  backgroundColor: "#f3f4f6",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "8px",
                  color: "#9ca3af",
                }}
              >
                No image available
              </div>
            )}

            <h3>{product.product_name}</h3>

            <p style={styles.price}>
              ₹{product.discounted_price}
              <span style={styles.strike}> ₹{product.retail_price}</span>
            </p>

            <p style={styles.brand}>Brand: Mobile Accessories</p>

            <p style={styles.desc}>{product.description?.slice(0, 100)}...</p>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div style={{ marginTop: "48px" }}>
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            basePath="/smartphones/accessories-deals"
          />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default LimitedAccessoriesDeals;
