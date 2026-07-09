import { NextResponse } from "next/server";
import { getAllProducts } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const products = await getAllProducts();
    const inventoryMap: Record<string, number> = {};
    products.forEach((p) => {
      inventoryMap[p.slug] = p.stockQuantity;
    });
    return NextResponse.json({ inventory: inventoryMap });
  } catch (e) {
    return NextResponse.json({ error: "Failed to load inventory" }, { status: 500 });
  }
}
