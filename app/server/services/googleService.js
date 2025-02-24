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
      const keyFile = path.join(process.cwd(), "service-account.json");
      const credentials = JSON.parse(fs.readFileSync(keyFile, "utf8"));

      this.auth = new google.auth.GoogleAuth({
        credentials,
        scopes: ["https://www.googleapis.com/auth/drive.readonly"],
      });

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
}

// Singleton instance
export const googleService = new GoogleService();
