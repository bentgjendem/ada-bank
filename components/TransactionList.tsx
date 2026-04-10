"use client";

import Link from "next/link";
import { Transaction, formatAmount, formatDate, groupByDate } from "@/lib/data";
import { ChevronRight, Clock } from "lucide-react";

interface Props {
  transactions: Transaction[];
}

export default function TransactionList({ transactions }: Props) {
  const grouped = groupByDate(transactions);
  const dates = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  return (
    <div style={{ paddingBottom: 100 }}>
      {dates.map((date, di) => (
        <div key={date} style={{ marginBottom: 8 }}>
          <div style={{
            padding: "16px 20px 8px",
            fontSize: 12,
            fontWeight: 600,
            color: "var(--muted)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}>
            {formatDate(date)}
          </div>

          <div style={{
            margin: "0 12px",
            background: "var(--surface)",
            borderRadius: 16,
            border: "1px solid var(--border)",
            overflow: "hidden",
          }}>
            {grouped[date].map((txn, i) => (
              <Link
                key={txn.id}
                href={`/transaksjon/${txn.id}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "14px 16px",
                  gap: 14,
                  textDecoration: "none",
                  borderBottom: i < grouped[date].length - 1
                    ? "1px solid var(--border)"
                    : "none",
                  transition: "background 0.15s",
                }}
                className="txn-row"
              >
                {/* Icon */}
                <div style={{
                  width: 44,
                  height: 44,
                  borderRadius: 14,
                  background: "var(--surface2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  flexShrink: 0,
                }}>
                  {txn.icon}
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "var(--text)",
                    marginBottom: 3,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}>
                    {txn.merchant}
                  </div>
                  <div style={{
                    fontSize: 12,
                    color: "var(--muted)",
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}>
                    {txn.status === "pending" && (
                      <Clock size={11} style={{ color: "#f59e0b" }} />
                    )}
                    <span style={{ color: txn.status === "pending" ? "#f59e0b" : "var(--muted)" }}>
                      {txn.status === "pending" ? "Venter" : txn.category}
                    </span>
                    {txn.cardLast4 && (
                      <>
                        <span style={{ color: "var(--border)" }}>·</span>
                        <span>•••{txn.cardLast4}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Amount */}
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div
                    className="tabular"
                    style={{
                      fontSize: 15,
                      fontWeight: 700,
                      color: txn.amount > 0 ? "var(--green)" : "var(--text)",
                    }}
                  >
                    {txn.amount > 0 ? "+" : "–"}{formatAmount(txn.amount)} kr
                  </div>
                </div>

                <ChevronRight size={16} style={{ color: "var(--muted)", opacity: 0.5, flexShrink: 0 }} />
              </Link>
            ))}
          </div>
        </div>
      ))}

      <style jsx global>{`
        .txn-row:hover, .txn-row:active {
          background: rgba(255,255,255,0.03) !important;
        }
      `}</style>
    </div>
  );
}
