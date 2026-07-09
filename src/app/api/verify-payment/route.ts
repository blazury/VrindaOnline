import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { paymentId, orderData, razorpayOrderId } = await request.json();

    if (orderData) {
      const firstItem = orderData.items && orderData.items[0];
      
      // Execute both order creation and stock decrements atomically in a single transaction
      await prisma.$transaction(async (tx) => {
        // 1. Create the order log in the database
        await tx.order.create({
          data: {
            razorpayOrderId: razorpayOrderId || "order_mock_" + Math.random().toString(36).substring(2, 10),
            customerDetails: orderData.formData,
            productId: firstItem ? firstItem.id : null,
            items: orderData.items,
            amount: orderData.amount,
            status: "paid"
          }
        });

        // 2. Decrement stock atomically for each purchased product
        if (orderData.items && Array.isArray(orderData.items)) {
          for (const item of orderData.items) {
            await tx.product.update({
              where: { slug: item.id },
              data: {
                stockQuantity: {
                  decrement: item.quantity || 1
                }
              }
            });
          }
        }
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Payment verification / Transaction failed:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to verify payment" },
      { status: 500 }
    );
  }
}
