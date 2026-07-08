import React, { Suspense } from "react";
import PaymentSuccessScreen from "@/components/PaymentSuccessScreen";

export default function PaymentSuccessPage() {
  return (
    <Suspense 
      fallback={
        <div className="min-h-screen bg-[#f7f2e9] flex items-center justify-center text-xs font-bold text-[#1f3f21] uppercase tracking-[0.2em] font-sans">
          Loading Page...
        </div>
      }
    >
      <PaymentSuccessScreen />
    </Suspense>
  );
}
