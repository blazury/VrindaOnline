"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { X, Plus, Minus, Trash2, ShoppingBag, Lock } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const router = useRouter();
  const { 
    cartItems, 
    isOpen, 
    toggleCart, 
    updateQuantity, 
    removeFromCart, 
    cartSubtotal,
    cartCount,
    inventory
  } = useCart();
  
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close drawer on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        toggleCart(false);
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, toggleCart]);

  const handleCheckoutClick = () => {
    toggleCart(false);
    router.push("/checkout");
  };

  return (
    <>
      {/* Dark Backdrop Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-500 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => toggleCart(false)}
      />

      {/* Slide-out Panel */}
      <div
        ref={drawerRef}
        className={`fixed top-0 right-0 h-full w-full sm:max-w-md bg-[#f7f2e9] shadow-2xl z-50 flex flex-col transition-transform duration-500 ease-in-out border-l border-[#8c6239]/10 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ fontFamily: "var(--font-inter), sans-serif" }}
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-[#8c6239]/10 flex items-center justify-between bg-white/50 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#1f3f21]" />
            <h2 className="font-serif text-lg font-bold text-[#1f3f21]">
              Your Cart ({cartCount})
            </h2>
          </div>
          <button
            onClick={() => toggleCart(false)}
            className="p-2 rounded-full hover:bg-[#1f3f21]/5 text-[#2c2c2c]/75 hover:text-[#1f3f21] transition-colors duration-200"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-grow overflow-y-auto p-6 space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#1f3f21]/5 flex items-center justify-center text-[#1f3f21]/45">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-base font-bold text-[#1f3f21]">
                  Your cart is empty
                </h3>
                <p className="text-xs text-[#2c2c2c]/60 max-w-[240px] mx-auto font-medium">
                  Add some of our high-grade organic cooperative products to get started.
                </p>
              </div>
              <button
                onClick={() => toggleCart(false)}
                className="mt-2 px-6 py-2.5 bg-[#1f3f21] text-white text-[10px] font-bold uppercase tracking-wider rounded-xl hover:bg-[#8c6239] transition-colors duration-300"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 bg-white border border-[#8c6239]/10 p-3 rounded-2xl shadow-sm relative group transition-all duration-300 hover:border-[#8c6239]/20"
              >
                {/* Product Image */}
                <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-[#8c6239]/5 shrink-0 bg-[#f7f2e9]">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>

                {/* Info & Controls */}
                <div className="flex-grow space-y-1.5">
                  <div className="flex justify-between items-start pr-6">
                    <h4 className="font-serif text-xs sm:text-sm font-bold text-[#1f3f21] line-clamp-1 leading-snug">
                      {item.name}
                    </h4>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    {/* Quantity controls */}
                    <div className="flex items-center border border-[#8c6239]/10 rounded-full bg-[#f7f2e9]/50 overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 px-2.5 hover:bg-[#1f3f21]/5 text-[#2c2c2c]/70 hover:text-[#1f3f21] transition-colors duration-200"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-bold text-[#1f3f21] min-w-[16px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        disabled={item.quantity >= (inventory[item.id] ?? 1)}
                        className={`p-1 px-2.5 hover:bg-[#1f3f21]/5 text-[#2c2c2c]/70 hover:text-[#1f3f21] transition-colors duration-200 ${
                          item.quantity >= (inventory[item.id] ?? 1) ? "opacity-30 cursor-not-allowed pointer-events-none" : ""
                        }`}
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      {item.discountPercentage > 0 ? (
                        <div className="space-y-0.5">
                          <span className="block text-[10px] line-through text-[#2c2c2c]/40 font-semibold">
                            ₹ {(item.originalPrice * item.quantity).toLocaleString("en-IN")}
                          </span>
                          <span className="text-xs font-extrabold text-[#1f3f21]">
                            ₹ {(item.price * item.quantity).toLocaleString("en-IN")}
                          </span>
                          <span className="block text-[8px] font-bold text-[#8c6239] uppercase tracking-wider">
                            {item.discountPercentage}% OFF
                          </span>
                        </div>
                      ) : (
                        <div>
                          <span className="text-xs font-bold text-[#8c6239]">
                            ₹ {(item.price * item.quantity).toLocaleString("en-IN")}
                          </span>
                          {item.quantity > 1 && (
                            <span className="block text-[9px] text-[#2c2c2c]/50 font-semibold mt-0.5">
                              ₹ {item.price.toLocaleString("en-IN")} each
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Remove button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="absolute top-2.5 right-2.5 p-1.5 rounded-full hover:bg-red-50 text-[#2c2c2c]/40 hover:text-red-600 transition-colors duration-200"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-[#8c6239]/10 bg-white/70 backdrop-blur-md space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase text-[#2c2c2c]/50 block tracking-wider">
                  Subtotal
                </span>
                <span className="text-[9px] text-[#2c2c2c]/40 font-semibold block">
                  (GST & Shipping calculated at checkout)
                </span>
              </div>
              <span className="font-serif text-xl font-bold text-[#1f3f21]">
                ₹ {cartSubtotal.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="space-y-2">
              <button
                onClick={handleCheckoutClick}
                className="w-full py-3.5 bg-[#1f3f21] hover:bg-[#8c6239] text-white text-xs font-bold uppercase tracking-widest rounded-2xl transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Proceed to Secure Checkout</span>
              </button>
              
              <button
                onClick={() => toggleCart(false)}
                className="w-full py-2.5 bg-transparent border border-[#8c6239]/15 text-[#1f3f21] text-[10px] font-bold uppercase tracking-wider rounded-xl hover:bg-[#1f3f21]/5 hover:border-[#1f3f21]/20 transition-all duration-300"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
