import { Bebas_Neue, Inter } from 'next/font/google';
import './globals.css';

// Fuente para títulos
const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
});

// Fuente para texto normal
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${bebasNeue.variable} ${inter.variable}`}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}