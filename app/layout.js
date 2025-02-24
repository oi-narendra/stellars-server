import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from "./providers/QueryProvider";
import { QueryDevtools } from "./components/ReactQueryDevtools";

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
        <QueryProvider>
          {children}
          {process.env.NODE_ENV === "development" && <QueryDevtools />}
        </QueryProvider>
      </body>
    </html>
  );
}
