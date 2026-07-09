import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

let prisma: any;

try {
  const connectionString = 
    process.env.POSTGRES_PRISMA_URL || 
    process.env.POSTGRES_URL || 
    process.env.DATABASE_URL;

  if (connectionString) {
    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool);
    prisma = new PrismaClient({ adapter });
  } else {
    prisma = new Proxy({}, {
      get() {
        throw new Error("PrismaClient is not initialized because database connection string (POSTGRES_PRISMA_URL, POSTGRES_URL, or DATABASE_URL) is missing.");
      }
    });
  }
} catch (e: any) {
  console.warn("Failed to initialize Prisma Client adapter:", e);
  const errMsg = e.message || String(e);
  prisma = new Proxy({}, {
    get() {
      throw new Error(`PrismaClient failed to initialize. Error: ${errMsg}`);
    }
  });
}

export { prisma };

// Hardcoded fallback product data
export interface ProductData {
  slug: string;
  name: string;
  price: number;
  stockQuantity: number;
}

export const defaultProducts: ProductData[] = [
  { slug: "ghee", name: "Vedic A2 Ghee", price: 1250, stockQuantity: 1 },
  { slug: "honey", name: "Raw Himalayan Honey", price: 850, stockQuantity: 1 },
  { slug: "moringa", name: "Organic Moringa Leaf Powder", price: 450, stockQuantity: 1 },
  { slug: "coconut-oil", name: "Cold Pressed Coconut Oil", price: 950, stockQuantity: 1 },
  { slug: "premium-masala", name: "Premium Masala", price: 350, stockQuantity: 1 }
];

// Helper to seed database if empty
export async function seedProductsIfEmpty() {
  try {
    const count = await prisma.product.count();
    if (count === 0) {
      console.log("Seeding default products into database...");
      for (const prod of defaultProducts) {
        await prisma.product.create({
          data: {
            slug: prod.slug,
            name: prod.name,
            price: prod.price,
            stockQuantity: prod.stockQuantity
          }
        });
      }
      console.log("Seeding complete!");
    }
  } catch (error) {
    console.warn("Database connection failed during seeding. Using local fallback.");
  }
}

// Fetch all products
export async function getAllProducts(): Promise<ProductData[]> {
  try {
    await seedProductsIfEmpty();
    const dbProducts = await prisma.product.findMany({
      orderBy: { createdAt: "asc" }
    });
    return dbProducts.map((p: any) => ({
      slug: p.slug,
      name: p.name,
      price: p.price,
      stockQuantity: p.stockQuantity
    }));
  } catch (error) {
    console.warn("Using fallback local products:", error);
    return defaultProducts;
  }
}

// Fetch single product by slug
export async function getProductBySlug(slug: string): Promise<ProductData | null> {
  try {
    await seedProductsIfEmpty();
    const dbProduct = await prisma.product.findUnique({
      where: { slug }
    });
    if (!dbProduct) return null;
    return {
      slug: dbProduct.slug,
      name: dbProduct.name,
      price: dbProduct.price,
      stockQuantity: dbProduct.stockQuantity
    };
  } catch (error) {
    console.warn(`Using fallback local product for ${slug}:`, error);
    const fallback = defaultProducts.find(p => p.slug === slug);
    return fallback || null;
  }
}

// Update product stock
export async function updateProductStock(slug: string, newStock: number): Promise<{ success: boolean; error?: string }> {
  try {
    await prisma.product.update({
      where: { slug },
      data: { stockQuantity: newStock }
    });
    return { success: true };
  } catch (error: any) {
    console.warn(`Failed to update DB stock for ${slug}:`, error);
    return { success: false, error: error.message || String(error) };
  }
}

// Fetch all orders
export async function getAllOrders() {
  try {
    return await prisma.order.findMany({
      orderBy: { createdAt: "desc" }
    });
  } catch (error) {
    console.warn("Failed to fetch orders from database:", error);
    return [];
  }
}

// Create new order
export async function createOrderInDb(data: {
  razorpayOrderId: string;
  customerDetails: any;
  productId?: string;
  items: any;
  amount: number;
  status?: string;
}) {
  try {
    return await prisma.order.create({
      data: {
        razorpayOrderId: data.razorpayOrderId,
        customerDetails: data.customerDetails,
        productId: data.productId || null,
        items: data.items,
        amount: data.amount,
        status: data.status || "pending"
      }
    });
  } catch (error) {
    console.error("Failed to save order in DB:", error);
    return null;
  }
}

// Update order payment status
export async function updateOrderStatusInDb(razorpayOrderId: string, status: string, paymentId?: string) {
  try {
    return await prisma.order.update({
      where: { razorpayOrderId },
      data: {
        status,
        razorpayPaymentId: paymentId
      }
    });
  } catch (error) {
    console.error("Failed to update order status in DB:", error);
    return null;
  }
}
