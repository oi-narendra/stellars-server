import { google } from "googleapis";
import fs from "fs";
import path from "path";

class GoogleService {
  constructor() {
    this.auth = null;
    this.drive = null;
    this.initialized = false;
  }

  async initialize() {
    if (this.initialized) return;

    try {
      // Read service account file
      const keyFile = path.join(process.cwd(), "service-account.json");
      const credentials = JSON.parse(fs.readFileSync(keyFile, "utf8"));

      // Create auth client
      this.auth = new google.auth.GoogleAuth({
        credentials,
        scopes: ["https://www.googleapis.com/auth/drive.readonly"],
      });

      // Initialize drive client
      this.drive = google.drive({ version: "v3", auth: this.auth });
      this.initialized = true;
    } catch (error) {
      console.error("Failed to initialize Google service:", error);
      throw new Error("Failed to initialize Google service");
    }
  }

  async getAccessToken() {
    if (!this.initialized) {
      await this.initialize();
    }
    const token = await this.auth.getAccessToken();
    return token;
  }

  async getDriveFile(fileId) {
    if (!this.initialized) {
      await this.initialize();
    }

    try {
      const response = await this.drive.files.get({
        fileId,
        fields: "id, name, mimeType, webContentLink",
      });
      return response.data;
    } catch (error) {
      console.error("Failed to get drive file:", error);
      throw new Error("Failed to get drive file");
    }
  }
}

// Singleton instance
export const googleService = new GoogleService();
