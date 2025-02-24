"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, LayoutDashboard, LogOut } from "lucide-react";

const NavItem = ({ href, icon: Icon, children, isActive }) => (
  <Link
    href={href}
    className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
      isActive
        ? "bg-blue-100 text-blue-900"
        : "hover:bg-gray-100 text-gray-700 hover:text-gray-900"
    }`}
  >
    <Icon size={20} />
    <span>{children}</span>
  </Link>
);

export default function Sidebar({ user, onLogout }) {
  const pathname = usePathname();

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Events", href: "/dashboard/events", icon: CalendarDays },
  ];

  console.log("User", user);

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200 w-64">
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-6">
          <img
            src="/stellars-logo.png"
            alt="Stellars Logo"
            className="h-8 w-auto"
          />
        </div>

        <nav className="space-y-1">
          {navigation.map((item) => (
            <NavItem
              key={item.name}
              href={item.href}
              icon={item.icon}
              isActive={pathname === item.href}
            >
              {item.name}
            </NavItem>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-4 border-t border-gray-200">
        <div className="flex flex-col space-y-3">
          <div className="text-sm text-gray-700 truncate">{user.email}</div>
          <button
            onClick={onLogout}
            className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors"
          >
            <LogOut size={18} />
            <span>Sign out</span>
          </button>
        </div>
      </div>
    </div>
  );
}
