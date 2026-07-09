"use client";

import React from "react";
import { useCart } from "@/context/CartContext";

interface BuyNowButtonProps {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  image: string;
}

export default function BuyNowButton({ id, name, price, originalPrice, discountPercentage, image }: BuyNowButtonProps) {
  const { addToCart, inventory } = useCart();
  const stock = inventory[id] ?? 1;

  const handleBuyNow = () => {
    if (stock > 0) {
      addToCart({
        id,
        name,
        price,
        originalPrice,
        discountPercentage,
        image
      });
    }
  };

  return (
    <div className="flex flex-col items-start gap-1.5 flex-grow sm:flex-grow-0">
      {stock === 0 ? (
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#8c6239] pl-2 animate-pulse">
          Out of Stock
        </span>
      ) : (
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#8c6239] pl-2 flex items-center gap-1.5 animate-pulse">
          <span className="w-1.5 h-1.5 rounded-full bg-[#8c6239] inline-block"></span>
          Only {stock} unit left!
        </span>
      )}
      <button 
        onClick={handleBuyNow}
        disabled={stock === 0}
        className={`w-full sm:w-auto px-8 py-3 bg-[#1f3f21] text-white text-xs font-bold uppercase tracking-widest rounded-2xl transition-all duration-300 shadow-md ${
          stock === 0 
            ? "opacity-50 cursor-not-allowed pointer-events-none" 
            : "hover:bg-[#8c6239] hover:shadow-lg"
        }`}
      >
        Buy Now
      </button>
    </div>
  );
}
