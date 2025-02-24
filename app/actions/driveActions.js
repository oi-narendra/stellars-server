"use server";

import { googleService } from "../server/services/googleService";

export async function getDriveImageUrl(fileId) {
  if (!fileId) return null;

  try {
    const token = await googleService.getAccessToken();
    return { token };
  } catch (error) {
    console.error("Failed to get drive token:", error);
    return { error: error.message };
  }
}
