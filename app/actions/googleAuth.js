"use server";

import { googleService } from "../server/services/googleService";

export async function getGoogleToken() {
  try {
    const token = await googleService.getAccessToken();
    return { token };
  } catch (error) {
    console.error("Failed to get Google token:", error);
    return { error: error.message };
  }
} 