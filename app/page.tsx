// app/page.tsx
import { Sidebar } from '@/components/sidebar';

export default function Home() {
  return (
    <div className="flex min-h-screen bg-black">
      <Sidebar />
      <main className="flex-1 ml-20">
        
      </main>
    </div>
  );
}