"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ArrowLeftRight, CreditCard, User } from "lucide-react";

const nav = [
  { href: "/",       icon: Home,           label: "Hjem"   },
  { href: "/overfor",icon: ArrowLeftRight,  label: "Overfør"},
  { href: "/kort",   icon: CreditCard,      label: "Kort"   },
  { href: "/profil", icon: User,            label: "Profil" },
];

export default function BottomNav() {
  const path = usePathname();

  return (
    <nav style={{
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      display: "flex",
      justifyContent: "center",
      padding: "0 0 calc(env(safe-area-inset-bottom, 12px) + 8px)",
      zIndex: 100,
      pointerEvents: "none",
    }}>
      <div
        className="glass-pill"
        style={{
          display: "flex",
          gap: 2,
          padding: "8px 8px",
          borderRadius: 32,
          pointerEvents: "all",
        }}
      >
        {nav.map(({ href, icon: Icon, label }) => {
          const active = path === href;
          return (
            <Link
              key={href}
              href={href}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 3,
                padding: "8px 18px",
                borderRadius: 24,
                textDecoration: "none",
                background: active ? "rgba(255,255,255,0.1)" : "transparent",
                boxShadow: active ? "inset 0 1px 0 rgba(255,255,255,0.15)" : "none",
                transition: "background 0.2s ease",
                minWidth: 64,
              }}
            >
              <Icon
                size={21}
                strokeWidth={active ? 2.4 : 1.7}
                style={{ color: active ? "var(--text)" : "var(--muted)", transition: "color 0.2s" }}
              />
              <span style={{
                fontSize: 10,
                fontWeight: active ? 700 : 500,
                color: active ? "var(--text)" : "var(--muted)",
                letterSpacing: "0.02em",
                transition: "color 0.2s",
              }}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
