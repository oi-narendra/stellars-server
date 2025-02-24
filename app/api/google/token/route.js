import { googleService } from "@/app/services/googleService";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const token = await googleService.getAccessToken();
    return NextResponse.json({ token });
  } catch (error) {
    console.error("Failed to get Google token:", error);
    return NextResponse.json({ error: "Failed to get token" }, { status: 500 });
  }
}
