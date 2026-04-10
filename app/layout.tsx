import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "ada bank",
  description: "Moderne norsk bank – inspirert av Ada Lovelace",
};

export const viewport: Viewport = {
  themeColor: "#07070d",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nb" className={inter.className}>
      <body style={{ background: "var(--bg)", color: "var(--text)" }}>
        {/* Ambient light blobs – makes glass blur visible and alive */}
        <div
          aria-hidden
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 0,
            pointerEvents: "none",
            background: `
              radial-gradient(ellipse 60% 50% at 20% 5%,  rgba(255,138,46,0.14) 0%, transparent 100%),
              radial-gradient(ellipse 55% 45% at 82% 90%, rgba(0,212,176,0.11) 0%, transparent 100%),
              radial-gradient(ellipse 45% 35% at 65% 30%, rgba(255,100,40,0.05) 0%, transparent 100%)
            `,
          }}
        />
        <div style={{ position: "relative", zIndex: 1 }}>
          {children}
        </div>
      </body>
    </html>
  );
}
