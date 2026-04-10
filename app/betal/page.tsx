"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ScanLine } from "lucide-react";

export default function BetalPage() {
  const [kid, setKid] = useState("");
  const [account, setAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");

  const isReady = kid && account && amount;

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
        <div style={{ fontSize: 20, fontWeight: 700, color: "var(--text)" }}>Betal regning</div>
      </div>

      {/* Scan button */}
      <div style={{ margin: "0 20px 20px" }}>
        <button style={{
          width: "100%",
          padding: "18px",
          borderRadius: 18,
          background: "rgba(123,97,255,0.1)",
          border: "1px solid rgba(123,97,255,0.25)",
          color: "var(--accent)",
          fontSize: 15,
          fontWeight: 600,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
        }}>
          <ScanLine size={20} />
          Skann faktura med kamera
        </button>
      </div>

      <div style={{ padding: "0 20px", textAlign: "center", color: "var(--muted)", fontSize: 12, marginBottom: 20 }}>
        — eller fyll inn manuelt —
      </div>

      {/* Form */}
      <div style={{ padding: "0 20px", display: "flex", flexDirection: "column", gap: 12 }}>
        {[
          { label: "Kontonummer mottaker", value: account, set: setAccount, placeholder: "XXXX.XX.XXXXX", inputMode: "numeric" },
          { label: "KID-nummer", value: kid, set: setKid, placeholder: "KID / melding", inputMode: "numeric" },
          { label: "Beløp (kr)", value: amount, set: setAmount, placeholder: "0", inputMode: "numeric" },
          { label: "Forfallsdato", value: dueDate, set: setDueDate, placeholder: "DD.MM.ÅÅÅÅ", inputMode: "text" },
        ].map(({ label, value, set, placeholder, inputMode }) => (
          <div key={label}>
            <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>
              {label}
            </div>
            <input
              value={value}
              onChange={(e) => set(e.target.value)}
              placeholder={placeholder}
              inputMode={inputMode as "numeric" | "text"}
              style={{
                width: "100%",
                padding: "16px",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 14,
                fontSize: 16,
                color: "var(--text)",
                outline: "none",
                fontVariantNumeric: "tabular-nums",
              }}
            />
          </div>
        ))}
      </div>

      {/* Summary */}
      {isReady && (
        <div style={{
          margin: "20px 20px 0",
          padding: "16px 20px",
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 16,
        }}>
          <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 8 }}>Oppsummering</div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: 14, color: "var(--muted)" }}>Beløp</span>
            <span className="tabular" style={{ fontSize: 14, fontWeight: 700, color: "var(--text)" }}>
              {Number(amount).toLocaleString("nb-NO")} kr
            </span>
          </div>
        </div>
      )}

      {/* CTA */}
      <div style={{ padding: "20px 20px 0" }}>
        <button
          disabled={!isReady}
          style={{
            width: "100%",
            padding: "18px",
            borderRadius: 18,
            background: isReady ? "var(--accent)" : "var(--surface2)",
            border: "none",
            color: isReady ? "white" : "var(--muted)",
            fontSize: 16,
            fontWeight: 700,
            cursor: isReady ? "pointer" : "not-allowed",
            transition: "all 0.2s",
          }}
        >
          {amount ? `Betal ${Number(amount).toLocaleString("nb-NO")} kr` : "Betal"}
        </button>
      </div>
    </div>
  );
}
