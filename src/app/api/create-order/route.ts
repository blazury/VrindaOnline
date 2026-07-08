import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const mockOrderId = "order_" + Math.random().toString(36).substring(2, 15);
    
    return NextResponse.json({
      success: true,
      razorpayOrder: {
        id: mockOrderId,
        amount: body.price * 100, // price in paise
        currency: "INR"
      }
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create order" },
      { status: 500 }
    );
  }
}
