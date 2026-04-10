"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Account, Transaction, accounts, formatAmount } from "@/lib/data";
import TransactionList from "@/components/TransactionList";
import { ArrowUpRight, ArrowDownLeft, TrendingUp, QrCode, MoreHorizontal } from "lucide-react";

// ── Glow wrapper ─────────────────────────────────────────────────────────────

function GlowCard({
  children,
  glowColor,
}: {
  children: React.ReactNode;
  glowColor: string;
}) {
  return (
    <div style={{ position: "relative" }}>
      {/* Ambient glow behind the glass */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: "10%",
          right: "10%",
          top: "30%",
          bottom: "-10%",
          background: glowColor,
          filter: "blur(32px)",
          borderRadius: "50%",
          opacity: 0.55,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div className="glass" style={{ borderRadius: 26, position: "relative", zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}

// ── Checking card ─────────────────────────────────────────────────────────────

function CheckingCard({ acc, txns }: { acc: Account; txns: Transaction[] }) {
  const thisMonth = txns
    .filter((t) => t.date.startsWith("2026-04"))
    .reduce((s, t) => (t.amount < 0 ? s + Math.abs(t.amount) : s), 0);
  const income = txns
    .filter((t) => t.date.startsWith("2026-04") && t.amount > 0)
    .reduce((s, t) => s + t.amount, 0);

  return (
    <GlowCard glowColor="radial-gradient(ellipse, rgba(255,138,46,0.5) 0%, transparent 70%)">
      <div style={{ padding: "28px 26px 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 5 }}>
              {acc.name}
            </div>
            <div className="tabular" style={{ fontSize: 54, fontWeight: 800, color: "var(--text)", letterSpacing: "-2px", lineHeight: 1 }}>
              {formatAmount(acc.balance)}
            </div>
            <div style={{ fontSize: 18, fontWeight: 500, color: "var(--muted)", marginTop: 4 }}>
              norske kroner
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div style={{
          display: "flex",
          gap: 12,
          borderTop: "1px solid rgba(255,255,255,0.07)",
          paddingTop: 20,
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 6 }}>Inn april</div>
            <div className="tabular" style={{ fontSize: 17, fontWeight: 700, color: "var(--green)" }}>+{formatAmount(income)}</div>
          </div>
          <div style={{ width: 1, background: "rgba(255,255,255,0.07)" }} />
          <div style={{ flex: 1, paddingLeft: 12 }}>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 6 }}>Ut april</div>
            <div className="tabular" style={{ fontSize: 17, fontWeight: 700, color: "var(--text2)" }}>–{formatAmount(thisMonth)}</div>
          </div>
        </div>
      </div>
    </GlowCard>
  );
}

// ── Savings card ──────────────────────────────────────────────────────────────

function SavingsCard({ acc, txns }: { acc: Account; txns: Transaction[] }) {
  const monthlyInterest = Math.round((acc.balance * (acc.interestRate! / 100)) / 12);
  const totalDeposited = txns
    .filter((t) => t.amount > 0 && t.category === "Innskudd")
    .reduce((s, t) => s + t.amount, 0);

  return (
    <GlowCard glowColor="radial-gradient(ellipse, rgba(0,212,176,0.45) 0%, transparent 70%)">
      <div style={{ padding: "28px 26px 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 5 }}>
              {acc.name}
            </div>
            <div className="tabular" style={{ fontSize: 54, fontWeight: 800, color: "var(--text)", letterSpacing: "-2px", lineHeight: 1 }}>
              {formatAmount(acc.balance)}
            </div>
            <div style={{ fontSize: 18, fontWeight: 500, color: "var(--muted)", marginTop: 4 }}>
              norske kroner
            </div>
          </div>

          {/* Interest rate badge */}
          <div style={{
            display: "flex", alignItems: "center", gap: 5,
            background: "rgba(0,212,176,0.14)",
            border: "1px solid rgba(0,212,176,0.25)",
            borderRadius: 24,
            padding: "6px 12px",
            flexShrink: 0,
          }}>
            <TrendingUp size={13} style={{ color: "var(--teal)" }} />
            <span style={{ fontSize: 13, fontWeight: 700, color: "var(--teal)" }}>
              {acc.interestRate?.toFixed(2).replace(".", ",")} %
            </span>
          </div>
        </div>

        {/* Stats row */}
        <div style={{
          display: "flex",
          gap: 12,
          borderTop: "1px solid rgba(255,255,255,0.07)",
          paddingTop: 20,
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 6 }}>Renter/mnd</div>
            <div className="tabular" style={{ fontSize: 17, fontWeight: 700, color: "var(--teal)" }}>+{formatAmount(monthlyInterest)}</div>
          </div>
          <div style={{ width: 1, background: "rgba(255,255,255,0.07)" }} />
          <div style={{ flex: 1, paddingLeft: 12 }}>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 6 }}>Innskudd</div>
            <div className="tabular" style={{ fontSize: 17, fontWeight: 700, color: "var(--text2)" }}>{formatAmount(totalDeposited)}</div>
          </div>
        </div>
      </div>
    </GlowCard>
  );
}

// ── Quick action button ───────────────────────────────────────────────────────

function QuickAction({
  href,
  icon: Icon,
  label,
  iconColor,
  iconBg,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
  iconColor: string;
  iconBg: string;
}) {
  return (
    <Link href={href} style={{ textDecoration: "none", flex: 1 }}>
      <div
        className="glass-sm press"
        style={{
          borderRadius: 18,
          padding: "14px 12px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          cursor: "pointer",
        }}
      >
        <div style={{
          width: 44, height: 44,
          borderRadius: 14,
          background: iconBg,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Icon size={20} color={iconColor} strokeWidth={2} />
        </div>
        <span style={{ fontSize: 11, fontWeight: 600, color: "var(--text2)", letterSpacing: "0.02em" }}>
          {label}
        </span>
      </div>
    </Link>
  );
}

// ── Main dashboard ────────────────────────────────────────────────────────────

export default function AccountDashboard({ allTransactions }: { allTransactions: Transaction[] }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const touchStartX = useRef<number | null>(null);
  const mouseStartX = useRef<number | null>(null);

  const acc = accounts[activeIdx];
  const txns = allTransactions.filter((t) => t.accountId === acc.id);

  function onTouchStart(e: React.TouchEvent) { touchStartX.current = e.touches[0].clientX; }
  function onTouchMove(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    setDragOffset(e.touches[0].clientX - touchStartX.current);
    setIsDragging(true);
  }
  function onTouchEnd() { commit(); touchStartX.current = null; }

  function onMouseDown(e: React.MouseEvent) { mouseStartX.current = e.clientX; }
  function onMouseMove(e: React.MouseEvent) {
    if (mouseStartX.current === null) return;
    const d = e.clientX - mouseStartX.current;
    if (Math.abs(d) > 5) setIsDragging(true);
    setDragOffset(d);
  }
  function onMouseUp() { commit(); mouseStartX.current = null; }
  function onMouseLeave() { if (mouseStartX.current !== null) { commit(); mouseStartX.current = null; } }

  function commit() {
    if (dragOffset < -50 && activeIdx < accounts.length - 1) setActiveIdx((i) => i + 1);
    else if (dragOffset > 50 && activeIdx > 0) setActiveIdx((i) => i - 1);
    setDragOffset(0);
    setIsDragging(false);
  }

  return (
    <>
      {/* ── Swipeable balance card ── */}
      <div
        style={{
          margin: "4px 18px 0",
          userSelect: "none",
          cursor: isDragging ? "grabbing" : "grab",
          transform: `translateX(${dragOffset * 0.28}px)`,
          transition: isDragging ? "none" : "transform 0.4s cubic-bezier(0.34,1.56,0.64,1)",
        }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
      >
        {activeIdx === 0
          ? <CheckingCard acc={acc} txns={txns} />
          : <SavingsCard acc={acc} txns={txns} />
        }
      </div>

      {/* Dots */}
      <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 14 }}>
        {accounts.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIdx(i)}
            style={{
              width: i === activeIdx ? 22 : 6,
              height: 6,
              borderRadius: 3,
              border: "none",
              background: i === activeIdx
                ? (i === 0 ? "var(--amber)" : "var(--teal)")
                : "rgba(255,255,255,0.15)",
              cursor: "pointer",
              transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
              padding: 0,
            }}
          />
        ))}
      </div>

      {/* ── Quick actions ── */}
      <div style={{ display: "flex", gap: 10, margin: "20px 18px 0" }}>
        <QuickAction href="/overfor" icon={ArrowUpRight}  label="Overfør" iconColor="var(--amber)" iconBg="rgba(255,138,46,0.15)" />
        <QuickAction href="/betal"   icon={ArrowDownLeft} label="Betal"   iconColor="var(--teal)"  iconBg="rgba(0,212,176,0.13)" />
        <QuickAction href="/kort"    icon={QrCode}        label="Skann"   iconColor="var(--text2)" iconBg="rgba(255,255,255,0.07)" />
        <QuickAction href="/"        icon={MoreHorizontal} label="Mer"    iconColor="var(--text2)" iconBg="rgba(255,255,255,0.07)" />
      </div>

      {/* ── Transactions ── */}
      <div style={{ padding: "28px 22px 8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 19, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.3px" }}>
          Transaksjoner
        </div>
        <div style={{
          fontSize: 11, fontWeight: 600, color: "var(--muted)",
          background: "rgba(255,255,255,0.06)",
          border: "1px solid var(--border)",
          borderRadius: 20,
          padding: "4px 10px",
          letterSpacing: "0.04em",
          textTransform: "uppercase",
        }}>
          {acc.name}
        </div>
      </div>

      <TransactionList transactions={txns} />
    </>
  );
}
