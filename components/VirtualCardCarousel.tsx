"use client";

import { useState } from "react";
import { VirtualCard, formatAmount } from "@/lib/data";
import { Snowflake, Wifi, Eye, EyeOff } from "lucide-react";

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
    <svg width="32" height="24" viewBox="0 0 32 24" fill="none">
      <rect x="0" y="0" width="32" height="24" rx="4" fill="rgba(255,220,100,0.9)" />
      <rect x="10" y="0" width="12" height="24" fill="rgba(200,170,60,0.6)" />
      <rect x="0" y="8" width="32" height="8" fill="rgba(200,170,60,0.6)" />
      <rect x="12" y="4" width="8" height="16" rx="1" fill="rgba(255,220,100,0.3)" />
    </svg>
  );
}

function VisaLogo() {
  return (
    <span style={{
      fontFamily: "'Times New Roman', serif",
      fontStyle: "italic",
      fontWeight: 900,
      fontSize: 22,
      color: "white",
      letterSpacing: "-0.5px",
      textShadow: "0 1px 3px rgba(0,0,0,0.3)",
    }}>
      VISA
    </span>
  );
}

interface Props {
  cards: VirtualCard[];
}

export default function VirtualCardCarousel({ cards }: Props) {
  const [active, setActive] = useState(0);
  const [showNumber, setShowNumber] = useState(false);

  const card = cards[active];
  const theme = themes[card.theme];

  return (
    <div>
      {/* Card */}
      <div
        style={{
          margin: "0 20px",
          borderRadius: 20,
          padding: "24px 24px 20px",
          background: theme.bg,
          boxShadow: `0 20px 60px ${theme.glow}, 0 4px 20px rgba(0,0,0,0.5)`,
          position: "relative",
          overflow: "hidden",
          aspectRatio: "1.586",
          opacity: card.frozen ? 0.65 : 1,
          transition: "all 0.4s ease",
        }}
      >
        {/* Decorative circles */}
        <div style={{
          position: "absolute",
          top: -40,
          right: -40,
          width: 180,
          height: 180,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.04)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute",
          bottom: -60,
          left: -20,
          width: 220,
          height: 220,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.03)",
          pointerEvents: "none",
        }} />

        {/* Top row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginBottom: 2, textTransform: "uppercase", letterSpacing: "0.08em" }}>
              ada bank
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.9)" }}>
              {card.name}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {card.frozen && (
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                background: "rgba(100,180,255,0.2)",
                borderRadius: 20,
                padding: "4px 10px",
                fontSize: 11,
                color: "#60a5fa",
              }}>
                <Snowflake size={11} />
                Frosset
              </div>
            )}
            <Wifi size={18} style={{ color: "rgba(255,255,255,0.4)", transform: "rotate(90deg)" }} />
          </div>
        </div>

        {/* Chip */}
        <div style={{ marginBottom: 20 }}>
          <CardChip />
        </div>

        {/* Card number */}
        <div
          style={{
            display: "flex",
            gap: 12,
            marginBottom: 16,
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() => setShowNumber(!showNumber)}
        >
          {showNumber ? (
            <span style={{ fontFamily: "monospace", fontSize: 15, color: "rgba(255,255,255,0.9)", letterSpacing: 3 }}>
              4929 8821 1193 {card.last4}
            </span>
          ) : (
            <span style={{ fontFamily: "monospace", fontSize: 15, color: "rgba(255,255,255,0.9)", letterSpacing: 3 }}>
              •••• •••• •••• {card.last4}
            </span>
          )}
          {showNumber
            ? <EyeOff size={14} style={{ color: "rgba(255,255,255,0.4)" }} />
            : <Eye size={14} style={{ color: "rgba(255,255,255,0.4)" }} />
          }
        </div>

        {/* Bottom row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginBottom: 2 }}>UTLØPER</div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", fontFamily: "monospace" }}>{card.expiry}</div>
          </div>
          <VisaLogo />
        </div>
      </div>

      {/* Dots */}
      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 16 }}>
        {cards.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
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
          width: 36,
          height: 36,
          borderRadius: 10,
          background: "black",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 18,
        }}>

        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>Apple Pay</div>
          <div style={{ fontSize: 11, color: "var(--muted)" }}>Lagt til i Lommebok</div>
        </div>
        <div style={{ marginLeft: "auto", fontSize: 11, color: "var(--accent)", fontWeight: 500 }}>Aktiv</div>
      </div>
    </div>
  );
}
