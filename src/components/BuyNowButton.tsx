"use client";

import React from "react";
import { useCart } from "@/context/CartContext";

interface BuyNowButtonProps {
  id: string;
  name: string;
  price: number;
  image: string;
}

export default function BuyNowButton({ id, name, price, image }: BuyNowButtonProps) {
  const { addToCart } = useCart();

  const handleBuyNow = () => {
    addToCart({
      id,
      name,
      price,
      image
    });
  };

  return (
    <button 
      onClick={handleBuyNow}
      className="flex-grow sm:flex-grow-0 px-8 py-3 bg-[#1f3f21] text-white text-xs font-bold uppercase tracking-widest rounded-2xl hover:bg-[#8c6239] transition-all duration-300 shadow-md hover:shadow-lg animate-fade-in"
    >
      Buy Now
    </button>
  );
}
