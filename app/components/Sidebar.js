"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, LayoutDashboard, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const NavItem = ({ href, icon: Icon, children, isActive }) => (
  <Link href={href} className="no-underline">
    <Button
      variant={isActive ? "secondary" : "ghost"}
      className="w-full justify-start"
    >
      <Icon className="mr-2 h-4 w-4" />
      {children}
    </Button>
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
    <div className="flex flex-col h-full bg-background border-r w-64">
      <div className="p-6">
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

      <div className="mt-auto p-6">
        <Separator className="mb-6" />
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground truncate">
            {user?.email}
          </p>
          <Button
            variant="destructive"
            size="sm"
            className="w-full justify-start"
            onClick={onLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign out
          </Button>
        </div>
      </div>
    </div>
  );
}
