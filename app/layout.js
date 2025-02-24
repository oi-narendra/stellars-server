import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./core/providers/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Stellars - Admin Panel",
  description: "Welcome to Stellars Admin Panel",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
