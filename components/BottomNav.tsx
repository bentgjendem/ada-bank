"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ArrowLeftRight, CreditCard, User } from "lucide-react";

const nav = [
  { href: "/", icon: Home, label: "Hjem" },
  { href: "/overfor", icon: ArrowLeftRight, label: "Overfør" },
  { href: "/kort", icon: CreditCard, label: "Kort" },
  { href: "/profil", icon: User, label: "Profil" },
];

export default function BottomNav() {
  const path = usePathname();

  return (
    <nav
      style={{
        position: "fixed",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        maxWidth: "430px",
        background: "rgba(13,13,20,0.92)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderTop: "1px solid var(--border)",
        paddingBottom: "env(safe-area-inset-bottom, 8px)",
        zIndex: 100,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-around", padding: "10px 0 6px" }}>
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
                gap: 4,
                padding: "6px 16px",
                borderRadius: 12,
                textDecoration: "none",
                color: active ? "var(--accent)" : "var(--muted)",
                transition: "color 0.2s",
              }}
            >
              <Icon size={22} strokeWidth={active ? 2.5 : 1.8} />
              <span style={{ fontSize: 10, fontWeight: active ? 600 : 400, letterSpacing: "0.02em" }}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
