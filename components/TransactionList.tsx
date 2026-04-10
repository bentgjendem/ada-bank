"use client";

import Link from "next/link";
import { Transaction, formatAmount, formatDate, groupByDate } from "@/lib/data";
import { Clock } from "lucide-react";

// Category → color
const catColor: Record<string, { bg: string; fg: string }> = {
  "Dagligvarer":         { bg: "rgba(255,138,46,0.18)", fg: "#FF8A2E" },
  "Underholdning":       { bg: "rgba(100,160,255,0.15)", fg: "#64A0FF" },
  "Inntekt":             { bg: "rgba(0,212,176,0.15)",  fg: "#00D4B0" },
  "Drivstoff":           { bg: "rgba(255,80,50,0.15)",  fg: "#FF5032" },
  "Transport":           { bg: "rgba(130,170,255,0.13)", fg: "#82AAFF" },
  "Helse":               { bg: "rgba(46,204,154,0.15)", fg: "#2ECC9A" },
  "Kafé & Restaurant":   { bg: "rgba(255,200,50,0.15)", fg: "#FFC832" },
  "Klær":                { bg: "rgba(255,120,170,0.15)", fg: "#FF78AA" },
  "Alkohol":             { bg: "rgba(200,80,120,0.12)", fg: "#C85078" },
  "Sparing":             { bg: "rgba(0,212,176,0.15)",  fg: "#00D4B0" },
  "Netthandel":          { bg: "rgba(100,160,255,0.15)", fg: "#64A0FF" },
  "Renter":              { bg: "rgba(0,212,176,0.13)",  fg: "#00D4B0" },
  "Innskudd":            { bg: "rgba(0,212,176,0.13)",  fg: "#00D4B0" },
  "Uttak":               { bg: "rgba(255,91,91,0.13)",  fg: "#FF5B5B" },
};
const fallbackColor = { bg: "#f3f4f6", fg: "#6b7280" };

export default function TransactionList({ transactions }: { transactions: Transaction[] }) {
  const grouped = groupByDate(transactions);
  const dates = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  return (
    <div style={{ paddingBottom: 120 }}>
      {dates.map((date) => (
        <div key={date} style={{ marginBottom: 4 }}>
          {/* Date header */}
          <div style={{
            padding: "10px 22px 6px",
            fontSize: 12,
            fontWeight: 700,
            color: "var(--muted)",
            textTransform: "uppercase",
            letterSpacing: "0.09em",
          }}>
            {formatDate(date)}
          </div>

          {/* Transaction rows */}
          <div style={{ margin: "0 14px" }}>
            {grouped[date].map((txn, i, arr) => {
              const colors = catColor[txn.category] ?? fallbackColor;
              const isPending = txn.status === "pending";
              return (
                <Link
                  key={txn.id}
                  href={`/transaksjon/${txn.id}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "13px 14px",
                    textDecoration: "none",
                    borderBottom: i < arr.length - 1
                      ? "1px solid #f0f4fb"
                      : "none",
                  }}
                >
                  {/* Category-colored icon */}
                  <div style={{
                    width: 46, height: 46,
                    borderRadius: 15,
                    background: colors.bg,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 21,
                    flexShrink: 0,
                    border: `1px solid ${colors.fg}22`,
                  }}>
                    {txn.icon}
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontSize: 14, fontWeight: 700,
                      color: "var(--text)",
                      whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                      marginBottom: 3,
                    }}>
                      {txn.merchant}
                    </div>
                    <div style={{ fontSize: 11, color: "var(--muted)", display: "flex", alignItems: "center", gap: 4 }}>
                      {isPending && <Clock size={10} style={{ color: "#FFC832" }} />}
                      <span style={{ color: isPending ? "#FFC832" : "var(--muted)" }}>
                        {isPending ? "Venter" : txn.category}
                      </span>
                      {txn.cardLast4 && (
                        <>
                          <span style={{ opacity: 0.3 }}>·</span>
                          <span>••{txn.cardLast4}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Amount + time */}
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div className="tabular" style={{
                      fontSize: 15, fontWeight: 700,
                      color: txn.amount > 0 ? "var(--green)" : "var(--text)",
                      marginBottom: 3,
                    }}>
                      {txn.amount > 0 ? "+" : "–"}{formatAmount(txn.amount)}
                    </div>
                    <div style={{ fontSize: 11, color: "var(--muted)" }}>{txn.time}</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
