// src/components/Product_list.jsx

import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../api/api_base";
import Loading from "./Loading.jsx";

const Product_list = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/products`);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <h1 className="text-3xl font-bold text-center text-indigo-600 mb-10">
        Product List
      </h1>

      {/* 3x3 Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden flex flex-col"
          >
            {/* Image */}
            <div className="relative w-full h-48 bg-gray-100">
              <img
                src={`${BASE_URL}${product.image}`}
                alt={product.product_name}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                HOT
              </span>
            </div>

            {/* Product Details */}
            <div className="p-4 flex flex-col justify-between flex-grow">
              <div>
                <h2 className="text-lg font-semibold text-blue-700">
                  {product.name}
                </h2>
                <p className="text-indigo-600 text-xl font-bold mt-2">
                  {product.product_price}
                </p>
                <p className="text-gray-600 text-sm mt-1">
                  {product.description}
                </p>
              </div>

              {/* Buttons */}
              <div className="flex justify-between mt-4">
                <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 text-sm rounded transition">
                  Add to Cart
                </button>
                <button className="bg-sky-500 hover:bg-sky-600 text-white px-3 py-2 text-sm rounded transition">
                  More Info
                </button>
              </div>

              {/* Rating */}
              <div className="mt-3 text-sm text-gray-700">
                Rating: <span className="text-amber-500">★ ★ ★ ★ ☆</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product_list;
