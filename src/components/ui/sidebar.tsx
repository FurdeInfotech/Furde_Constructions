'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Menu, Images, FolderOpen, LogOut } from 'lucide-react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Sidebar({ className, ...props }: SidebarProps) {
  const menuItems = [
    {
      title: 'Gallery',
      href: '/dashboard/gallery',
      icon: Images,
    },
    {
      title: 'Projects',
      href: '/dashboard/projects',
      icon: FolderOpen,
    },
  ];

  return (
    <div className={cn('pb-12 w-64', className)} {...props}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Admin Dashboard
          </h2>
          <div className="space-y-1">
            {menuItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.title}
                </Button>
              </Link>
            ))}
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={() => signOut({ callbackUrl: '/sign-in' })}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface MobileSidebarProps {
  children: React.ReactNode;
}

export function MobileSidebar({ children }: MobileSidebarProps) {
  return (
    <Button variant="outline" size="icon" className="shrink-0 md:hidden">
      <Menu className="h-5 w-5" />
      <span className="sr-only">Toggle navigation menu</span>
    </Button>
  );
}
