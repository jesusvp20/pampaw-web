import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pampaw | Veterinaria Barranquilla",
  description: "Servicios de veterinaria en Barranquilla. Cuida la salud y bienestar de tus mascotas con los mejores especialistas.",
  keywords: ["veterinaria", "veterinaria barranquilla", "clínica veterinaria", "cuidado de mascotas"],
  openGraph: {
    title: "Pampaw | Veterinaria Barranquilla",
    description: "Servicios de veterinaria en Barranquilla.",
    locale: "es_CO",
    type: "website",
  },
};

import SkeletonDevTools from "@/components/ui/skeleton-devtools";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        {process.env.NODE_ENV === "development" && <SkeletonDevTools />}
      </body>
    </html>
  );
}
