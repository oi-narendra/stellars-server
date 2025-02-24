"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/core/store/authStore";
import Sidebar from "@/app/dashboard/components/Sidebar";

export default function DashboardLayout({ children }) {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <div className="flex h-screen">
      <Sidebar user={user} onLogout={handleLogout} />
      <main className="flex-1 overflow-auto bg-gray-50">
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
