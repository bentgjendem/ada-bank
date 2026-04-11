import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import {
  X, Zap, QrCode, HelpCircle, User, Building2,
  FileText, Inbox, Shield, Eye, LogOut, ChevronRight,
  UserPlus, Bell, CreditCard,
} from "lucide-react";

// ── Avatar ────────────────────────────────────────────────────────────────────

function Avatar() {
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {/* Outer glow ring */}
      <div style={{
        position: "absolute", inset: -3,
        borderRadius: "50%",
        background: "linear-gradient(135deg, var(--amber) 0%, var(--teal) 100%)",
        zIndex: 0,
      }} />
      {/* Avatar circle */}
      <div style={{
        position: "relative", zIndex: 1,
        width: 88, height: 88,
        borderRadius: "50%",
        border: "2px solid #ffffff",
        overflow: "hidden",
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/avatar.png" alt="Bent Gjendem" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
    </div>
  );
}

// ── Promo card ────────────────────────────────────────────────────────────────

function PromoCard({
  icon, accent, title, subtitle,
}: {
  icon: React.ReactNode;
  accent: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="glass press" style={{
      flex: 1, borderRadius: 20, padding: "18px 16px",
      cursor: "pointer", display: "flex", flexDirection: "column", gap: 28,
    }}>
      <div style={{
        width: 42, height: 42, borderRadius: 13,
        background: `${accent}18`,
        border: `1px solid ${accent}28`,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {icon}
      </div>
      <div>
        <div style={{ fontSize: 14, fontWeight: 800, color: "var(--text)", marginBottom: 3 }}>{title}</div>
        <div style={{ fontSize: 12, color: "var(--muted)", fontWeight: 500 }}>{subtitle}</div>
      </div>
    </div>
  );
}

// ── Menu section ──────────────────────────────────────────────────────────────

type MenuItem = {
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
  label: string;
  badge?: string;
};

function MenuSection({ items }: { items: MenuItem[] }) {
  return (
    <div className="glass" style={{ borderRadius: 22, overflow: "hidden", padding: "0 20px" }}>
      {items.map((item, i) => (
        <button key={item.label} className="press" style={{
          width: "100%", display: "flex", alignItems: "center", gap: 14,
          padding: "15px 0", background: "none", border: "none",
          borderBottom: i < items.length - 1 ? "1px solid #f0f4fb" : "none",
          cursor: "pointer", textAlign: "left",
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 11, flexShrink: 0,
            background: item.iconBg,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <item.icon size={17} style={{ color: item.iconColor }} strokeWidth={2} />
          </div>
          <span style={{ flex: 1, fontSize: 15, fontWeight: 600, color: "var(--text)" }}>
            {item.label}
          </span>
          {item.badge && (
            <div style={{
              background: "rgba(255,138,46,0.15)", border: "1px solid rgba(255,138,46,0.25)",
              borderRadius: 20, padding: "3px 9px",
              fontSize: 11, fontWeight: 700, color: "var(--amber)",
            }}>
              {item.badge}
            </div>
          )}
          <ChevronRight size={16} style={{ color: "var(--muted)", opacity: 0.4, flexShrink: 0 }} />
        </button>
      ))}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ProfilPage() {
  return (
    <div style={{ minHeight: "100dvh", paddingBottom: 120 }}>

      {/* Top bar */}
      <div style={{
        padding: "58px 20px 0",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <Link href="/" className="glass-sm press" style={{
          width: 40, height: 40, borderRadius: "50%",
          display: "flex", alignItems: "center", justifyContent: "center",
          textDecoration: "none", color: "var(--text2)", border: "none",
        }}>
          <X size={18} strokeWidth={2.5} />
        </Link>

        <button className="press" style={{
          display: "flex", alignItems: "center", gap: 6,
          padding: "9px 16px", borderRadius: 20,
          background: "rgba(0,48,135,0.09)",
          border: "1px solid rgba(0,48,135,0.2)",
          color: "var(--primary)", fontSize: 13, fontWeight: 700, cursor: "pointer",
        }}>
          <Zap size={14} strokeWidth={2} />
          Oppgrader
        </button>
      </div>

      {/* Profile hero */}
      <div style={{ textAlign: "center", padding: "32px 20px 28px" }}>
        <Avatar />

        {/* Premium badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 5,
          background: "linear-gradient(135deg, rgba(217,119,6,0.15), rgba(251,191,36,0.10))",
          border: "1px solid rgba(217,119,6,0.40)",
          borderRadius: 20, padding: "5px 12px",
          marginTop: 14, marginBottom: 16,
        }}>
          <Zap size={12} style={{ color: "#b45309" }} fill="#b45309" />
          <span style={{ fontSize: 12, fontWeight: 700, color: "#b45309" }}>Premium</span>
        </div>

        <div style={{ fontSize: 28, fontWeight: 900, color: "var(--text)", letterSpacing: "-0.7px", marginBottom: 8 }}>
          Bent Gjendem
        </div>

        {/* Handle + QR */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <span style={{ fontSize: 14, color: "var(--muted)", fontWeight: 500 }}>@bentgjendem</span>
          <button className="glass-sm press" style={{
            width: 28, height: 28, borderRadius: 8,
            display: "flex", alignItems: "center", justifyContent: "center",
            border: "none", cursor: "pointer", color: "var(--muted)",
          }}>
            <QrCode size={14} />
          </button>
        </div>
      </div>

      {/* Promo cards */}
      <div style={{ display: "flex", gap: 12, margin: "0 18px 20px" }}>
        <PromoCard
          icon={<Zap size={20} style={{ color: "#b45309" }} fill="#b45309" />}
          accent="#d97706"
          title="Premium"
          subtitle="Fornyes 15. mai 2026"
        />
        <PromoCard
          icon={<UserPlus size={20} style={{ color: "var(--teal)" }} />}
          accent="var(--teal)"
          title="Inviter venner"
          subtitle="Tjen opptil 2 500 kr"
        />
      </div>

      {/* Menu section 1 */}
      <div style={{ margin: "0 18px 12px" }}>
        <MenuSection items={[
          { icon: Bell,       iconColor: "var(--amber)",  iconBg: "rgba(255,138,46,0.14)",  label: "Innboks", badge: "2" },
          { icon: HelpCircle, iconColor: "var(--teal)",   iconBg: "rgba(0,212,176,0.13)",   label: "Hjelp" },
          { icon: User,       iconColor: "#82AAFF",       iconBg: "rgba(130,170,255,0.13)", label: "Personopplysninger" },
          { icon: Building2,  iconColor: "var(--text2)",  iconBg: "rgba(0,0,0,0.05)", label: "Kontodetaljer" },
          { icon: FileText,   iconColor: "var(--text2)",  iconBg: "rgba(0,0,0,0.05)", label: "Dokumenter og utskrifter" },
          { icon: CreditCard, iconColor: "var(--amber)",  iconBg: "rgba(255,138,46,0.14)",  label: "Abonnement og gebyrer" },
        ]} />
      </div>

      {/* Menu section 2 */}
      <div style={{ margin: "0 18px 12px" }}>
        <MenuSection items={[
          { icon: Shield, iconColor: "#60a5fa", iconBg: "rgba(96,165,250,0.14)", label: "Sikkerhet" },
          { icon: Eye,    iconColor: "var(--text2)", iconBg: "rgba(0,0,0,0.05)", label: "Personvern" },
        ]} />
      </div>

      {/* Logg ut */}
      <div style={{ margin: "0 18px" }}>
        <button className="glass press" style={{
          width: "100%", display: "flex", alignItems: "center", gap: 14,
          padding: "15px 20px", borderRadius: 22, border: "none", cursor: "pointer",
          textAlign: "left",
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 11, flexShrink: 0,
            background: "rgba(255,91,91,0.13)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <LogOut size={17} style={{ color: "var(--red)" }} strokeWidth={2} />
          </div>
          <span style={{ flex: 1, fontSize: 15, fontWeight: 600, color: "var(--red)" }}>Logg ut</span>
        </button>
      </div>

      {/* Version */}
      <div style={{ textAlign: "center", marginTop: 28, fontSize: 11, color: "var(--muted)", fontWeight: 500 }}>
        ada bank · versjon 1.0.0
      </div>

      <BottomNav />
    </div>
  );
}
