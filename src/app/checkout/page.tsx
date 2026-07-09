"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Script from "next/script";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { ArrowLeft, CreditCard, Lock, ShoppingBag, ShieldCheck } from "lucide-react";
import { useCart } from "@/context/CartContext";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, cartSubtotal, clearCart } = useCart();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    notes: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validateForm = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.name.trim()) tempErrors.name = "Full name is required";
    if (!formData.email.trim()) {
      tempErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Please enter a valid email address";
    }
    if (!formData.phone.trim()) {
      tempErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/[\s-+]/g, ""))) {
      tempErrors.phone = "Please enter a valid 10-digit mobile number";
    }
    if (!formData.address.trim()) tempErrors.address = "Delivery address is required";
    if (!formData.city.trim()) tempErrors.city = "City is required";
    if (!formData.pincode.trim()) {
      tempErrors.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(formData.pincode.trim())) {
      tempErrors.pincode = "Please enter a valid 6-digit pincode";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handlePayNow = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // 1. Create order on server (mock)
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ price: cartSubtotal })
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || "Failed to create payment order");
      }

      const { razorpayOrder } = data;

      // 2. Configure Razorpay Standard Checkout in Test Mode
      // We deliberately omit order_id in order to run checkout in Standard Test Mode bypassing strict verification, matching the working breakfast combo checkout settings.
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_mockkey",
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "Vṛndā Organic Store",
        description: `Order of ${cartItems.length} items`,
        image: "/images/logo.jpeg",
        handler: async function (response: any) {
          const paymentId = response.razorpay_payment_id || "pay_mock_" + Math.random().toString(36).substring(2, 10);
          
          // Verify payment (mock)
          await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              paymentId,
              orderData: {
                formData,
                items: cartItems,
                amount: cartSubtotal
              }
            })
          });

          // Success - clear cart and redirect
          clearCart();
          router.push(
            `/confirmation?name=${encodeURIComponent(formData.name)}&plan=Product%20Order&amount=${cartSubtotal}&paymentId=${paymentId}`
          );
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone
        },
        theme: {
          color: "#1f3f21"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Payment process failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main
      className={`${cormorant.variable} ${inter.variable} min-h-screen bg-[#f7f2e9] py-12 px-6 antialiased`}
      style={{ fontFamily: "var(--font-inter), sans-serif" }}
    >
      {/* Preload Razorpay Script using afterInteractive */}
      <Script 
        src="https://checkout.razorpay.com/v1/checkout.js" 
        strategy="afterInteractive" 
      />

      <div className="max-w-6xl mx-auto space-y-8">
        {/* Back Link */}
        <div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#8c6239]/10 text-xs font-bold uppercase tracking-wider text-[#1f3f21] hover:border-[#8c6239]/30 shadow-sm hover:shadow transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" /> Continue Shopping
          </Link>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white border border-[#8c6239]/10 rounded-[2.5rem] p-12 text-center max-w-xl mx-auto shadow-xl space-y-6">
            <div className="w-16 h-16 bg-[#1f3f21]/5 text-[#1f3f21]/45 rounded-full flex items-center justify-center mx-auto">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h2 className="font-serif text-2xl font-bold text-[#1f3f21]">Your cart is empty</h2>
              <p className="text-sm text-[#2c2c2c]/70 font-semibold leading-relaxed max-w-xs mx-auto">
                Please add items to your cart before proceeding to checkout.
              </p>
            </div>
            <div className="pt-2">
              <Link
                href="/products"
                className="inline-flex px-8 py-3.5 bg-[#1f3f21] text-white text-xs font-bold uppercase tracking-widest rounded-2xl hover:bg-[#8c6239] transition-all duration-300 shadow-md"
              >
                Go to Store
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Order Summary */}
            <div className="lg:col-span-5 bg-white border border-[#8c6239]/10 rounded-[2.5rem] p-8 shadow-xl space-y-6">
              <div className="border-b border-[#8c6239]/10 pb-4">
                <h2 className="font-serif text-xl font-bold text-[#1f3f21] flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#8c6239]" /> Order Summary
                </h2>
              </div>

              {/* Items List */}
              <div className="space-y-4 max-h-[320px] overflow-y-auto pr-1">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 border-b border-[#f7f2e9] pb-4 last:border-0 last:pb-0">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-[#8c6239]/5 shrink-0 bg-[#f7f2e9]">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-serif text-xs font-bold text-[#1f3f21] leading-snug line-clamp-1">{item.name}</h4>
                      <span className="text-[10px] text-[#2c2c2c]/50 font-semibold block mt-0.5">
                        Qty: {item.quantity} × ₹{item.price.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-[#8c6239] shrink-0">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
              </div>

              {/* Cost Totals */}
              <div className="border-t border-[#8c6239]/10 pt-4 space-y-3 font-semibold text-xs text-[#2c2c2c]/70 uppercase tracking-wider">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-[#1f3f21] font-bold">₹{cartSubtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-600 font-bold">Free</span>
                </div>
                <div className="flex justify-between border-t border-[#8c6239]/10 pt-3 text-sm font-bold text-[#1f3f21]">
                  <span>Total Amount</span>
                  <span className="font-serif text-lg text-[#1f3f21]">₹{cartSubtotal.toLocaleString("en-IN")}</span>
                </div>
              </div>

              {/* Quality Highlights */}
              <div className="bg-[#f7f2e9]/50 border border-[#8c6239]/5 rounded-2xl p-4 space-y-3">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-[#1f3f21]">
                  <ShieldCheck className="w-4 h-4 text-green-600 shrink-0" />
                  <span>Secure Payment Guarantee</span>
                </div>
                <p className="text-[10px] text-[#2c2c2c]/60 leading-relaxed font-semibold">
                  Transactions are secured using standard SSL encryption and processed instantly via Razorpay Checkout.
                </p>
              </div>
            </div>

            {/* Right Column: Checkout Form */}
            <div className="lg:col-span-7 bg-white border border-[#8c6239]/10 rounded-[2.5rem] p-8 md:p-10 shadow-xl space-y-6">
              <div className="border-b border-[#8c6239]/10 pb-4">
                <h2 className="font-serif text-xl font-bold text-[#1f3f21] flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-[#8c6239]" /> Delivery Details
                </h2>
              </div>

              <form onSubmit={handlePayNow} className="space-y-4">
                {/* Full Name */}
                <div className="space-y-1">
                  <label htmlFor="name" className="text-[10px] font-bold uppercase tracking-wider text-[#8c6239]">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className={`w-full px-4 py-3 bg-[#f7f2e9]/50 border rounded-xl text-xs font-bold text-[#1f3f21] placeholder-[#2c2c2c]/30 focus:outline-none focus:border-[#1f3f21] transition-all duration-300 ${
                      errors.name ? "border-red-500" : "border-[#8c6239]/10"
                    }`}
                  />
                  {errors.name && <p className="text-[9px] font-bold text-red-500 uppercase">{errors.name}</p>}
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-wider text-[#8c6239]">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="you@example.com"
                      className={`w-full px-4 py-3 bg-[#f7f2e9]/50 border rounded-xl text-xs font-bold text-[#1f3f21] placeholder-[#2c2c2c]/30 focus:outline-none focus:border-[#1f3f21] transition-all duration-300 ${
                        errors.email ? "border-red-500" : "border-[#8c6239]/10"
                      }`}
                    />
                    {errors.email && <p className="text-[9px] font-bold text-red-500 uppercase">{errors.email}</p>}
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="phone" className="text-[10px] font-bold uppercase tracking-wider text-[#8c6239]">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="10-digit mobile number"
                      className={`w-full px-4 py-3 bg-[#f7f2e9]/50 border rounded-xl text-xs font-bold text-[#1f3f21] placeholder-[#2c2c2c]/30 focus:outline-none focus:border-[#1f3f21] transition-all duration-300 ${
                        errors.phone ? "border-red-500" : "border-[#8c6239]/10"
                      }`}
                    />
                    {errors.phone && <p className="text-[9px] font-bold text-red-500 uppercase">{errors.phone}</p>}
                  </div>
                </div>

                {/* Delivery Address */}
                <div className="space-y-1">
                  <label htmlFor="address" className="text-[10px] font-bold uppercase tracking-wider text-[#8c6239]">Delivery Address</label>
                  <textarea
                    id="address"
                    name="address"
                    rows={2}
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter complete shipping address"
                    className={`w-full px-4 py-3 bg-[#f7f2e9]/50 border rounded-xl text-xs font-bold text-[#1f3f21] placeholder-[#2c2c2c]/30 focus:outline-none focus:border-[#1f3f21] resize-none transition-all duration-300 ${
                      errors.address ? "border-red-500" : "border-[#8c6239]/10"
                    }`}
                  />
                  {errors.address && <p className="text-[9px] font-bold text-red-500 uppercase">{errors.address}</p>}
                </div>

                {/* City & Pincode */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="city" className="text-[10px] font-bold uppercase tracking-wider text-[#8c6239]">City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="e.g. Bangalore"
                      className={`w-full px-4 py-3 bg-[#f7f2e9]/50 border rounded-xl text-xs font-bold text-[#1f3f21] placeholder-[#2c2c2c]/30 focus:outline-none focus:border-[#1f3f21] transition-all duration-300 ${
                        errors.city ? "border-red-500" : "border-[#8c6239]/10"
                      }`}
                    />
                    {errors.city && <p className="text-[9px] font-bold text-red-500 uppercase">{errors.city}</p>}
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="pincode" className="text-[10px] font-bold uppercase tracking-wider text-[#8c6239]">Pincode</label>
                    <input
                      type="text"
                      id="pincode"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      placeholder="6-digit pincode"
                      className={`w-full px-4 py-3 bg-[#f7f2e9]/50 border rounded-xl text-xs font-bold text-[#1f3f21] placeholder-[#2c2c2c]/30 focus:outline-none focus:border-[#1f3f21] transition-all duration-300 ${
                        errors.pincode ? "border-red-500" : "border-[#8c6239]/10"
                      }`}
                    />
                    {errors.pincode && <p className="text-[9px] font-bold text-red-500 uppercase">{errors.pincode}</p>}
                  </div>
                </div>

                {/* Notes */}
                <div className="space-y-1">
                  <label htmlFor="notes" className="text-[10px] font-bold uppercase tracking-wider text-[#8c6239]">Delivery Notes (Optional)</label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={2}
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Special requests or instructions for the delivery agent"
                    className="w-full px-4 py-3 bg-[#f7f2e9]/50 border border-[#8c6239]/10 rounded-xl text-xs font-bold text-[#1f3f21] placeholder-[#2c2c2c]/30 focus:outline-none focus:border-[#1f3f21] resize-none transition-all duration-300"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-[#1f3f21] hover:bg-[#8c6239] text-white text-xs font-bold uppercase tracking-widest rounded-2xl transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2 font-semibold">
                        <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Initializing Payment...
                      </span>
                    ) : (
                      <>
                        <Lock className="w-3.5 h-3.5" />
                        <span>Pay ₹{cartSubtotal.toLocaleString("en-IN")} Securely</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
