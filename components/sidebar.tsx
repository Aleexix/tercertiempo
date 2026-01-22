// components/sidebar.tsx
'use client';

import Link from 'next/link';
import { Home, Calendar, Package, CalendarClock , Beer , ScanBarcode  } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { usePathname } from 'next/navigation';

const menuItems = [
  { icon: Home, label: 'Inicio', href: '/' },
  { icon: Calendar, label: 'Eventos', href: '/eventos' },
  { icon: Package, label: 'Inventario', href: '/inventario' },
  { icon: CalendarClock , label: 'Reservas', href: '/mesa' },
  { icon: ScanBarcode , label: 'Scanner-barcode', href: '/#' },
];

export function Sidebar() {
  const pathname = usePathname();
  const activeIndex = menuItems.findIndex(item => item.href === pathname);
  
  return (
    <>
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-20 flex-col items-center py-6 bg-zinc-950 border-r border-zinc-800 z-50">
        <Link href="/" className="mb-8">
          <div className="w-12 h-12  rounded-lg flex items-center justify-center">
            <Beer  className="w-6 h-6 text-white" />
          </div>
        </Link>
        
        <nav className="flex flex-col gap-4 flex-1 relative">
          {/* Indicador animado de sección activa */}
          {activeIndex >= 0 && (
            <div 
              className="absolute left-0 w-12 h-12 bg-green-700 rounded-lg transition-all duration-500 ease-out"
              style={{
                transform: `translateY(${activeIndex * 64}px)`
              }}
            />
          )}
          
          {menuItems.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="w-12 h-12 rounded-lg flex items-center justify-center hover:bg-zinc-800 transition-colors group relative z-10"
              >
                <item.icon className={`w-5 h-5 transition-colors ${
                  isActive ? 'text-white' : 'text-zinc-400 group-hover:text-yellow-400'
                }`} />
                <span className="absolute left-16 px-3 py-2 bg-zinc-800 rounded-md text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {item.label}
                </span>
              </Link>
            );
          })}
              </nav>
            </aside>
          </>
        );
      }