import { virtualCards } from "@/lib/data";
import VirtualCardCarousel from "@/components/VirtualCardCarousel";
import BottomNav from "@/components/BottomNav";
import { Plus } from "lucide-react";

export default function KortPage() {
  return (
    <div style={{ minHeight: "100dvh", paddingBottom: 120 }}>
      {/* Header */}
      <div style={{
        padding: "58px 22px 20px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 3 }}>
            ada bank
          </div>
          <div style={{ fontSize: 22, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.4px" }}>
            Virtuelle kort
          </div>
        </div>
        <button className="glass-sm press" style={{
          width: 40, height: 40, borderRadius: 13,
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", border: "none", color: "var(--text2)",
        }}>
          <Plus size={19} strokeWidth={2} />
        </button>
      </div>

      <VirtualCardCarousel cards={virtualCards} />

      {/* New card CTA */}
      <div style={{ margin: "14px 18px 0" }}>
        <button className="glass-sm press" style={{
          width: "100%", padding: "16px",
          borderRadius: 18, border: "1px dashed rgba(255,255,255,0.10)",
          color: "var(--muted)", fontSize: 14, fontWeight: 600,
          cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        }}>
          <Plus size={16} />
          Opprett nytt virtuelt kort
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
