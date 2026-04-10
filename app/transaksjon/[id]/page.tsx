import { notFound } from "next/navigation";
import Link from "next/link";
import { transactions, formatAmount, formatDate } from "@/lib/data";
import { ArrowLeft, CheckCircle2, Clock, RefreshCcw } from "lucide-react";

const catColor: Record<string, { bg: string; fg: string }> = {
  "Dagligvarer":       { bg: "rgba(255,138,46,0.18)", fg: "#FF8A2E" },
  "Underholdning":     { bg: "rgba(100,160,255,0.15)", fg: "#64A0FF" },
  "Inntekt":           { bg: "rgba(0,212,176,0.15)",  fg: "#00D4B0" },
  "Drivstoff":         { bg: "rgba(255,80,50,0.15)",  fg: "#FF5032" },
  "Transport":         { bg: "rgba(130,170,255,0.13)", fg: "#82AAFF" },
  "Helse":             { bg: "rgba(46,204,154,0.15)", fg: "#2ECC9A" },
  "Kafé & Restaurant": { bg: "rgba(255,200,50,0.15)", fg: "#FFC832" },
  "Klær":              { bg: "rgba(255,120,170,0.15)", fg: "#FF78AA" },
  "Alkohol":           { bg: "rgba(200,80,120,0.12)", fg: "#C85078" },
  "Sparing":           { bg: "rgba(0,212,176,0.15)",  fg: "#00D4B0" },
  "Netthandel":        { bg: "rgba(100,160,255,0.15)", fg: "#64A0FF" },
  "Renter":            { bg: "rgba(0,212,176,0.13)",  fg: "#00D4B0" },
  "Innskudd":          { bg: "rgba(0,212,176,0.13)",  fg: "#00D4B0" },
  "Uttak":             { bg: "rgba(255,91,91,0.13)",  fg: "#FF5B5B" },
};

const statusConfig = {
  completed: { label: "Gjennomført", color: "#166534", icon: CheckCircle2 },
  pending:   { label: "Venter",      color: "#b45309", icon: Clock },
  refunded:  { label: "Refundert",   color: "#0891b2", icon: RefreshCcw },
};

export default async function TransactionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const txn = transactions.find((t) => t.id === id);
  if (!txn) notFound();

  const status = statusConfig[txn.status];
  const StatusIcon = status.icon;
  const colors = catColor[txn.category] ?? { bg: "#f3f4f6", fg: "#6b7280" };

  const rows = [
    { label: "Dato og tid",   value: `${formatDate(txn.date)} kl. ${txn.time}` },
    txn.description && { label: "Beskrivelse",  value: txn.description },
    txn.cardLast4   && { label: "Kort",          value: `Visa •••• ${txn.cardLast4}` },
    txn.location    && { label: "Sted",           value: txn.location },
    { label: "Kategori",     value: txn.category },
    { label: "Referanse",    value: txn.id.toUpperCase() },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <div style={{ minHeight: "100dvh", paddingBottom: 40 }}>
      {/* Back bar */}
      <div style={{ padding: "58px 22px 20px", display: "flex", alignItems: "center", gap: 12 }}>
        <Link href="/" className="glass-sm press" style={{
          width: 40, height: 40, borderRadius: 13,
          display: "flex", alignItems: "center", justifyContent: "center",
          textDecoration: "none", color: "var(--text)", border: "none",
        }}>
          <ArrowLeft size={19} strokeWidth={2} />
        </Link>
        <span style={{ fontSize: 17, fontWeight: 700, color: "var(--text)" }}>Detaljer</span>
      </div>

      {/* Hero card */}
      <div className="glass" style={{ margin: "0 18px", borderRadius: 26, padding: "32px 24px", textAlign: "center" }}>
        {/* Icon with glow */}
        <div style={{ position: "relative", display: "inline-block", marginBottom: 20 }}>
          <div style={{
            position: "absolute", inset: -8,
            background: colors.bg,
            borderRadius: "50%",
            filter: "blur(12px)",
            zIndex: 0,
          }} />
          <div style={{
            position: "relative", zIndex: 1,
            width: 72, height: 72, borderRadius: 22,
            background: colors.bg,
            border: `1px solid ${colors.fg}30`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 34,
          }}>
            {txn.icon}
          </div>
        </div>

        <div style={{ fontSize: 17, fontWeight: 700, color: "var(--text)", marginBottom: 4 }}>{txn.merchant}</div>
        <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 24, fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase" }}>{txn.category}</div>

        <div className="tabular" style={{
          fontSize: 52, fontWeight: 800, letterSpacing: "-2px",
          color: txn.amount > 0 ? "var(--green)" : "var(--text)",
          lineHeight: 1,
        }}>
          {txn.amount > 0 ? "+" : "–"}{formatAmount(txn.amount)}
          <span style={{ fontSize: 22, fontWeight: 500, marginLeft: 6, opacity: 0.5 }}>kr</span>
        </div>

        {/* Status badge */}
        <div style={{ marginTop: 20, display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 20, background: `${status.color}16`, border: `1px solid ${status.color}28` }}>
          <StatusIcon size={13} style={{ color: status.color }} />
          <span style={{ fontSize: 12, fontWeight: 700, color: status.color }}>{status.label}</span>
        </div>
      </div>

      {/* Detail rows */}
      <div className="glass" style={{ margin: "12px 18px 0", borderRadius: 22, overflow: "hidden", padding: "0 20px" }}>
        {rows.map((row, i) => (
          <div key={row.label} style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "16px 0",
            borderBottom: i < rows.length - 1 ? "1px solid #f0f4fb" : "none",
            gap: 16,
          }}>
            <span style={{ fontSize: 13, color: "var(--muted)", fontWeight: 500, flexShrink: 0 }}>{row.label}</span>
            <span style={{ fontSize: 13, color: "var(--text)", fontWeight: 600, textAlign: "right" }}>{row.value}</span>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: 10, margin: "12px 18px 0" }}>
        <button className="glass-sm press" style={{
          flex: 1, padding: "16px", borderRadius: 18, border: "none",
          color: "var(--text2)", fontSize: 14, fontWeight: 600, cursor: "pointer",
        }}>
          Bestrid
        </button>
        <button className="press" style={{
          flex: 1, padding: "16px", borderRadius: 18, border: "none",
          background: "var(--primary)", color: "white", fontSize: 14, fontWeight: 700, cursor: "pointer",
        }}>
          Gjenta betaling
        </button>
      </div>
    </div>
  );
}
