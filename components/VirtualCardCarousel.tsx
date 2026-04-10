"use client";

import { useState } from "react";
import { VirtualCard, formatAmount } from "@/lib/data";
import { Snowflake, Wifi, Eye, EyeOff, Lock, Settings2 } from "lucide-react";

const themes: Record<string, { bg: string; glow: string }> = {
  midnight: {
    bg: "linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)",
    glow: "rgba(123,97,255,0.3)",
  },
  aurora: {
    bg: "linear-gradient(135deg, #2d1b69 0%, #7b61ff 50%, #00d2c8 100%)",
    glow: "rgba(0,210,200,0.3)",
  },
  rose: {
    bg: "linear-gradient(135deg, #1a0a1a 0%, #6b1a4a 50%, #c0392b 100%)",
    glow: "rgba(192,57,43,0.3)",
  },
  ocean: {
    bg: "linear-gradient(135deg, #0a1628 0%, #1a3a5c 50%, #00b4d8 100%)",
    glow: "rgba(0,180,216,0.3)",
  },
};

function CardChip() {
  return (
    <svg width="34" height="26" viewBox="0 0 34 26" fill="none">
      <rect width="34" height="26" rx="5" fill="url(#chipGold)" />
      <rect x="11" y="0" width="12" height="26" fill="rgba(160,130,40,0.45)" />
      <rect x="0" y="9" width="34" height="8" fill="rgba(160,130,40,0.45)" />
      <rect x="13" y="4" width="8" height="18" rx="2" fill="rgba(255,235,130,0.18)" />
      <line x1="17" y1="0" x2="17" y2="26" stroke="rgba(160,130,40,0.3)" strokeWidth="0.5" />
      <line x1="0" y1="13" x2="34" y2="13" stroke="rgba(160,130,40,0.3)" strokeWidth="0.5" />
      <defs>
        <linearGradient id="chipGold" x1="0" y1="0" x2="34" y2="26" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f0d060" />
          <stop offset="50%" stopColor="#c8a830" />
          <stop offset="100%" stopColor="#e8c850" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function VisaLogo() {
  return (
    <svg width="58" height="20" viewBox="0 0 58 20" fill="none" aria-label="Visa">
      {/* V */}
      <path
        d="M22.5 1L17.2 15.5H13.4L8.2 4.4C7.9 3.6 7.6 3.3 7 3C5.9 2.5 4.2 2 2.5 1.7L2.6 1H8.9C9.7 1 10.4 1.5 10.6 2.4L12.1 10.5L15.8 1H22.5Z"
        fill="white"
      />
      {/* I */}
      <path
        d="M25.8 1L23.2 15.5H16.9L19.5 1H25.8Z"
        fill="white"
      />
      {/* S */}
      <path
        d="M38.4 1.2C37.1 0.7 35.1 0.2 32.7 0.2C27.5 0.2 23.8 2.9 23.8 6.8C23.8 9.7 26.4 11.3 28.4 12.2C30.4 13.2 31.1 13.8 31.1 14.6C31.1 15.8 29.6 16.4 28.2 16.4C26.2 16.4 25.1 16.1 23.4 15.4L22.7 15.1L22 19.2C23.5 19.9 26.2 20.5 29 20.5C34.5 20.5 38.1 17.8 38.1 13.7C38.1 11.4 36.6 9.7 33.5 8.3C31.7 7.4 30.6 6.8 30.6 5.9C30.6 5.1 31.5 4.2 33.5 4.2C35.2 4.2 36.4 4.5 37.4 4.9L37.9 5.1L38.4 1.2Z"
        fill="white"
      />
      {/* A */}
      <path
        d="M47.3 1H51.9C52.9 1 53.7 1.3 54 2.3L57.4 15.5H51.2L50.5 12.8H43.9L42.8 15.5H36.1L44.3 2.6C44.9 1.5 45.9 1 47.3 1ZM49.8 8.8L48.3 4.3L46 8.8H49.8Z"
        fill="white"
      />
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
  const theme = themes[card.theme];

  // Hide details when switching cards
  function switchCard(i: number) {
    setActive(i);
    setRevealed(false);
  }

  const maskedNumber = `•••• •••• •••• ${card.last4}`;
  const maskedCvv = "•••";

  return (
    <div>
      {/* Card – click anywhere to reveal/hide */}
      <div
        onClick={() => !card.frozen && setRevealed((r) => !r)}
        style={{
          margin: "0 20px",
          borderRadius: 22,
          padding: "22px 22px 18px",
          background: theme.bg,
          boxShadow: `0 20px 60px ${theme.glow}, 0 4px 20px rgba(0,0,0,0.5)`,
          position: "relative",
          overflow: "hidden",
          aspectRatio: "1.586",
          opacity: card.frozen ? 0.6 : 1,
          cursor: card.frozen ? "not-allowed" : "pointer",
          transition: "opacity 0.3s ease, transform 0.15s ease",
          WebkitUserSelect: "none",
          userSelect: "none",
        }}
      >
        {/* Decorative circles */}
        <div style={{ position: "absolute", top: -40, right: -40, width: 180, height: 180, borderRadius: "50%", background: "rgba(255,255,255,0.04)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -60, left: -20, width: 220, height: 220, borderRadius: "50%", background: "rgba(255,255,255,0.03)", pointerEvents: "none" }} />

        {/* Top row: bank name + frozen badge + NFC */}
        <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
          <div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 2 }}>ada bank</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.9)" }}>{card.name}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {card.frozen && (
              <div style={{ display: "flex", alignItems: "center", gap: 4, background: "rgba(100,180,255,0.2)", borderRadius: 20, padding: "4px 10px", fontSize: 11, color: "#60a5fa" }}>
                <Snowflake size={11} />
                Frosset
              </div>
            )}
            {/* NFC / contactless icon */}
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" style={{ opacity: 0.45 }}>
              <path d="M11 4 Q18 7 18 11 Q18 15 11 18" stroke="white" strokeWidth="1.8" strokeLinecap="round" fill="none" />
              <path d="M11 7 Q16 9 16 11 Q16 13 11 15" stroke="white" strokeWidth="1.8" strokeLinecap="round" fill="none" />
              <path d="M11 10 Q14 10.5 14 11 Q14 11.5 11 12" stroke="white" strokeWidth="1.8" strokeLinecap="round" fill="none" />
            </svg>
          </div>
        </div>

        {/* Chip */}
        <div style={{ position: "relative", marginBottom: 16 }}>
          <CardChip />
        </div>

        {/* Card number */}
        <div style={{ position: "relative", marginBottom: 14 }}>
          <div style={{
            fontFamily: "'Courier New', monospace",
            fontSize: 15,
            fontWeight: 600,
            color: "rgba(255,255,255,0.9)",
            letterSpacing: revealed ? "0.18em" : "0.22em",
            transition: "letter-spacing 0.2s",
          }}>
            {revealed ? card.fullNumber : maskedNumber}
          </div>
        </div>

        {/* Bottom row */}
        <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ display: "flex", gap: 20, alignItems: "flex-end" }}>
            {/* Expiry */}
            <div>
              <div style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", marginBottom: 3, textTransform: "uppercase", letterSpacing: "0.1em" }}>Utløper</div>
              <div style={{ fontFamily: "'Courier New', monospace", fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>{card.expiry}</div>
            </div>
            {/* CVV */}
            <div>
              <div style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", marginBottom: 3, textTransform: "uppercase", letterSpacing: "0.1em" }}>CVV</div>
              <div style={{ fontFamily: "'Courier New', monospace", fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.85)", letterSpacing: revealed ? "0.18em" : "0.12em" }}>
                {revealed ? card.cvv : maskedCvv}
              </div>
            </div>
          </div>

          {/* Eye indicator + Visa logo */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
            <div style={{ opacity: 0.5 }}>
              {revealed
                ? <EyeOff size={13} color="white" />
                : <Eye size={13} color="white" />
              }
            </div>
            <VisaLogo />
          </div>
        </div>
      </div>

      {/* Reveal hint */}
      {!card.frozen && (
        <div style={{ textAlign: "center", marginTop: 10, fontSize: 11, color: "var(--muted)" }}>
          {revealed ? "Trykk for å skjule kortdetaljer" : "Trykk på kortet for å se kortnr. og CVV"}
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
              height: 8,
              borderRadius: 4,
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

      {/* Apple Pay badge */}
      <div style={{
        margin: "12px 20px 0",
        padding: "12px 16px",
        background: "var(--surface)",
        borderRadius: 16,
        border: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        gap: 12,
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
          <button
            key={item.label}
            style={{
              width: "100%", display: "flex", alignItems: "center", gap: 14,
              padding: "14px 18px", background: "none", border: "none",
              borderBottom: i < 2 ? "1px solid var(--border)" : "none",
              cursor: "pointer", textAlign: "left",
            }}
          >
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
