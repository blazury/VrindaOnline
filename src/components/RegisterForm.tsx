"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Script from "next/script";
import { useSearchParams, useRouter } from "next/navigation";
import { Cormorant_Garamond, Inter } from "next/font/google";

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

interface PlanDetails {
  name: string;
  price: string;
  image: string;
  features: string[];
}

const plans: Record<string, PlanDetails> = {
  silver: {
    name: "Silver",
    price: "₹2999",
    image: "/silver.png",
    features: ["Fruits", "Oats", "Sprouts"]
  },
  gold: {
    name: "Gold",
    price: "₹3699",
    image: "/gold.png",
    features: ["Fruits", "Vegetables", "Oats", "Dry Fruits", "Sprouts"]
  },
  platinum: {
    name: "Platinum",
    price: "₹4499",
    image: "/platinum.png",
    features: ["Fruits", "Vegetables", "Oatmeal", "Dry Fruits", "Leafy Greens", "Sprouts", "Salad"]
  }
};

export default function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const planQuery = searchParams.get("plan")?.toLowerCase() || "gold";
  const plan = plans[planQuery] ? planQuery : "gold";
  const selectedPlan = plans[plan];

  const basePrice = useMemo(() => {
    return Number(selectedPlan.price.replace("₹", ""));
  }, [selectedPlan]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    deliveryTime: "",
    notes: "",
    freshJuice: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalPrice = useMemo(() => {
    return formData.freshJuice ? basePrice + 1470 : basePrice;
  }, [formData.freshJuice, basePrice]);

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

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, freshJuice: e.target.checked }));
  };

  const validateForm = () => {
    const nextErrors: Record<string, string> = {};
    if (!formData.name.trim()) nextErrors.name = "Full Name is required";
    if (!formData.phone.trim()) {
      nextErrors.phone = "Phone Number is required";
    } else if (formData.phone.trim().length < 10) {
      nextErrors.phone = "Invalid phone number";
    }
    if (!formData.email.trim()) {
      nextErrors.email = "Email Address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      nextErrors.email = "Invalid email address";
    }
    if (!formData.address.trim()) {
      nextErrors.address = "Delivery Address is required";
    } else if (formData.address.trim().length < 5) {
      nextErrors.address = "Address must be at least 5 characters";
    }
    if (!formData.city.trim()) {
      nextErrors.city = "City is required";
    } else if (formData.city.trim().length < 2) {
      nextErrors.city = "City must be at least 2 characters";
    }
    if (!formData.pincode.trim()) {
      nextErrors.pincode = "Pincode is required";
    } else if (formData.pincode.trim().length < 4) {
      nextErrors.pincode = "Pincode must be at least 4 characters";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    if (typeof window === "undefined") return;

    if (!window.Razorpay) {
      alert("Razorpay SDK failed to load. Please check your internet connection and try again.");
      setIsSubmitting(false);
      return;
    }

    try {
      // Mock /api/create-order call
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan: selectedPlan.name,
          price: totalPrice
        })
      });
      const orderData = await res.json();

      if (!orderData.success) {
        alert("Something went wrong");
        setIsSubmitting(false);
        return;
      }

      const options = {
        key: "rzp_test_SzDqCnXlPoPsFg", // Cloned production-compatible Razorpay Key
        amount: orderData.razorpayOrder.amount,
        currency: orderData.razorpayOrder.currency,
        name: "Vrnda",
        description: `${selectedPlan.name} Wellness Plan`,
        image: "/images/logo.jpeg",
        handler: async function (response: any) {
          try {
            // Mock /api/verify-payment call
            const verifyRes = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response)
            });
            const verifyData = await verifyRes.json();

            if (verifyData.success) {
              const queryParams = new URLSearchParams({
                success: "true",
                name: formData.name,
                plan: selectedPlan.name,
                amount: String(totalPrice),
                paymentId: response.razorpay_payment_id,
                freshJuice: String(formData.freshJuice)
              });
              router.push(`/confirmation?${queryParams.toString()}`);
            } else {
              alert("Payment verification failed");
            }
          } catch (err) {
            console.error(err);
            alert("Verification failed");
          } finally {
            setIsSubmitting(false);
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone
        },
        notes: {
          address: formData.address
        },
        theme: {
          color: "#556B2F" // Dark Olive Green
        },
        modal: {
          ondismiss: () => {
            // Trigger failure redirection exactly like production when dismissed
            router.push(`/payment-failed?plan=${plan}`);
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", () => {
        router.push(`/payment-failed?plan=${plan}`);
      });
      rzp.open();

    } catch (err) {
      console.error(err);
      alert("Server error");
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className={`${cormorant.variable} ${inter.variable} min-h-screen bg-[#f7f2e9] text-[#2c2c2c] antialiased`}
      style={{ fontFamily: "var(--font-inter), sans-serif" }}
    >
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />

      {/* Back to Plans Link */}
      <div className="mx-auto mb-8 flex max-w-7xl pt-12 px-4 sm:px-6 md:px-10">
        <Link 
          href="/breakfast-combo" 
          className="inline-flex items-center gap-2 text-sm tracking-wide text-[#1f3f21]/70 transition hover:text-[#1f3f21] font-semibold"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Plans
        </Link>
      </div>

      <main className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 pb-24 px-4 sm:px-6 md:px-10">
        
        {/* Left Column: PlanDetails (l) */}
        <section className="rounded-[2rem] border border-[#8c6239]/10 bg-white/70 p-6 shadow-xl backdrop-blur md:p-10">
          <div className="space-y-8">
            
            {/* Plan Image Container */}
            <div className="relative overflow-hidden rounded-[2rem] bg-white border border-[#8c6239]/10 aspect-[4/3] w-full">
              <img 
                src={selectedPlan.image} 
                alt={selectedPlan.name} 
                className="h-full w-full object-cover"
              />
            </div>

            {/* Plan Headings */}
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-sm uppercase tracking-[0.3em] text-[#8c6239] font-bold">Selected Plan</p>
                <h1 
                  className="text-5xl text-[#1f3f21] font-bold"
                  style={{ fontFamily: "var(--font-cormorant), serif" }}
                >
                  {selectedPlan.name} Plan
                </h1>
              </div>

              {/* Price */}
              <p 
                className="text-3xl text-[#1f3f21] font-bold"
                style={{ fontFamily: "var(--font-cormorant), serif" }}
              >
                {selectedPlan.price} <span className="text-sm font-semibold font-sans text-[#2c2c2c]/60">/ month</span>
              </p>

              {/* Features Pills */}
              <div className="flex flex-wrap gap-3 pt-2">
                {selectedPlan.features.map((feat) => (
                  <div 
                    key={feat}
                    className="rounded-full border border-[#8c6239]/10 bg-[#f7f2e9] px-4 py-2 text-sm text-[#1f3f21] font-semibold"
                  >
                    {feat}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* Right Column: RegistrationForm (db) */}
        <section className="rounded-[2rem] border border-[#8c6239]/10 bg-white/70 p-6 shadow-xl backdrop-blur md:p-10">
          <div className="space-y-8">
            
            {/* Header info */}
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.3em] text-[#8c6239] font-bold">Registration</p>
              <h2 
                className="text-4xl text-[#1f3f21] sm:text-5xl font-bold"
                style={{ fontFamily: "var(--font-cormorant), serif" }}
              >
                Complete Your Details
              </h2>
              <p className="max-w-xl text-sm leading-relaxed text-[#2c2c2c]/70 sm:text-base font-semibold">
                Fill in your information to continue with your healthy breakfast subscription.
              </p>
            </div>

            {/* Amber Alert Box */}
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm leading-relaxed text-amber-800 font-semibold">
              For deliveries beyond 3 km from MG Road, additional delivery charges will be applied. Our team will contact you within 24 hours of registration regarding the delivery fee details.
            </div>

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-6 text-xs font-semibold text-[#2c2c2c]">
              
              {/* Full Name */}
              <div className="space-y-2">
                <label className="text-sm text-[#1f3f21] block">Full Name</label>
                <input 
                  type="text" 
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full rounded-2xl border border-[#8c6239]/10 bg-white px-5 py-4 outline-none transition focus:border-[#8c6239]"
                />
                {errors.name && <p className="text-sm text-red-500 font-bold mt-1">{errors.name}</p>}
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <label className="text-sm text-[#1f3f21] block">Phone Number</label>
                <input 
                  type="tel" 
                  name="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full rounded-2xl border border-[#8c6239]/10 bg-white px-5 py-4 outline-none transition focus:border-[#8c6239]"
                />
                {errors.phone && <p className="text-sm text-red-500 font-bold mt-1">{errors.phone}</p>}
              </div>

              {/* Email Address */}
              <div className="space-y-2">
                <label className="text-sm text-[#1f3f21] block">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full rounded-2xl border border-[#8c6239]/10 bg-white px-5 py-4 outline-none transition focus:border-[#8c6239]"
                />
                {errors.email && <p className="text-sm text-red-500 font-bold mt-1">{errors.email}</p>}
              </div>

              {/* Delivery Address */}
              <div className="space-y-2">
                <label className="text-sm text-[#1f3f21] block">Delivery Address</label>
                <textarea 
                  name="address"
                  rows={4}
                  placeholder="Enter your delivery address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full rounded-2xl border border-[#8c6239]/10 bg-white px-5 py-4 outline-none transition focus:border-[#8c6239] resize-none"
                />
                {errors.address && <p className="text-sm text-red-500 font-bold mt-1">{errors.address}</p>}
              </div>

              {/* City & Pincode */}
              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm text-[#1f3f21] block">City</label>
                  <input 
                    type="text" 
                    name="city"
                    placeholder="Enter your city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full rounded-2xl border border-[#8c6239]/10 bg-white px-5 py-4 outline-none transition focus:border-[#8c6239]"
                  />
                  {errors.city && <p className="text-sm text-red-500 font-bold mt-1">{errors.city}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-[#1f3f21] block">Pincode</label>
                  <input 
                    type="text" 
                    name="pincode"
                    placeholder="Enter your pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className="w-full rounded-2xl border border-[#8c6239]/10 bg-white px-5 py-4 outline-none transition focus:border-[#8c6239]"
                  />
                  {errors.pincode && <p className="text-sm text-red-500 font-bold mt-1">{errors.pincode}</p>}
                </div>
              </div>

              {/* Preferred Delivery Time */}
              <div className="space-y-2">
                <label className="text-sm text-[#1f3f21] block">Preferred Delivery Time</label>
                <input 
                  type="text" 
                  name="deliveryTime"
                  placeholder="Example: 7:00 AM"
                  value={formData.deliveryTime}
                  onChange={handleInputChange}
                  className="w-full rounded-2xl border border-[#8c6239]/10 bg-white px-5 py-4 outline-none transition focus:border-[#8c6239]"
                />
              </div>

              {/* Additional Notes */}
              <div className="space-y-2">
                <label className="text-sm text-[#1f3f21] block">Additional Notes</label>
                <textarea 
                  name="notes"
                  rows={4}
                  placeholder="Allergies, preferences, customization requests..."
                  value={formData.notes}
                  onChange={handleInputChange}
                  className="w-full rounded-2xl border border-[#8c6239]/10 bg-white px-5 py-4 outline-none transition focus:border-[#8c6239] resize-none"
                />
              </div>

              {/* Add Juice Switch Panel */}
              <div className="rounded-[2rem] border border-[#8c6239]/10 bg-[#f7f2e9]/40 p-5">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium text-[#1f3f21]">Add Fresh Juice Everyday</h3>
                    <p className="text-sm leading-relaxed text-[#2c2c2c]/70">
                      Fresh cold-pressed juice delivered daily with your breakfast subscription.
                    </p>
                  </div>
                  <label className="flex items-center gap-3 cursor-pointer shrink-0">
                    <input 
                      type="checkbox" 
                      checked={formData.freshJuice}
                      onChange={handleCheckboxChange}
                      className="h-5 w-5 accent-[#1f3f21]"
                    />
                    <span className="text-sm font-medium text-[#1f3f21]">+ ₹49/day</span>
                  </label>
                </div>
              </div>

              {/* Order Invoice Details Box */}
              <div className="rounded-[2rem] border border-[#8c6239]/10 bg-white p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#2c2c2c]/70">Base Plan</span>
                  <span className="font-medium text-[#1f3f21]">₹{basePrice}</span>
                </div>
                
                {formData.freshJuice && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#2c2c2c]/70">Fresh Juice Add-on</span>
                    <span className="font-medium text-[#1f3f21]">₹1470</span>
                  </div>
                )}
                
                <div className="h-px bg-[#8c6239]/10" />
                
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium text-[#1f3f21]">Total</span>
                  <span className="text-3xl font-semibold text-[#1f3f21] transition-all duration-300">
                    ₹{totalPrice}
                  </span>
                </div>
              </div>

              {/* Secure Checkout Submit Trigger */}
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-2xl bg-[#1f3f21] px-6 py-5 text-sm uppercase tracking-[0.25em] text-white transition-all duration-300 hover:bg-[#8c6239] disabled:cursor-not-allowed disabled:opacity-60 font-bold"
              >
                {isSubmitting ? "Processing..." : `Continue to Secure Checkout • ₹${totalPrice}`}
              </button>

            </form>
          </div>
        </section>

      </main>
    </div>
  );
}
