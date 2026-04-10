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

// Accurate Visa wordmark SVG – bold italic geometric letterforms
function VisaLogo({ color }: { color: string }) {
  return (
    <svg
      width="68"
      height="22"
      viewBox="0 0 68 22"
      fill="none"
      aria-label="Visa"
      style={{ display: "block" }}
    >
      {/* V */}
      <path
        d="M0 1h6.4l5.6 13.6L17.6 1H24L14.4 21H9.6L0 1Z"
        fill={color}
      />
      {/* I */}
      <path d="M26 1h6v20h-6V1Z" fill={color} />
      {/* S */}
      <path
        d="M44.4 1.4c-1.6-.6-3.8-1-6.4-1-5.2 0-8.8 2.6-8.8 6.3 0 2.8 2.6 4.3 4.6 5.2 2 .9 2.8 1.5 2.8 2.4 0 1.3-1.6 1.9-3.2 1.9-2 0-3.2-.3-5-.9L28 18.8c1.6.7 4.2 1.2 6.8 1.2 5.6 0 9-2.7 9-6.6 0-2.2-1.4-3.9-4.6-5.2-1.8-.9-3-1.4-3-2.4 0-.8.8-1.6 2.8-1.6 1.6 0 2.8.3 3.8.7l.6.2.6-4.7Z"
        fill={color}
      />
      {/* A */}
      <path
        d="M55.2 1c1 0 1.8.4 2.2 1.4L68 21h-6.2l-1-3.2h-7.6L52 21h-5.8L54.4 2.4C54.8 1.5 55.2 1 56.2 1h-1ZM55.6 1H57c.8 0 1.4.4 1.8 1.2l3.6 11.6h-7.8l2.8-8.4-.8-4.4Z"
        fill={color}
      />
      <path
        d="M53.4 13.8h6.4l-1.6-5.6-1.6-4.8-3.2 10.4Z"
        fill={color}
      />
    </svg>
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
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{
              fontFamily: "'Courier New', monospace",
              fontSize: 15,
              fontWeight: 700,
              color: t.text,
              letterSpacing: "0.18em",
            }}>
              {card.fullNumber}
            </div>
            <div style={{ display: "flex", gap: 24 }}>
              <div>
                <div style={{ fontSize: 9, color: t.subtext, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 2 }}>Utløper</div>
                <div style={{ fontFamily: "'Courier New', monospace", fontSize: 13, fontWeight: 600, color: t.text }}>{card.expiry}</div>
              </div>
              <div>
                <div style={{ fontSize: 9, color: t.subtext, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 2 }}>CVV</div>
                <div style={{ fontFamily: "'Courier New', monospace", fontSize: 13, fontWeight: 600, color: t.text }}>{card.cvv}</div>
              </div>
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
      <div style={{
        margin: "16px 20px 0",
        padding: "16px",
        background: "var(--surface)",
        borderRadius: 16,
        border: "1px solid var(--border)",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 16,
      }}>
        <div>
          <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 4 }}>Brukt denne måneden</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: "var(--text)" }} className="tabular">
            {formatAmount(card.spentThisMonth)} kr
          </div>
        </div>
        {card.spendLimit && (
          <div>
            <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 4 }}>Månedlig grense</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "var(--text)" }} className="tabular">
              {formatAmount(card.spendLimit)} kr
            </div>
          </div>
        )}
      </div>

      {/* Apple Pay */}
      <div style={{
        margin: "12px 20px 0",
        padding: "12px 16px",
        background: "var(--surface)",
        borderRadius: 16,
        border: "1px solid var(--border)",
        display: "flex", alignItems: "center", gap: 12,
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: "black",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 18,
        }}>

        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>Apple Pay</div>
          <div style={{ fontSize: 11, color: "var(--muted)" }}>Lagt til i Lommebok</div>
        </div>
        <div style={{ marginLeft: "auto", fontSize: 11, color: "var(--accent)", fontWeight: 500 }}>Aktiv</div>
      </div>

      {/* Card management */}
      <div style={{
        margin: "12px 20px 0",
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 16,
        overflow: "hidden",
      }}>
        {[
          { icon: <Snowflake size={17} style={{ color: "#60a5fa" }} />, bg: "rgba(96,165,250,0.12)", label: "Frys kortet", desc: "Blokker kortet midlertidig" },
          { icon: <Settings2 size={17} style={{ color: "var(--accent)" }} />, bg: "rgba(123,97,255,0.12)", label: "Bruksgrenser", desc: "Sett daglig og månedlig grense" },
          { icon: <Lock size={17} style={{ color: "var(--accent2)" }} />, bg: "rgba(0,210,200,0.12)", label: "Sikkerhet", desc: "PIN og transaksjonsvarslinger" },
        ].map((item, i) => (
          <button key={item.label} style={{
            width: "100%", display: "flex", alignItems: "center", gap: 14,
            padding: "14px 18px", background: "none", border: "none",
            borderBottom: i < 2 ? "1px solid var(--border)" : "none",
            cursor: "pointer", textAlign: "left",
          }}>
            <div style={{ width: 38, height: 38, borderRadius: 11, background: item.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              {item.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text)" }}>{item.label}</div>
              <div style={{ fontSize: 11, color: "var(--muted)" }}>{item.desc}</div>
            </div>
            <div style={{ color: "var(--muted)", opacity: 0.4, fontSize: 18 }}>›</div>
          </button>
        ))}
      </div>
    </div>
  );
}
