"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ScanLine } from "lucide-react";

const fields = [
  { key: "account", label: "Kontonummer mottaker", placeholder: "XXXX.XX.XXXXX", mode: "numeric" },
  { key: "kid",     label: "KID-nummer",            placeholder: "KID / melding",  mode: "numeric" },
  { key: "amount",  label: "Beløp",                 placeholder: "0 kr",           mode: "numeric" },
  { key: "due",     label: "Forfallsdato",           placeholder: "DD.MM.ÅÅÅÅ",     mode: "text" },
] as const;

export default function BetalPage() {
  const [vals, setVals] = useState<Record<string, string>>({});
  const isReady = vals.account && vals.kid && vals.amount;

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
        <span style={{ fontSize: 20, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.3px" }}>Betal regning</span>
      </div>

      {/* Scan CTA */}
      <div style={{ margin: "0 18px 16px" }}>
        <button className="press" style={{
          width: "100%", padding: "18px",
          borderRadius: 20,
          background: "rgba(255,138,46,0.12)",
          border: "1px solid rgba(255,138,46,0.22)",
          color: "var(--amber)", fontSize: 15, fontWeight: 700,
          cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
        }}>
          <ScanLine size={20} />
          Skann faktura med kamera
        </button>
      </div>

      <div style={{ margin: "0 18px 16px", textAlign: "center", fontSize: 12, color: "var(--muted)", fontWeight: 500 }}>
        — eller fyll inn manuelt —
      </div>

      {/* Form */}
      <div className="glass" style={{ margin: "0 18px", borderRadius: 22, padding: "4px 20px" }}>
        {fields.map((f, i) => (
          <div key={f.key} style={{
            padding: "16px 0",
            borderBottom: i < fields.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
          }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>
              {f.label}
            </div>
            <input
              value={vals[f.key] ?? ""}
              onChange={(e) => setVals({ ...vals, [f.key]: e.target.value })}
              placeholder={f.placeholder}
              inputMode={f.mode as "numeric" | "text"}
              style={{
                background: "none", border: "none", outline: "none",
                fontSize: 16, fontWeight: 600, color: "var(--text)",
                width: "100%", fontVariantNumeric: "tabular-nums",
              }}
            />
          </div>
        ))}
      </div>

      {/* Summary */}
      {isReady && (
        <div className="glass-sm" style={{ margin: "12px 18px 0", borderRadius: 18, padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 13, color: "var(--muted)", fontWeight: 500 }}>Beløp å betale</span>
          <span className="tabular" style={{ fontSize: 17, fontWeight: 800, color: "var(--text)" }}>
            {Number(vals.amount || 0).toLocaleString("nb-NO")} kr
          </span>
        </div>
      )}

      {/* CTA */}
      <div style={{ margin: "14px 18px 0" }}>
        <button disabled={!isReady} className="press" style={{
          width: "100%", padding: "18px", borderRadius: 20, border: "none",
          background: isReady ? "var(--teal)" : "rgba(255,255,255,0.06)",
          color: isReady ? "white" : "var(--muted)",
          fontSize: 16, fontWeight: 800, cursor: isReady ? "pointer" : "not-allowed",
          transition: "all 0.25s", letterSpacing: "-0.2px",
        }}>
          {vals.amount ? `Betal ${Number(vals.amount).toLocaleString("nb-NO")} kr` : "Betal"}
        </button>
      </div>
    </div>
  );
}
