"use server";

import { revalidatePath } from "next/cache";
import { prisma, getAllProducts, getAllOrders, updateProductStock } from "@/lib/db";

export async function getAdminData() {
  try {
    const products = await getAllProducts();
    const orders = await getAllOrders();
    return {
      products,
      orders: orders.map((order: any) => ({
        id: order.id,
        razorpayOrderId: order.razorpayOrderId,
        razorpayPaymentId: order.razorpayPaymentId || "N/A",
        customerDetails: typeof order.customerDetails === "string" 
          ? JSON.parse(order.customerDetails) 
          : order.customerDetails,
        items: typeof order.items === "string"
          ? JSON.parse(order.items)
          : order.items,
        amount: order.amount,
        status: order.status,
        createdAt: order.createdAt.toISOString()
      })),
      success: true
    };
  } catch (error) {
    console.error("Failed to retrieve admin data:", error);
    return {
      products: [],
      orders: [],
      success: false,
      error: "Could not retrieve admin data."
    };
  }
}

export async function updateStockAction(slug: string, newStock: number) {
  try {
    if (newStock < 0) return { success: false, error: "Stock cannot be negative." };
    const success = await updateProductStock(slug, newStock);
    if (success) {
      revalidatePath("/admin");
      revalidatePath(`/products/${slug}`);
      revalidatePath("/products");
      return { success: true };
    }
    return { success: false, error: "Failed to update stock in database." };
  } catch (error) {
    console.error("Error updating stock:", error);
    return { success: false, error: "Error occurred while updating stock." };
  }
}
