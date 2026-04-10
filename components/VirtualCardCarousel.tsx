"use client";

import { useState } from "react";
import { VirtualCard, formatAmount } from "@/lib/data";
import { Snowflake, Eye, EyeOff, Lock, Settings2 } from "lucide-react";

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
    bg: "#0d0d10",
    text: "#ffffff",
    subtext: "rgba(255,255,255,0.45)",
    badgeBg: "rgba(255,255,255,0.10)",
    badgeText: "rgba(255,255,255,0.75)",
    glow: "rgba(20,20,30,0.8)",
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

// Visa wordmark – Inter 900 italic renders crisply since the font is already loaded
function VisaLogo({ color }: { color: string }) {
  return (
    <span
      aria-label="Visa"
      style={{
        fontFamily: "inherit",
        fontSize: 22,
        fontWeight: 900,
        fontStyle: "italic",
        color,
        letterSpacing: "-0.5px",
        lineHeight: 1,
        userSelect: "none",
        WebkitUserSelect: "none",
      }}
    >
      VISA
    </span>
  );
}

function NfcIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 3.5 Q17 6.5 17 10 Q17 13.5 10 16.5" stroke={color} strokeWidth="1.6" strokeLinecap="round" fill="none" />
      <path d="M10 6.5 Q15 8.5 15 10 Q15 11.5 10 13.5" stroke={color} strokeWidth="1.6" strokeLinecap="round" fill="none" />
      <path d="M10 9.2 Q13 9.8 13 10 Q13 10.2 10 10.8" stroke={color} strokeWidth="1.6" strokeLinecap="round" fill="none" />
    </svg>
  );
}

interface Props {
  cards: VirtualCard[];
}

export default function VirtualCardCarousel({ cards }: Props) {
  const [active, setActive] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const card = cards[active];
  const t = themes[card.theme];

  function switchCard(i: number) {
    setActive(i);
    setRevealed(false);
  }

  return (
    <div>
      {/* ── Card ── */}
      <div
        onClick={() => !card.frozen && setRevealed((r) => !r)}
        style={{
          margin: "0 20px",
          borderRadius: 20,
          padding: "22px 22px 22px",
          background: t.bg,
          boxShadow: `0 24px 64px ${t.glow}, 0 4px 16px rgba(0,0,0,0.45)`,
          aspectRatio: "1.586",
          position: "relative",
          overflow: "hidden",
          cursor: card.frozen ? "not-allowed" : "pointer",
          opacity: card.frozen ? 0.6 : 1,
          transition: "opacity 0.3s",
          userSelect: "none",
          WebkitUserSelect: "none",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* ── Top row ── */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: t.text, letterSpacing: "-0.2px" }}>
            {card.name}
          </span>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {card.frozen && (
              <div style={{
                display: "flex", alignItems: "center", gap: 4,
                background: "rgba(100,180,255,0.18)",
                borderRadius: 20, padding: "5px 10px",
                fontSize: 11, color: "#93c5fd",
              }}>
                <Snowflake size={11} />
                Frosset
              </div>
            )}
            {/* Virtuelt badge */}
            <div style={{
              background: t.badgeBg,
              borderRadius: 20,
              padding: "5px 12px",
              fontSize: 12,
              fontWeight: 700,
              color: t.badgeText,
              letterSpacing: "0.01em",
            }}>
              Virtuelt
            </div>
          </div>
        </div>

        {/* ── Middle: card number (revealed) ── */}
        {revealed && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {/* Card number in 4 groups */}
            <div style={{ display: "flex", gap: 14 }}>
              {card.fullNumber.split(" ").map((group, i) => (
                <span key={i} style={{
                  fontSize: 17,
                  fontWeight: 600,
                  color: t.text,
                  letterSpacing: "0.12em",
                  fontVariantNumeric: "tabular-nums",
                  fontFeatureSettings: '"tnum"',
                }}>
                  {group}
                </span>
              ))}
            </div>
            {/* Expiry + CVV */}
            <div style={{ display: "flex", gap: 28 }}>
              {[
                { label: "Utløper", value: card.expiry },
                { label: "CVV",     value: card.cvv },
              ].map(({ label, value }) => (
                <div key={label}>
                  <div style={{ fontSize: 9, fontWeight: 600, color: t.subtext, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 4 }}>
                    {label}
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: t.text, letterSpacing: "0.1em", fontVariantNumeric: "tabular-nums" }}>
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Bottom row ── */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          {/* Masked / short number */}
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {!revealed ? (
              <span style={{ fontSize: 18, fontWeight: 700, color: t.text, letterSpacing: "0.04em" }}>
                ••&nbsp;{card.last4}
              </span>
            ) : (
              <EyeOff size={16} color={t.subtext} />
            )}
          </div>

          {/* NFC + Visa */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <NfcIcon color={t.subtext} />
            <VisaLogo color={t.text} />
          </div>
        </div>
      </div>

      {/* Hint */}
      {!card.frozen && (
        <div style={{ textAlign: "center", marginTop: 10, fontSize: 11, color: "var(--muted)" }}>
          {revealed ? "Trykk for å skjule" : "Trykk på kortet for å se kortnr. og CVV"}
        </div>
      )}

      {/* Dots */}
      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: revealed ? 10 : 14 }}>
        {cards.map((_, i) => (
          <button
            key={i}
            onClick={() => switchCard(i)}
            style={{
              width: i === active ? 24 : 8,
              height: 8, borderRadius: 4,
              border: "none",
              background: i === active ? "var(--accent)" : "var(--surface2)",
              cursor: "pointer",
              transition: "all 0.3s ease",
              padding: 0,
            }}
          />
        ))}
      </div>

      {/* Card stats */}
      <div className="glass" style={{
        margin: "14px 18px 0",
        borderRadius: 20,
        padding: "18px 20px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 16,
      }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 600, color: "var(--muted)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>Brukt denne måneden</div>
          <div style={{ fontSize: 19, fontWeight: 800, color: "var(--text)" }} className="tabular">
            {formatAmount(card.spentThisMonth)} <span style={{ fontSize: 13, fontWeight: 500, color: "var(--muted)" }}>kr</span>
          </div>
        </div>
        {card.spendLimit && (
          <div>
            <div style={{ fontSize: 10, fontWeight: 600, color: "var(--muted)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>Månedlig grense</div>
            <div style={{ fontSize: 19, fontWeight: 800, color: "var(--text)" }} className="tabular">
              {formatAmount(card.spendLimit)} <span style={{ fontSize: 13, fontWeight: 500, color: "var(--muted)" }}>kr</span>
            </div>
          </div>
        )}
      </div>

      {/* Apple Pay */}
      <div className="glass-sm" style={{
        margin: "10px 18px 0",
        padding: "14px 18px",
        borderRadius: 18,
        display: "flex", alignItems: "center", gap: 14,
      }}>
        <div style={{
          width: 38, height: 38, borderRadius: 11,
          background: "#000",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 20, flexShrink: 0,
        }}>

        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text)" }}>Apple Pay</div>
          <div style={{ fontSize: 11, color: "var(--muted)" }}>Lagt til i Lommebok</div>
        </div>
        <div style={{ fontSize: 11, fontWeight: 700, color: "var(--teal)" }}>Aktiv</div>
      </div>

      {/* Card management */}
      <div className="glass" style={{
        margin: "10px 18px 0",
        borderRadius: 20,
        overflow: "hidden",
        padding: "0 18px",
      }}>
        {[
          { icon: <Snowflake size={16} style={{ color: "#60a5fa" }} />, bg: "rgba(96,165,250,0.14)", label: "Frys kortet",  desc: "Blokker kortet midlertidig" },
          { icon: <Settings2 size={16} style={{ color: "var(--amber)" }} />, bg: "rgba(255,138,46,0.13)", label: "Bruksgrenser", desc: "Sett daglig og månedlig grense" },
          { icon: <Lock size={16} style={{ color: "var(--teal)" }} />, bg: "rgba(0,212,176,0.13)", label: "Sikkerhet",    desc: "PIN og transaksjonsvarslinger" },
        ].map((item, i) => (
          <button key={item.label} className="press" style={{
            width: "100%", display: "flex", alignItems: "center", gap: 14,
            padding: "15px 0", background: "none", border: "none",
            borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.06)" : "none",
            cursor: "pointer", textAlign: "left",
          }}>
            <div style={{ width: 38, height: 38, borderRadius: 12, background: item.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              {item.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text)" }}>{item.label}</div>
              <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>{item.desc}</div>
            </div>
            <span style={{ color: "var(--muted)", opacity: 0.35, fontSize: 20, lineHeight: 1 }}>›</span>
          </button>
        ))}
      </div>
    </div>
  );
}
