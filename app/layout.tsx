import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Se você estava usando a Inter, deixe assim. Se usava outra, mantenha a sua.
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gestão de Clientes",
  description: "Painel administrativo de clientes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} min-h-full flex flex-col`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}