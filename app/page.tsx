import { transactions } from "@/lib/data";
import AccountDashboard from "@/components/AccountDashboard";
import BottomNav from "@/components/BottomNav";
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
        {/* Wordmark */}
        <div>
          <div style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--muted)",
            marginBottom: 2,
          }}>
            ada bank
          </div>
          <div style={{ fontSize: 22, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.4px" }}>
            God dag, Ada
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
