import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "ada bank",
  description: "Moderne norsk bank – inspirert av Ada Lovelace",
};

export const viewport: Viewport = {
  themeColor: "#dbeafe",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nb" className={inter.className}>
      <body>
        {children}
      </body>
    </html>
  );
}
