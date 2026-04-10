import { virtualCards } from "@/lib/data";
import VirtualCardCarousel from "@/components/VirtualCardCarousel";
import BottomNav from "@/components/BottomNav";
import { Plus, Snowflake, Settings2, Lock } from "lucide-react";

export default function KortPage() {
  return (
    <div style={{ minHeight: "100dvh", background: "var(--bg)", paddingBottom: 100 }}>

      {/* Header */}
      <div style={{
        padding: "56px 20px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: "var(--text)" }}>Virtuelle kort</div>
        <button style={{
          width: 40, height: 40,
          borderRadius: 12,
          background: "var(--surface)",
          border: "1px solid var(--border)",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer",
          color: "var(--muted)",
        }}>
          <Plus size={20} />
        </button>
      </div>

      {/* Card carousel */}
      <VirtualCardCarousel cards={virtualCards} />

      {/* Card management */}
      <div style={{ padding: "24px 20px 0" }}>
        <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>
          Kortinnstillinger
        </div>

        <div style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 18,
          overflow: "hidden",
        }}>
          {[
            {
              icon: <Snowflake size={18} style={{ color: "#60a5fa" }} />,
              bg: "rgba(96,165,250,0.12)",
              label: "Frys kortet",
              desc: "Blokker kortet midlertidig",
            },
            {
              icon: <Settings2 size={18} style={{ color: "var(--accent)" }} />,
              bg: "rgba(123,97,255,0.12)",
              label: "Bruksgrenser",
              desc: "Sett daglig og månedlig grense",
            },
            {
              icon: <Lock size={18} style={{ color: "var(--accent2)" }} />,
              bg: "rgba(0,210,200,0.12)",
              label: "Sikkerhet",
              desc: "PIN og transaksjonsvarslinger",
            },
          ].map((item, i) => (
            <button
              key={item.label}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "16px 20px",
                background: "none",
                border: "none",
                borderBottom: i < 2 ? "1px solid var(--border)" : "none",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <div style={{
                width: 40, height: 40,
                borderRadius: 12,
                background: item.bg,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                {item.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text)" }}>{item.label}</div>
                <div style={{ fontSize: 12, color: "var(--muted)" }}>{item.desc}</div>
              </div>
              <div style={{ color: "var(--muted)", opacity: 0.5 }}>›</div>
            </button>
          ))}
        </div>
      </div>

      {/* New card CTA */}
      <div style={{ padding: "16px 20px 0" }}>
        <button style={{
          width: "100%",
          padding: "16px",
          borderRadius: 18,
          background: "var(--surface)",
          border: "1px dashed rgba(255,255,255,0.12)",
          color: "var(--muted)",
          fontSize: 14,
          fontWeight: 500,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
        }}>
          <Plus size={18} />
          Opprett nytt virtuelt kort
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
