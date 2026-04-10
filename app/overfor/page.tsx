"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";

const contacts = [
  { id: 1, name: "Mathilde Andersen", account: "1503.42.56789", avatar: "MA" },
  { id: 2, name: "Ole Kristian Berg",  account: "6347.11.22333", avatar: "OB" },
  { id: 3, name: "Sara Dahl",          account: "8340.23.44100", avatar: "SD" },
  { id: 4, name: "Thomas Eriksen",     account: "9350.55.12345", avatar: "TE" },
];

const avatarColors = [
  "rgba(255,138,46,0.2)",
  "rgba(0,212,176,0.2)",
  "rgba(100,160,255,0.2)",
  "rgba(255,120,170,0.2)",
];

export default function OverforPage() {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [selected, setSelected] = useState<number | null>(null);

  const isReady = !!amount && selected !== null;

  return (
    <div style={{ minHeight: "100dvh", paddingBottom: 40 }}>
      {/* Back */}
      <div style={{ padding: "58px 22px 20px", display: "flex", alignItems: "center", gap: 12 }}>
        <Link href="/" className="glass-sm press" style={{
          width: 40, height: 40, borderRadius: 13,
          display: "flex", alignItems: "center", justifyContent: "center",
          textDecoration: "none", color: "var(--text)", border: "none",
        }}>
          <ArrowLeft size={19} strokeWidth={2} />
        </Link>
        <span style={{ fontSize: 20, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.3px" }}>Overfør</span>
      </div>

      {/* Amount */}
      <div className="glass" style={{ margin: "0 18px", borderRadius: 26, padding: "28px 24px", textAlign: "center" }}>
        <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 16, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>
          Tilgjengelig · 24 680 kr
        </div>
        <input
          type="number"
          inputMode="numeric"
          placeholder="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{
            fontSize: 60, fontWeight: 800, letterSpacing: "-2.5px",
            color: amount ? "var(--text)" : "rgba(255,255,255,0.15)",
            background: "none", border: "none", outline: "none",
            width: "100%", textAlign: "center",
            fontVariantNumeric: "tabular-nums",
          }}
        />
        <div style={{ fontSize: 18, color: "var(--muted)", fontWeight: 600, marginBottom: 20 }}>kr</div>

        {/* Quick amounts */}
        <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
          {[500, 1000, 2000, 5000].map((amt) => (
            <button key={amt} onClick={() => setAmount(String(amt))} className="press" style={{
              padding: "7px 14px", borderRadius: 20,
              background: amount === String(amt) ? "var(--amber)" : "rgba(255,255,255,0.07)",
              border: amount === String(amt) ? "none" : "1px solid var(--border)",
              color: amount === String(amt) ? "white" : "var(--text2)",
              fontSize: 13, fontWeight: 600, cursor: "pointer",
              transition: "all 0.2s",
            }}>
              {amt.toLocaleString("nb-NO")}
            </button>
          ))}
        </div>
      </div>

      {/* To whom */}
      <div style={{ margin: "16px 18px 0" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.1em" }}>Til</div>

        {/* Search */}
        <div className="glass-sm" style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", borderRadius: 16, marginBottom: 10 }}>
          <Search size={15} style={{ color: "var(--muted)", flexShrink: 0 }} />
          <input placeholder="Navn, kontonummer eller telefon" style={{
            background: "none", border: "none", outline: "none",
            fontSize: 14, color: "var(--text)", flex: 1,
          }} />
        </div>

        {/* Contacts */}
        <div className="glass" style={{ borderRadius: 20, overflow: "hidden", padding: "0 14px" }}>
          {contacts.map((c, i) => (
            <button key={c.id} onClick={() => setSelected(c.id === selected ? null : c.id)} style={{
              width: "100%", display: "flex", alignItems: "center", gap: 14,
              padding: "14px 0",
              background: "none", border: "none",
              borderBottom: i < contacts.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
              cursor: "pointer", textAlign: "left",
            }}>
              <div style={{
                width: 42, height: 42, borderRadius: 14,
                background: selected === c.id ? "var(--amber)" : avatarColors[i],
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 12, fontWeight: 800,
                color: selected === c.id ? "white" : "var(--text2)",
                flexShrink: 0, transition: "all 0.2s",
              }}>
                {c.avatar}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text)" }}>{c.name}</div>
                <div style={{ fontSize: 11, color: "var(--muted)" }}>{c.account}</div>
              </div>
              {selected === c.id && (
                <div style={{ width: 20, height: 20, borderRadius: "50%", background: "var(--amber)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: "white" }} />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Message */}
      <div style={{ margin: "12px 18px 0" }}>
        <input
          placeholder="Melding (valgfri)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="glass-sm"
          style={{
            width: "100%", padding: "14px 16px",
            borderRadius: 16, border: "none",
            fontSize: 14, color: "var(--text)", outline: "none",
            display: "block",
          }}
        />
      </div>

      {/* CTA */}
      <div style={{ margin: "16px 18px 0" }}>
        <button disabled={!isReady} className="press" style={{
          width: "100%", padding: "18px", borderRadius: 20, border: "none",
          background: isReady ? "var(--amber)" : "rgba(255,255,255,0.06)",
          color: isReady ? "white" : "var(--muted)",
          fontSize: 16, fontWeight: 800, cursor: isReady ? "pointer" : "not-allowed",
          transition: "all 0.25s",
          letterSpacing: "-0.2px",
        }}>
          {amount ? `Send ${Number(amount).toLocaleString("nb-NO")} kr` : "Send penger"}
        </button>
      </div>
    </div>
  );
}
