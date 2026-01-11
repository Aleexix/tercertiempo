// app/page.tsx
import { Sidebar } from '@/components/sidebar';
import { LicoreriaCRUD } from '@/components/inventario';
export default function InventarioPage() {
  return (
    <div className="flex min-h-screen bg-zinc-950">
      <Sidebar />
      <main className="flex-1 ml-20">
        <LicoreriaCRUD />
      </main>
    </div>
  );
}