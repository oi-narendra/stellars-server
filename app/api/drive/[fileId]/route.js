import { googleService } from "@/app/server/services/googleService";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { fileId } = params;

  try {
    const token = await googleService.getAccessToken();
    const response = await fetch(
      `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) throw new Error("Failed to fetch image");

    const blob = await response.blob();
    return new NextResponse(blob, {
      headers: {
        "Content-Type": response.headers.get("Content-Type") || "image/jpeg",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("Failed to proxy drive image:", error);
    return new NextResponse(null, { status: 500 });
  }
}
