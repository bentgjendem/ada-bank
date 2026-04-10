"use client";

import { useState } from "react";
import Link from "next/link";
import { VirtualCard, Transaction, formatAmount, formatDate, groupByDate } from "@/lib/data";
import { Snowflake, Eye, EyeOff, Settings2, Clock } from "lucide-react";

type Theme = {
  bg: string;
  text: string;
  subtext: string;
  badgeBg: string;
  badgeText: string;
  glow: string;
};

const themes: Record<string, Theme> = {
  midnight: {
    bg: "linear-gradient(135deg, #0f0a00 0%, #1e1500 30%, #3d2c00 60%, #7a5810 85%, #c89820 100%)",
    text: "#fff8e8",
    subtext: "rgba(255,235,160,0.5)",
    badgeBg: "rgba(200,152,32,0.22)",
    badgeText: "#f5d580",
    glow: "rgba(180,130,10,0.45)",
  },
  aurora: {
    bg: "#c9ff47",
    text: "#111111",
    subtext: "rgba(0,0,0,0.45)",
    badgeBg: "#1b2a06",
    badgeText: "#c9ff47",
    glow: "rgba(180,240,40,0.35)",
  },
  rose: {
    bg: "#ff2251",
    text: "#ffffff",
    subtext: "rgba(255,255,255,0.5)",
    badgeBg: "rgba(0,0,0,0.22)",
    badgeText: "rgba(255,255,255,0.9)",
    glow: "rgba(255,34,81,0.4)",
  },
  ocean: {
    bg: "#06122e",
    text: "#ffffff",
    subtext: "rgba(255,255,255,0.4)",
    badgeBg: "rgba(255,255,255,0.10)",
    badgeText: "rgba(255,255,255,0.75)",
    glow: "rgba(6,18,60,0.7)",
  },
};

function VisaLogo({ color }: { color: string }) {
  return (
    <span aria-label="Visa" style={{
      fontFamily: "inherit", fontSize: 22, fontWeight: 900,
      fontStyle: "italic", color, letterSpacing: "-0.5px",
      lineHeight: 1, userSelect: "none", WebkitUserSelect: "none",
    }}>
      VISA
    </span>
  );
}

function NfcIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 3.5 Q17 6.5 17 10 Q17 13.5 10 16.5" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M10 6.5 Q15 8.5 15 10 Q15 11.5 10 13.5" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M10 9.2 Q13 9.8 13 10 Q13 10.2 10 10.8" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

// ── Card transactions (mini list) ─────────────────────────────────────────────

const catColor: Record<string, { bg: string; fg: string }> = {
  "Dagligvarer":       { bg: "rgba(255,138,46,0.18)", fg: "#FF8A2E" },
  "Underholdning":     { bg: "rgba(100,160,255,0.15)", fg: "#64A0FF" },
  "Drivstoff":         { bg: "rgba(255,80,50,0.15)",  fg: "#FF5032" },
  "Transport":         { bg: "rgba(130,170,255,0.13)", fg: "#82AAFF" },
  "Helse":             { bg: "rgba(46,204,154,0.15)", fg: "#2ECC9A" },
  "Kafé & Restaurant": { bg: "rgba(255,200,50,0.15)", fg: "#FFC832" },
  "Klær":              { bg: "rgba(255,120,170,0.15)", fg: "#FF78AA" },
  "Alkohol":           { bg: "rgba(200,80,120,0.12)", fg: "#C85078" },
  "Netthandel":        { bg: "rgba(100,160,255,0.15)", fg: "#64A0FF" },
};
const fallback = { bg: "rgba(255,255,255,0.08)", fg: "rgba(255,255,255,0.4)" };

function CardTransactions({ txns }: { txns: Transaction[] }) {
  if (txns.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "32px 20px", color: "var(--muted)", fontSize: 13 }}>
        Ingen transaksjoner på dette kortet
      </div>
    );
  }

  const grouped = groupByDate(txns);
  const dates = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  return (
    <div>
      {dates.map((date) => (
        <div key={date}>
          <div style={{
            padding: "10px 22px 6px",
            fontSize: 11, fontWeight: 700, color: "var(--muted)",
            textTransform: "uppercase", letterSpacing: "0.09em",
          }}>
            {formatDate(date)}
          </div>
          <div style={{ margin: "0 14px" }}>
            {grouped[date].map((txn, i, arr) => {
              const c = catColor[txn.category] ?? fallback;
              return (
                <Link key={txn.id} href={`/transaksjon/${txn.id}`} style={{
                  display: "flex", alignItems: "center", gap: 14,
                  padding: "13px 14px", textDecoration: "none",
                  borderBottom: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.045)" : "none",
                }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 14, flexShrink: 0,
                    background: c.bg, border: `1px solid ${c.fg}22`,
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20,
                  }}>
                    {txn.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginBottom: 3 }}>
                      {txn.merchant}
                    </div>
                    <div style={{ fontSize: 11, color: "var(--muted)", display: "flex", alignItems: "center", gap: 4 }}>
                      {txn.status === "pending" && <Clock size={10} style={{ color: "#FFC832" }} />}
                      <span style={{ color: txn.status === "pending" ? "#FFC832" : "var(--muted)" }}>
                        {txn.status === "pending" ? "Venter" : txn.category}
                      </span>
                    </div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div className="tabular" style={{ fontSize: 15, fontWeight: 700, color: txn.amount > 0 ? "var(--green)" : "var(--text)", marginBottom: 3 }}>
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

// ── Main carousel ─────────────────────────────────────────────────────────────

interface Props {
  cards: VirtualCard[];
  transactions: Transaction[];
}

export default function VirtualCardCarousel({ cards, transactions }: Props) {
  const [active, setActive] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [frozen, setFrozen] = useState(() => cards.map((c) => c.frozen));

  const card = cards[active];
  const t = themes[card.theme];
  const isFrozen = frozen[active];
  const cardTxns = transactions.filter((tx) => tx.cardLast4 === card.last4);

  function switchCard(i: number) {
    setActive(i);
    setRevealed(false);
  }

  function toggleFreeze() {
    setFrozen((prev) => prev.map((v, i) => (i === active ? !v : v)));
  }

  return (
    <div style={{ paddingBottom: 120 }}>

      {/* ── Card ── */}
      <div
        onClick={() => !isFrozen && setRevealed((r) => !r)}
        style={{
          margin: "0 18px",
          borderRadius: 22,
          padding: "22px 22px",
          background: t.bg,
          boxShadow: `0 24px 64px ${t.glow}, 0 4px 16px rgba(0,0,0,0.45)`,
          aspectRatio: "1.586",
          overflow: "hidden",
          cursor: isFrozen ? "not-allowed" : "pointer",
          opacity: isFrozen ? 0.55 : 1,
          transition: "opacity 0.3s",
          userSelect: "none", WebkitUserSelect: "none",
          display: "flex", flexDirection: "column", justifyContent: "space-between",
        }}
      >
        {/* Top */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: t.text }}>{card.name}</span>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {isFrozen && (
              <div style={{ display: "flex", alignItems: "center", gap: 4, background: "rgba(100,180,255,0.18)", borderRadius: 20, padding: "5px 10px", fontSize: 11, color: "#93c5fd" }}>
                <Snowflake size={11} /> Frosset
              </div>
            )}
            <div style={{ background: t.badgeBg, borderRadius: 20, padding: "5px 12px", fontSize: 12, fontWeight: 700, color: t.badgeText }}>
              Virtuelt
            </div>
          </div>
        </div>

        {/* Middle – revealed details */}
        {revealed && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ display: "flex", gap: 14 }}>
              {card.fullNumber.split(" ").map((g, i) => (
                <span key={i} style={{ fontSize: 17, fontWeight: 600, color: t.text, letterSpacing: "0.12em", fontVariantNumeric: "tabular-nums" }}>
                  {g}
                </span>
              ))}
            </div>
            <div style={{ display: "flex", gap: 28 }}>
              {[{ label: "Utløper", value: card.expiry }, { label: "CVV", value: card.cvv }].map(({ label, value }) => (
                <div key={label}>
                  <div style={{ fontSize: 9, fontWeight: 600, color: t.subtext, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 4 }}>{label}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: t.text, letterSpacing: "0.1em", fontVariantNumeric: "tabular-nums" }}>{value}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            {!revealed
              ? <span style={{ fontSize: 18, fontWeight: 700, color: t.text, letterSpacing: "0.04em" }}>••&nbsp;{card.last4}</span>
              : <EyeOff size={16} color={t.subtext} />
            }
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <NfcIcon color={t.subtext} />
            <VisaLogo color={t.text} />
          </div>
        </div>
      </div>

      {/* Hint */}
      <div style={{ textAlign: "center", marginTop: 10, fontSize: 11, color: "var(--muted)", minHeight: 16 }}>
        {isFrozen ? "Kortet er frosset" : revealed ? "Trykk for å skjule" : "Trykk på kortet for å se kortnr. og CVV"}
      </div>

      {/* Dots */}
      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 10 }}>
        {cards.map((_, i) => (
          <button key={i} onClick={() => switchCard(i)} style={{
            width: i === active ? 24 : 8, height: 8, borderRadius: 4,
            border: "none",
            background: i === active ? "var(--amber)" : "rgba(255,255,255,0.15)",
            cursor: "pointer", transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)", padding: 0,
          }} />
        ))}
      </div>

      {/* ── 3 action buttons ── */}
      <div style={{ display: "flex", gap: 10, margin: "16px 18px 0" }}>
        {/* Detaljer */}
        <button
          onClick={() => !isFrozen && setRevealed((r) => !r)}
          disabled={isFrozen}
          className="press"
          style={{
            flex: 1, border: "none", borderRadius: 18, padding: "14px 8px",
            background: revealed ? "rgba(255,138,46,0.15)" : "rgba(255,255,255,0.065)",
            backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
            boxShadow: revealed ? "inset 0 1px 0 rgba(255,138,46,0.3)" : "inset 0 1px 0 rgba(255,255,255,0.10)",
            borderWidth: 1, borderStyle: "solid",
            borderColor: revealed ? "rgba(255,138,46,0.3)" : "rgba(255,255,255,0.08)",
            cursor: isFrozen ? "not-allowed" : "pointer",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 7,
          }}
        >
          {revealed
            ? <EyeOff size={20} style={{ color: "var(--amber)" }} strokeWidth={2} />
            : <Eye    size={20} style={{ color: isFrozen ? "var(--muted)" : "var(--text2)" }} strokeWidth={2} />
          }
          <span style={{ fontSize: 12, fontWeight: 700, color: revealed ? "var(--amber)" : isFrozen ? "var(--muted)" : "var(--text2)" }}>
            Detaljer
          </span>
        </button>

        {/* Frys */}
        <button
          onClick={toggleFreeze}
          className="press"
          style={{
            flex: 1, border: "none", borderRadius: 18, padding: "14px 8px",
            background: isFrozen ? "rgba(96,165,250,0.15)" : "rgba(255,255,255,0.065)",
            backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
            boxShadow: isFrozen ? "inset 0 1px 0 rgba(96,165,250,0.3)" : "inset 0 1px 0 rgba(255,255,255,0.10)",
            borderWidth: 1, borderStyle: "solid",
            borderColor: isFrozen ? "rgba(96,165,250,0.3)" : "rgba(255,255,255,0.08)",
            cursor: "pointer",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 7,
          }}
        >
          <Snowflake size={20} style={{ color: isFrozen ? "#60a5fa" : "var(--text2)" }} strokeWidth={2} />
          <span style={{ fontSize: 12, fontWeight: 700, color: isFrozen ? "#60a5fa" : "var(--text2)" }}>
            {isFrozen ? "Aktiver" : "Frys"}
          </span>
        </button>

        {/* Innstillinger */}
        <button
          className="press"
          style={{
            flex: 1, border: "none", borderRadius: 18, padding: "14px 8px",
            background: "rgba(255,255,255,0.065)",
            backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.10)",
            borderWidth: 1, borderStyle: "solid", borderColor: "rgba(255,255,255,0.08)",
            cursor: "pointer",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 7,
          }}
        >
          <Settings2 size={20} style={{ color: "var(--text2)" }} strokeWidth={2} />
          <span style={{ fontSize: 12, fontWeight: 700, color: "var(--text2)" }}>Innstillinger</span>
        </button>
      </div>

      {/* ── Transactions for this card ── */}
      <div style={{ marginTop: 24 }}>
        <div style={{ padding: "0 22px 10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 17, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.3px" }}>
            Transaksjoner
          </div>
          <div style={{
            fontSize: 11, fontWeight: 600, color: "var(--muted)",
            background: "rgba(255,255,255,0.06)", border: "1px solid var(--border)",
            borderRadius: 20, padding: "4px 10px",
            letterSpacing: "0.04em", textTransform: "uppercase",
          }}>
            ••{card.last4}
          </div>
        </div>
        <CardTransactions txns={cardTxns} />
      </div>

    </div>
  );
}
