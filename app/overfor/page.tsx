"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Search, ChevronRight } from "lucide-react";

const contacts = [
  { id: 1, name: "Mathilde Andersen", account: "1503.42.56789", avatar: "MA" },
  { id: 2, name: "Ole Kristian Berg", account: "6347.11.22333", avatar: "OB" },
  { id: 3, name: "Sara Dahl", account: "8340.23.44100", avatar: "SD" },
  { id: 4, name: "Thomas Eriksen", account: "9350.55.12345", avatar: "TE" },
];

export default function OverforPage() {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [selected, setSelected] = useState<number | null>(null);

  const displayAmount = amount
    ? new Intl.NumberFormat("nb-NO").format(Number(amount.replace(/\D/g, "")))
    : "";

  return (
    <div style={{ minHeight: "100dvh", background: "var(--bg)", paddingBottom: 40 }}>

      {/* Header */}
      <div style={{
        padding: "56px 20px 24px",
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}>
        <Link href="/" style={{
          width: 40, height: 40,
          borderRadius: 12,
          background: "var(--surface)",
          border: "1px solid var(--border)",
          display: "flex", alignItems: "center", justifyContent: "center",
          textDecoration: "none",
          color: "var(--text)",
        }}>
          <ArrowLeft size={20} />
        </Link>
        <div style={{ fontSize: 20, fontWeight: 700, color: "var(--text)" }}>Overfør</div>
      </div>

      {/* Amount input */}
      <div style={{
        margin: "0 20px",
        padding: "32px 24px",
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 24,
        textAlign: "center",
      }}>
        <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 16 }}>
          Tilgjengelig: 24 680 kr
        </div>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
        }}>
          <input
            type="number"
            inputMode="numeric"
            placeholder="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{
              fontSize: 52,
              fontWeight: 800,
              letterSpacing: "-2px",
              color: "var(--text)",
              background: "none",
              border: "none",
              outline: "none",
              width: "100%",
              textAlign: "center",
              fontVariantNumeric: "tabular-nums",
            }}
          />
        </div>
        <div style={{ fontSize: 20, color: "var(--muted)", fontWeight: 500 }}>kr</div>

        <div style={{ display: "flex", gap: 8, marginTop: 16, justifyContent: "center" }}>
          {[500, 1000, 2000, 5000].map((amt) => (
            <button
              key={amt}
              onClick={() => setAmount(String(amt))}
              style={{
                padding: "6px 12px",
                borderRadius: 20,
                background: "var(--surface2)",
                border: "1px solid var(--border)",
                color: "var(--text)",
                fontSize: 13,
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              {amt.toLocaleString("nb-NO")}
            </button>
          ))}
        </div>
      </div>

      {/* To whom */}
      <div style={{ padding: "20px 20px 0" }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: "var(--muted)", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.06em" }}>
          Til
        </div>

        {/* Search */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "12px 16px",
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 14,
          marginBottom: 12,
        }}>
          <Search size={16} style={{ color: "var(--muted)" }} />
          <input
            placeholder="Navn, kontonummer eller telefon"
            style={{
              background: "none",
              border: "none",
              outline: "none",
              fontSize: 14,
              color: "var(--text)",
              flex: 1,
            }}
          />
        </div>

        {/* Contact list */}
        <div style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 16,
          overflow: "hidden",
        }}>
          {contacts.map((c, i) => (
            <button
              key={c.id}
              onClick={() => setSelected(c.id === selected ? null : c.id)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "14px 16px",
                background: selected === c.id ? "rgba(123,97,255,0.08)" : "none",
                border: "none",
                borderBottom: i < contacts.length - 1 ? "1px solid var(--border)" : "none",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <div style={{
                width: 42, height: 42,
                borderRadius: 14,
                background: selected === c.id ? "var(--accent)" : "var(--surface2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 13, fontWeight: 700,
                color: selected === c.id ? "white" : "var(--muted)",
                flexShrink: 0,
                transition: "all 0.2s",
              }}>
                {c.avatar}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text)" }}>{c.name}</div>
                <div style={{ fontSize: 12, color: "var(--muted)" }}>{c.account}</div>
              </div>
              {selected === c.id && (
                <div style={{ width: 20, height: 20, borderRadius: "50%", background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "white" }} />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Message */}
      <div style={{ padding: "16px 20px 0" }}>
        <input
          placeholder="Melding (valgfri)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{
            width: "100%",
            padding: "14px 16px",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 14,
            fontSize: 14,
            color: "var(--text)",
            outline: "none",
          }}
        />
      </div>

      {/* CTA */}
      <div style={{ padding: "20px 20px 0" }}>
        <button
          disabled={!amount || !selected}
          style={{
            width: "100%",
            padding: "18px",
            borderRadius: 18,
            background: amount && selected ? "var(--accent)" : "var(--surface2)",
            border: "none",
            color: amount && selected ? "white" : "var(--muted)",
            fontSize: 16,
            fontWeight: 700,
            cursor: amount && selected ? "pointer" : "not-allowed",
            transition: "all 0.2s",
          }}
        >
          {amount ? `Send ${Number(amount).toLocaleString("nb-NO")} kr` : "Send penger"}
        </button>
      </div>
    </div>
  );
}
