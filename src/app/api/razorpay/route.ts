import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const price = body.price;

    if (!price || isNaN(price)) {
      return NextResponse.json({ success: false, error: "Invalid price provided" }, { status: 400 });
    }

    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return NextResponse.json({ 
        success: false, 
        error: "Razorpay credentials are not configured in the server environment variables." 
      }, { status: 500 });
    }

    // Call official Razorpay Orders API directly using Basic Auth
    const authString = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${authString}`
      },
      body: JSON.stringify({
        amount: Math.round(price * 100), // amount in paise
        currency: "INR",
        receipt: "receipt_" + Math.random().toString(36).substring(2, 10)
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Razorpay API error: ${errText}`);
    }

    const razorpayOrder = await response.json();

    return NextResponse.json({
      success: true,
      razorpayOrder: {
        id: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency
      }
    });
  } catch (error: any) {
    console.error("Razorpay order creation failed:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create payment order" },
      { status: 500 }
    );
  }
}
