import { googleService } from "../services/googleService";

const driveCache = new Map();

export async function getDriveURlFromId(fileId) {
  if (!fileId) return null;

  // Check cache first
  if (driveCache.has(fileId)) {
    return driveCache.get(fileId);
  }

  try {
    const file = await googleService.getDriveFile(fileId);
    const url = file.webContentLink.replace("&export=download", "");
    driveCache.set(fileId, url);
    return url;
  } catch (error) {
    console.error("Failed to get drive URL:", error);
    return null;
  }
}

// For client-side use where we already have the token
export function getDriveUrlWithToken(fileId, token) {
  if (!fileId) return null;
  return `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&access_token=${token}`;
}
