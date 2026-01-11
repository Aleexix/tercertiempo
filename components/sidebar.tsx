// components/sidebar.tsx
'use client';

import Link from 'next/link';
import { Home, Calendar, Trophy, Users, Menu, Beer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

const menuItems = [
  { icon: Home, label: 'Inicio', href: '/' },
  { icon: Calendar, label: 'Eventos', href: '/eventos' },
  { icon: Trophy, label: 'Inventario', href: '/inventario' },
  { icon: Users, label: 'Reservas', href: '/reservas' },
  { icon: Beer, label: 'Menú', href: '/menu' },
];

export function Sidebar() {
  return (
    <>
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-20 flex-col items-center py-6 bg-zinc-950 border-r border-zinc-800 z-50">
        <Link href="/" className="mb-8">
          <div className="w-12 h-12 bg-green-700 rounded-lg flex items-center justify-center">
            <Trophy className="w-6 h-6 text-white" />
          </div>
        </Link>
        
        <nav className="flex flex-col gap-4 flex-1">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="w-12 h-12 rounded-lg flex items-center justify-center hover:bg-zinc-800 transition-colors group relative"
            >
              <item.icon className="w-5 h-5 text-zinc-400 group-hover:text-yellow-400 transition-colors" />
              <span className="absolute left-16 px-3 py-2 bg-zinc-800 rounded-md text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {item.label}
              </span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Sidebar Mobile */}
      <Sheet>
        <SheetTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon"
            className="fixed top-4 left-4 z-50 lg:hidden bg-zinc-900 hover:bg-zinc-800"
          >
            <Menu className="w-5 h-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 bg-zinc-950 border-zinc-800">
          <div className="flex flex-col gap-6 pt-8">
            <Link href="/" className="flex items-center gap-3 px-2">
              <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center">
                <Trophy className="w-5 h-5 text-black" />
              </div>
              <span className="text-xl font-bold text-white">Sports Bar</span>
            </Link>
            
            <nav className="flex flex-col gap-2">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-zinc-800 transition-colors group"
                >
                  <item.icon className="w-5 h-5 text-zinc-400 group-hover:text-yellow-400 transition-colors" />
                  <span className="text-white">{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}