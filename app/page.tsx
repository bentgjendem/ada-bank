import { transactions } from "@/lib/data";
import AccountDashboard from "@/components/AccountDashboard";
import BottomNav from "@/components/BottomNav";
import Link from "next/link";
import { Bell, SlidersHorizontal } from "lucide-react";

export default function Home() {
  return (
    <div style={{ minHeight: "100dvh" }}>

      {/* ── Header ── */}
      <div style={{
        padding: "58px 22px 16px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        {/* Avatar + greeting */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link href="/profil" style={{ textDecoration: "none", position: "relative", display: "inline-block", flexShrink: 0 }}>
            {/* Gradient ring */}
            <div style={{
              position: "absolute", inset: -2,
              borderRadius: "50%",
              background: "linear-gradient(135deg, var(--amber) 0%, var(--teal) 100%)",
              zIndex: 0,
            }} />
            <div style={{
              position: "relative", zIndex: 1,
              width: 40, height: 40, borderRadius: "50%",
              border: "2px solid #ffffff",
              overflow: "hidden",
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/avatar.png" alt="Bent Gjendem" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          </Link>
          <div>
            <div style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--text2)",
              marginBottom: 2,
            }}>
              ada bank
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.4px" }}>
              God dag, Bent
            </div>
          </div>
        </div>

        {/* Icon buttons */}
        <div style={{ display: "flex", gap: 8 }}>
          {[Bell, SlidersHorizontal].map((Icon, i) => (
            <button
              key={i}
              className="glass-sm press"
              style={{
                width: 40, height: 40, borderRadius: 13,
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", border: "none", color: "var(--text2)",
              }}
            >
              <Icon size={17} strokeWidth={1.8} />
            </button>
          ))}
        </div>
      </div>

      <AccountDashboard allTransactions={transactions} />
      <BottomNav />
    </div>
  );
}
