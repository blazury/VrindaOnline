import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Return mock verification success immediately
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to verify payment" },
      { status: 500 }
    );
  }
}
