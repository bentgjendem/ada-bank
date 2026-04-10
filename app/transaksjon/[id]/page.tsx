import { notFound } from "next/navigation";
import Link from "next/link";
import { transactions, formatAmount, formatDate } from "@/lib/data";
import { ArrowLeft, MapPin, CreditCard, Clock, CheckCircle2, RefreshCcw } from "lucide-react";

export default async function TransactionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const txn = transactions.find((t) => t.id === id);
  if (!txn) notFound();

  const statusConfig = {
    completed: { label: "Gjennomført", color: "#22c55e", icon: CheckCircle2 },
    pending: { label: "Venter", color: "#f59e0b", icon: Clock },
    refunded: { label: "Refundert", color: "#7b61ff", icon: RefreshCcw },
  };

  const status = statusConfig[txn.status];
  const StatusIcon = status.icon;

  return (
    <div style={{ minHeight: "100dvh", background: "var(--bg)", paddingBottom: 40 }}>

      {/* Top bar */}
      <div style={{
        padding: "56px 20px 20px",
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}>
        <Link
          href="/"
          style={{
            width: 40, height: 40,
            borderRadius: 12,
            background: "var(--surface)",
            border: "1px solid var(--border)",
            display: "flex", alignItems: "center", justifyContent: "center",
            textDecoration: "none",
            color: "var(--text)",
            flexShrink: 0,
          }}
        >
          <ArrowLeft size={20} />
        </Link>
        <div style={{ fontSize: 17, fontWeight: 700, color: "var(--text)" }}>Transaksjonsdetaljer</div>
      </div>

      {/* Hero */}
      <div style={{
        margin: "0 20px",
        padding: "32px 24px",
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 24,
        textAlign: "center",
      }}>
        <div style={{
          width: 72,
          height: 72,
          borderRadius: 22,
          background: "var(--surface2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 36,
          margin: "0 auto 16px",
        }}>
          {txn.icon}
        </div>

        <div style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 4 }}>
          {txn.merchant}
        </div>
        <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 24 }}>
          {txn.category}
        </div>

        <div
          className="tabular"
          style={{
            fontSize: 48,
            fontWeight: 800,
            letterSpacing: "-1.5px",
            color: txn.amount > 0 ? "#4ade80" : "var(--text)",
            lineHeight: 1,
          }}
        >
          {txn.amount > 0 ? "+" : "–"}{formatAmount(txn.amount)}
          <span style={{ fontSize: 24, fontWeight: 500, marginLeft: 6, opacity: 0.6 }}>kr</span>
        </div>

        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          marginTop: 16,
          padding: "6px 14px",
          borderRadius: 20,
          background: `${status.color}18`,
          border: `1px solid ${status.color}30`,
        }}>
          <StatusIcon size={13} style={{ color: status.color }} />
          <span style={{ fontSize: 13, fontWeight: 600, color: status.color }}>
            {status.label}
          </span>
        </div>
      </div>

      {/* Details */}
      <div style={{
        margin: "16px 20px 0",
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 20,
        overflow: "hidden",
      }}>
        {[
          {
            icon: "📅",
            label: "Dato og tid",
            value: `${formatDate(txn.date)} kl. ${txn.time}`,
          },
          txn.description && {
            icon: "📝",
            label: "Beskrivelse",
            value: txn.description,
          },
          txn.cardLast4 && {
            icon: "💳",
            label: "Kort benyttet",
            value: `Visa •••• ${txn.cardLast4}`,
          },
          txn.location && {
            icon: "📍",
            label: "Sted",
            value: txn.location,
          },
          {
            icon: "🏷️",
            label: "Kategori",
            value: txn.category,
          },
          {
            icon: "🔖",
            label: "Referanse",
            value: txn.id.toUpperCase(),
          },
        ]
          .filter(Boolean)
          .map((row, i, arr) => {
            const item = row as { icon: string; label: string; value: string };
            return (
              <div
                key={item.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "16px 20px",
                  borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none",
                }}
              >
                <div style={{ fontSize: 20, width: 32, textAlign: "center", flexShrink: 0 }}>
                  {item.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 2, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: 14, color: "var(--text)", fontWeight: 500 }}>
                    {item.value}
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      {/* Actions */}
      <div style={{
        margin: "16px 20px 0",
        display: "flex",
        gap: 12,
      }}>
        <button style={{
          flex: 1,
          padding: "14px",
          borderRadius: 16,
          background: "var(--surface)",
          border: "1px solid var(--border)",
          color: "var(--text)",
          fontSize: 14,
          fontWeight: 600,
          cursor: "pointer",
        }}>
          Bestrid
        </button>
        <button style={{
          flex: 1,
          padding: "14px",
          borderRadius: 16,
          background: "rgba(123,97,255,0.15)",
          border: "1px solid rgba(123,97,255,0.3)",
          color: "var(--accent)",
          fontSize: 14,
          fontWeight: 600,
          cursor: "pointer",
        }}>
          Gjenta betaling
        </button>
      </div>
    </div>
  );
}
