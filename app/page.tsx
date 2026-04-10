import Link from "next/link";
import { account, transactions, formatAmount } from "@/lib/data";
import TransactionList from "@/components/TransactionList";
import BottomNav from "@/components/BottomNav";
import { ArrowUpRight, ArrowDownLeft, Bell, Settings } from "lucide-react";

export default function Home() {
  const thisMonth = transactions
    .filter((t) => t.date.startsWith("2026-04"))
    .reduce((sum, t) => (t.amount < 0 ? sum + Math.abs(t.amount) : sum), 0);

  const income = transactions
    .filter((t) => t.date.startsWith("2026-04") && t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div style={{ minHeight: "100dvh", background: "var(--bg)" }}>

      {/* Header */}
      <div style={{
        padding: "56px 20px 0",
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
            width: 40, height: 40,
            borderRadius: 12,
            background: "var(--surface)",
            border: "1px solid var(--border)",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer",
            color: "var(--muted)",
          }}>
            <Bell size={18} />
          </button>
          <button style={{
            width: 40, height: 40,
            borderRadius: 12,
            background: "var(--surface)",
            border: "1px solid var(--border)",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer",
            color: "var(--muted)",
          }}>
            <Settings size={18} />
          </button>
        </div>
      </div>

      {/* Balance card */}
      <div style={{
        margin: "24px 20px 0",
        padding: "28px 24px",
        borderRadius: 24,
        background: "linear-gradient(135deg, #1a1030 0%, #2d1b69 50%, #7b61ff 100%)",
        boxShadow: "0 20px 60px rgba(123,97,255,0.25), 0 4px 20px rgba(0,0,0,0.4)",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: -50, right: -50,
          width: 200, height: 200, borderRadius: "50%",
          background: "rgba(255,255,255,0.05)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: -80, left: -30,
          width: 250, height: 250, borderRadius: "50%",
          background: "rgba(0,210,200,0.06)",
          pointerEvents: "none",
        }} />

        <div style={{ position: "relative" }}>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 8 }}>
            {account.name} · {account.iban.slice(-4).padStart(account.iban.length, "·")}
          </div>
          <div
            className="tabular"
            style={{
              fontSize: 44,
              fontWeight: 800,
              color: "white",
              letterSpacing: "-1.5px",
              lineHeight: 1.1,
            }}
          >
            {formatAmount(account.balance)}
            <span style={{ fontSize: 22, fontWeight: 500, marginLeft: 6, opacity: 0.6 }}>kr</span>
          </div>

          <div style={{ display: "flex", gap: 24, marginTop: 20 }}>
            <div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 3, textTransform: "uppercase", letterSpacing: "0.06em" }}>Inn april</div>
              <div className="tabular" style={{ fontSize: 15, fontWeight: 700, color: "#4ade80" }}>
                +{formatAmount(income)} kr
              </div>
            </div>
            <div style={{ width: 1, background: "rgba(255,255,255,0.1)" }} />
            <div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 3, textTransform: "uppercase", letterSpacing: "0.06em" }}>Ut april</div>
              <div className="tabular" style={{ fontSize: 15, fontWeight: 700, color: "rgba(255,255,255,0.75)" }}>
                –{formatAmount(thisMonth)} kr
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 12,
        margin: "16px 20px 0",
      }}>
        <Link href="/overfor" style={{ textDecoration: "none" }}>
          <div style={{
            padding: "16px 20px",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 18,
            display: "flex",
            alignItems: "center",
            gap: 12,
            cursor: "pointer",
          }}>
            <div style={{
              width: 40, height: 40,
              borderRadius: 12,
              background: "rgba(123,97,255,0.15)",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <ArrowUpRight size={20} style={{ color: "var(--accent)" }} />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text)" }}>Overfør</div>
              <div style={{ fontSize: 11, color: "var(--muted)" }}>Til konto</div>
            </div>
          </div>
        </Link>

        <Link href="/betal" style={{ textDecoration: "none" }}>
          <div style={{
            padding: "16px 20px",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 18,
            display: "flex",
            alignItems: "center",
            gap: 12,
            cursor: "pointer",
          }}>
            <div style={{
              width: 40, height: 40,
              borderRadius: 12,
              background: "rgba(0,210,200,0.12)",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <ArrowDownLeft size={20} style={{ color: "var(--accent2)" }} />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text)" }}>Betal</div>
              <div style={{ fontSize: 11, color: "var(--muted)" }}>Regning / KID</div>
            </div>
          </div>
        </Link>
      </div>

      {/* Transactions */}
      <div style={{
        padding: "24px 20px 0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <div style={{ fontSize: 17, fontWeight: 700, color: "var(--text)" }}>Transaksjoner</div>
        <button style={{
          fontSize: 12,
          color: "var(--accent)",
          background: "none",
          border: "none",
          cursor: "pointer",
          fontWeight: 500,
        }}>
          Se alle
        </button>
      </div>

      <div style={{ marginTop: 12 }}>
        <TransactionList transactions={transactions} />
      </div>

      <BottomNav />
    </div>
  );
}
