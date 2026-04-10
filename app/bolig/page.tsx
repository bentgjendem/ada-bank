import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import { ArrowLeft, Home, TrendingUp, Landmark, PiggyBank, ArrowDownLeft } from "lucide-react";

// ── Value history data ─────────────────────────────────────────────────────────

const valueHistory = [
  { year: "2020", value: 4_050_000 },
  { year: "2021", value: 4_420_000 },
  { year: "2022", value: 4_750_000 },
  { year: "2023", value: 4_900_000 },
  { year: "2024", value: 5_080_000 },
  { year: "2025", value: 5_210_000 },
  { year: "2026", value: 5_300_000 },
];

const PROPERTY_VALUE = 5_300_000;
const LOAN           = 2_345_000;
const EQUITY         = PROPERTY_VALUE - LOAN;
const INTEREST_RATE  = 5.49;

const MONTHLY_INTEREST  = Math.round((LOAN * (INTEREST_RATE / 100)) / 12);
const MONTHLY_PRINCIPAL = 7_252;
const MONTHLY_TOTAL     = MONTHLY_INTEREST + MONTHLY_PRINCIPAL;

function fmt(n: number) {
  return n.toLocaleString("nb-NO");
}

// ── Sparkline chart ────────────────────────────────────────────────────────────

function ValueChart() {
  const W = 340, H = 130, PAD = 16;
  const vals = valueHistory.map((d) => d.value);
  const min = Math.min(...vals);
  const max = Math.max(...vals);
  const range = max - min;

  const pts = valueHistory.map((d, i) => {
    const x = PAD + (i / (valueHistory.length - 1)) * (W - PAD * 2);
    const y = H - PAD - ((d.value - min) / range) * (H - PAD * 2);
    return { x, y, ...d };
  });

  const pathD = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaD = `${pathD} L ${pts[pts.length - 1].x} ${H} L ${pts[0].x} ${H} Z`;

  // last dot
  const last = pts[pts.length - 1];

  return (
    <div style={{ margin: "0 -4px" }}>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", overflow: "visible" }}>
        <defs>
          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--teal)" stopOpacity="0.28" />
            <stop offset="100%" stopColor="var(--teal)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Area fill */}
        <path d={areaD} fill="url(#chartGrad)" />

        {/* Line */}
        <path d={pathD} fill="none" stroke="var(--teal)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

        {/* Year labels */}
        {pts.map((p, i) => (
          i % 2 === 0 && (
            <text key={p.year} x={p.x} y={H - 1} textAnchor="middle"
              style={{ fontSize: 9, fill: "var(--muted)", fontFamily: "inherit", fontWeight: 600 }}>
              {p.year}
            </text>
          )
        ))}

        {/* Last dot + callout */}
        <circle cx={last.x} cy={last.y} r={4} fill="var(--teal)" />
        <circle cx={last.x} cy={last.y} r={8} fill="var(--teal)" fillOpacity={0.2} />
      </svg>
    </div>
  );
}

// ── Stat row ──────────────────────────────────────────────────────────────────

function StatRow({
  icon: Icon,
  iconColor,
  iconBg,
  label,
  value,
  sub,
  valueColor = "var(--text)",
}: {
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
  label: string;
  value: string;
  sub?: string;
  valueColor?: string;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <div style={{
        width: 44, height: 44, borderRadius: 14, flexShrink: 0,
        background: iconBg,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <Icon size={20} style={{ color: iconColor }} strokeWidth={2} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, color: "var(--muted)", fontWeight: 500 }}>{label}</div>
        {sub && <div style={{ fontSize: 11, color: "var(--muted)", fontWeight: 500, marginTop: 1 }}>{sub}</div>}
      </div>
      <div style={{ fontSize: 17, fontWeight: 800, color: valueColor, fontVariantNumeric: "tabular-nums" }}>
        {value}
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function BoligPage() {
  const gainSince2020 = PROPERTY_VALUE - valueHistory[0].value;
  const gainPct = ((gainSince2020 / valueHistory[0].value) * 100).toFixed(1).replace(".", ",");
  const equityPct = Math.round((EQUITY / PROPERTY_VALUE) * 100);

  return (
    <div style={{ minHeight: "100dvh", paddingBottom: 120 }}>

      {/* Header */}
      <div style={{ padding: "58px 22px 20px", display: "flex", alignItems: "center", gap: 12 }}>
        <Link href="/" className="glass-sm press" style={{
          width: 40, height: 40, borderRadius: 13,
          display: "flex", alignItems: "center", justifyContent: "center",
          textDecoration: "none", color: "var(--text)", border: "none",
        }}>
          <ArrowLeft size={19} strokeWidth={2} />
        </Link>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 2 }}>
            ada bank
          </div>
          <div style={{ fontSize: 22, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.4px" }}>
            Min bolig
          </div>
        </div>
      </div>

      {/* Property hero card */}
      <div style={{ margin: "0 18px 16px" }}>
        <div style={{ position: "relative" }}>
          {/* Glow */}
          <div aria-hidden style={{
            position: "absolute", left: "10%", right: "10%", top: "40%", bottom: "-10%",
            background: "radial-gradient(ellipse, rgba(0,212,176,0.4) 0%, transparent 70%)",
            filter: "blur(28px)", borderRadius: "50%", pointerEvents: "none", zIndex: 0,
          }} />
          <div className="glass" style={{ borderRadius: 26, padding: "26px 24px", position: "relative", zIndex: 1 }}>
            {/* Address + icon */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text2)", marginBottom: 6 }}>
                  Leilighet · Bergen
                </div>
                <div style={{ fontSize: 13, color: "var(--muted)", fontWeight: 500, marginBottom: 20 }}>
                  Nygårdsgaten 14, 5008 Bergen
                </div>
              </div>
              <div style={{
                width: 42, height: 42, borderRadius: 13,
                background: "rgba(0,212,176,0.14)",
                border: "1px solid rgba(0,212,176,0.22)",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <Home size={20} style={{ color: "var(--teal)" }} strokeWidth={2} />
              </div>
            </div>

            {/* Value */}
            <div style={{ fontSize: 46, fontWeight: 800, color: "var(--text)", letterSpacing: "-1.5px", lineHeight: 1, marginBottom: 6, fontVariantNumeric: "tabular-nums" }}>
              {fmt(PROPERTY_VALUE)}
            </div>
            <div style={{ fontSize: 14, color: "var(--text2)", fontWeight: 500, marginBottom: 20 }}>
              norske kroner
            </div>

            {/* Chart */}
            <ValueChart />

            {/* Gain badge */}
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 10 }}>
              <TrendingUp size={13} style={{ color: "var(--teal)" }} />
              <span style={{ fontSize: 13, fontWeight: 700, color: "var(--teal)" }}>
                +{fmt(gainSince2020)} kr siden 2020 ({gainPct} %)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Loan + Equity */}
      <div style={{ margin: "0 18px 16px" }}>
        <div className="glass" style={{ borderRadius: 22, padding: "20px 20px", display: "flex", flexDirection: "column", gap: 18 }}>

          <StatRow
            icon={Landmark}
            iconColor="#60a5fa"
            iconBg="rgba(96,165,250,0.14)"
            label="Boliglån"
            sub={`${INTEREST_RATE.toFixed(2).replace(".", ",")} % rente`}
            value={`${fmt(LOAN)} kr`}
            valueColor="var(--text)"
          />

          <div style={{ height: 1, background: "rgba(255,255,255,0.07)" }} />

          <StatRow
            icon={PiggyBank}
            iconColor="var(--teal)"
            iconBg="rgba(0,212,176,0.13)"
            label="Egenkapital"
            sub={`${equityPct} % av boligverdi`}
            value={`${fmt(EQUITY)} kr`}
            valueColor="var(--teal)"
          />
        </div>
      </div>

      {/* Equity bar */}
      <div style={{ margin: "0 18px 16px" }}>
        <div className="glass-sm" style={{ borderRadius: 18, padding: "16px 18px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, fontSize: 12, fontWeight: 600, color: "var(--muted)" }}>
            <span>Lån</span>
            <span>Egenkapital</span>
          </div>
          <div style={{ height: 10, borderRadius: 6, background: "rgba(255,255,255,0.07)", overflow: "hidden" }}>
            <div style={{
              height: "100%",
              width: `${100 - equityPct}%`,
              background: "linear-gradient(90deg, #60a5fa, rgba(96,165,250,0.6))",
              borderRadius: 6,
              float: "left",
            }} />
            <div style={{
              height: "100%",
              width: `${equityPct}%`,
              background: "linear-gradient(90deg, rgba(0,212,176,0.6), var(--teal))",
              borderRadius: 6,
              float: "left",
            }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 11, fontWeight: 700 }}>
            <span style={{ color: "#60a5fa" }}>{100 - equityPct} %</span>
            <span style={{ color: "var(--teal)" }}>{equityPct} %</span>
          </div>
        </div>
      </div>

      {/* Last payment */}
      <div style={{ margin: "0 18px" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "var(--muted)", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.08em" }}>
          Siste betaling
        </div>
        <div className="glass" style={{ borderRadius: 22, padding: "18px 20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 14, flexShrink: 0,
              background: "rgba(255,91,91,0.13)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <ArrowDownLeft size={20} style={{ color: "var(--red)" }} strokeWidth={2} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text)" }}>Terminkrav april</div>
              <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>01.04.2026 · DNB Boliglån</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 17, fontWeight: 800, color: "var(--red)", fontVariantNumeric: "tabular-nums" }}>
                –{fmt(MONTHLY_TOTAL)} kr
              </div>
            </div>
          </div>

          {/* Breakdown */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 14, display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 13, color: "var(--muted)", fontWeight: 500 }}>Renter ({INTEREST_RATE.toFixed(2).replace(".", ",")} %)</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text2)", fontVariantNumeric: "tabular-nums" }}>–{fmt(MONTHLY_INTEREST)} kr</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 13, color: "var(--muted)", fontWeight: 500 }}>Avdrag</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text2)", fontVariantNumeric: "tabular-nums" }}>–{fmt(MONTHLY_PRINCIPAL)} kr</span>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
