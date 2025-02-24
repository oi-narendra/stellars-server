import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryDevtools } from "./components/ReactQueryDevtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60, // 1 hour
      cacheTime: 1000 * 60 * 60 * 2, // 2 hours
    },
  },
})();

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
        <QueryClientProvider client={queryClient}>
          {children}
          {process.env.NODE_ENV === "development" && <QueryDevtools />}
        </QueryClientProvider>
      </body>
    </html>
  );
}
