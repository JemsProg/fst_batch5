import React, { useState } from "react";

const ProductDetail = ({
  name,
  price,
  stock,
  imageUrl,
  description,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);

  const handleDecrease = () => setQuantity((prev) => Math.max(1, prev - 1));
  const handleIncrease = () => setQuantity((prev) => Math.min(stock, prev + 1));

  const handleAddToCart = () => {
    if (!stock) return;
    if (onAddToCart) onAddToCart(quantity);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-10">
      {/* Image + Info */}
      <div className="flex flex-col gap-8 md:flex-row md:items-start">
        {/* Product image */}
        <div className="md:w-1/2 flex justify-center md:justify-start">
          <img src={imageUrl} alt={name} className="max-h-64 object-contain" />
        </div>

        {/* Product details */}
        <div className="md:w-1/2 space-y-4">
          <h1 className="text-2xl font-semibold text-gray-900">{name}</h1>

          <p className="text-xl font-semibold text-gray-900">
            ${price.toLocaleString()}
          </p>

          <p className="text-sm text-gray-700">
            Available Stocks: <span className="font-medium">{stock}</span>
          </p>

          {/* Quantity & button */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-3">
              <button
                type="button"
                onClick={handleDecrease}
                className="h-8 w-8 flex items-center justify-center border border-gray-400 text-gray-800 text-lg"
              >
                -
              </button>
              <span className="w-8 text-center text-sm">{quantity}</span>
              <button
                type="button"
                onClick={handleIncrease}
                className="h-8 w-8 flex items-center justify-center border border-gray-400 text-gray-800 text-lg"
              >
                +
              </button>
            </div>

            <button
              type="button"
              disabled={stock === 0}
              onClick={handleAddToCart}
              className="w-52 h-10 text-sm font-medium text-white bg-slate-900 disabled:bg-slate-400"
            >
              {stock === 0 ? "Out of stock" : "Add to cart"}
            </button>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mt-10 max-w-3xl">
        <h2 className="text-sm font-semibold text-gray-900 mb-2">
          Description
        </h2>
        <p className="text-sm leading-relaxed text-gray-800">{description}</p>
      </div>
    </div>
  );
};

export default ProductDetail;
