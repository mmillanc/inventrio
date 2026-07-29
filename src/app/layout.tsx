import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Inventrio · Inventario para laboratorios y pymes",
  description:
    "Sistema modular de inventario con planes Laboratorio y Pyme: artículos, lotes, vencimientos y reportes.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} bg-slate-50 font-sans antialiased`}>{children}</body>
    </html>
  );
}
