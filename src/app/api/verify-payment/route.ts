import { NextResponse } from "next/server";
import { createOrderInDb } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { paymentId, orderData, razorpayOrderId } = await request.json();

    if (orderData) {
      const firstItem = orderData.items && orderData.items[0];
      await createOrderInDb({
        razorpayOrderId: razorpayOrderId || "order_mock_" + Math.random().toString(36).substring(2, 10),
        customerDetails: orderData.formData,
        productId: firstItem ? firstItem.id : null,
        items: orderData.items,
        amount: orderData.amount,
        status: "paid"
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Payment verification / DB save failed:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to verify payment" },
      { status: 500 }
    );
  }
}
