"use client";

import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Cormorant_Garamond, Inter } from "next/font/google";

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

export default function ConfirmationScreen() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "";
  const plan = searchParams.get("plan") || "Gold";
  const amount = searchParams.get("amount") || "";
  const paymentId = searchParams.get("paymentId") || "";
  const freshJuice = searchParams.get("freshJuice") === "true";

  return (
    <main 
      className={`${cormorant.variable} ${inter.variable} min-h-screen bg-[#f7f2e9] flex items-center justify-center p-6 antialiased`}
      style={{ fontFamily: "var(--font-inter), sans-serif" }}
    >
      {/* Centered Confirmation Box */}
      <div className="bg-white border border-[#8c6239]/10 rounded-[2.5rem] max-w-xl w-full p-10 md:p-14 shadow-2xl text-center space-y-6">
        
        {/* Green Check Icon */}
        <div className="w-20 h-20 bg-green-50 text-[#1f3f21] rounded-full flex items-center justify-center mx-auto border border-green-100">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth="2.5" 
            stroke="currentColor" 
            className="w-8 h-8"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Title */}
        <h2 
          className="text-4xl text-[#1f3f21] font-bold tracking-tight"
          style={{ fontFamily: "var(--font-cormorant), serif" }}
        >
          Subscription Active
        </h2>

        {/* Dynamic greeting */}
        <div className="space-y-2">
          <p className="text-base text-[#1f3f21] font-bold">
            Thank you, {name}!
          </p>
          <p className="text-sm leading-relaxed text-[#2c2c2c]/75 font-semibold max-w-md mx-auto">
            Your healthy breakfast combo subscription has been initialized. We will contact you on your registered phone number to confirm your first morning delivery details.
          </p>
        </div>

        {/* Order Invoice Summary */}
        <div className="bg-[#f7f2e9]/50 border border-[#8c6239]/5 rounded-2xl p-6 max-w-sm mx-auto space-y-3 text-xs font-bold uppercase tracking-wider text-[#8c6239]">
          <div className="flex justify-between gap-4 border-b border-[#8c6239]/10 pb-2">
            <span>Subscriber</span>
            <span className="text-[#1f3f21] normal-case">{name}</span>
          </div>
          <div className="flex justify-between gap-4 border-b border-[#8c6239]/10 pb-2">
            <span>Selected Plan</span>
            <span className="text-[#1f3f21]">{plan} Plan</span>
          </div>
          {freshJuice && (
            <div className="flex justify-between gap-4 border-b border-[#8c6239]/10 pb-2">
              <span>Fresh Juice</span>
              <span className="text-[#1f3f21]">Yes (+ ₹1470)</span>
            </div>
          )}
          <div className="flex justify-between gap-4 border-b border-[#8c6239]/10 pb-2">
            <span>Reference ID</span>
            <span className="text-[#1f3f21] normal-case">{paymentId}</span>
          </div>
          <div className="flex justify-between gap-4 pt-1 text-sm font-bold text-[#1f3f21]">
            <span>Amount Paid</span>
            <span>₹{amount}</span>
          </div>
        </div>

        {/* Return Button */}
        <div className="pt-4 flex justify-center text-xs font-bold uppercase tracking-widest">
          <Link 
            href="/"
            className="px-8 py-4 bg-[#1f3f21] hover:bg-[#8c6239] text-white rounded-2xl transition-all duration-300 shadow-md hover:shadow-lg text-center"
          >
            Return to Homepage
          </Link>
        </div>

      </div>
    </main>
  );
}
