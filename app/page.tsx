import { transactions } from "@/lib/data";
import AccountDashboard from "@/components/AccountDashboard";
import BottomNav from "@/components/BottomNav";
import { Bell, Settings } from "lucide-react";

export default function Home() {
  return (
    <div style={{ minHeight: "100dvh", background: "var(--bg)" }}>

      {/* Header */}
      <div style={{
        padding: "56px 20px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <div>
          <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 2 }}>God dag</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: "var(--text)" }}>Ada Lovelace</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button style={{
            width: 40, height: 40, borderRadius: 12,
            background: "var(--surface)", border: "1px solid var(--border)",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", color: "var(--muted)",
          }}>
            <Bell size={18} />
          </button>
          <button style={{
            width: 40, height: 40, borderRadius: 12,
            background: "var(--surface)", border: "1px solid var(--border)",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", color: "var(--muted)",
          }}>
            <Settings size={18} />
          </button>
        </div>
      </div>

      <AccountDashboard allTransactions={transactions} />

      <BottomNav />
    </div>
  );
}
