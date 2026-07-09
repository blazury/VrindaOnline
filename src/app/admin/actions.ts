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
    const result = await updateProductStock(slug, newStock);
    if (result.success) {
      revalidatePath("/admin");
      revalidatePath(`/products/${slug}`);
      revalidatePath("/products");
      return { success: true };
    }
    return { success: false, error: result.error || "Failed to update stock in database." };
  } catch (error: any) {
    console.error("Error updating stock:", error);
    return { success: false, error: error.message || "Error occurred while updating stock." };
  }
}

export async function updateProductAction(
  slug: string,
  data: { price?: number; discountPercentage?: number; stockQuantity?: number }
) {
  try {
    const { updateProductInDb } = await import("@/lib/db");
    
    if (data.price !== undefined && data.price < 0) {
      return { success: false, error: "Price cannot be negative." };
    }
    if (data.discountPercentage !== undefined && (data.discountPercentage < 0 || data.discountPercentage > 100)) {
      return { success: false, error: "Discount percentage must be between 0 and 100." };
    }
    if (data.stockQuantity !== undefined && data.stockQuantity < 0) {
      return { success: false, error: "Stock quantity cannot be negative." };
    }

    const result = await updateProductInDb(slug, data);
    if (result.success) {
      revalidatePath("/admin");
      revalidatePath(`/products/${slug}`);
      revalidatePath("/products");
      return { success: true };
    }
    return { success: false, error: result.error || "Failed to update product details." };
  } catch (error: any) {
    console.error("Error updating product details:", error);
    return { success: false, error: error.message || "Error occurred while updating product details." };
  }
}
