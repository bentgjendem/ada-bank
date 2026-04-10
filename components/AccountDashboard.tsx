"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Account, Transaction, accounts, formatAmount } from "@/lib/data";
import TransactionList from "@/components/TransactionList";
import { ArrowUpRight, ArrowDownLeft, TrendingUp, Home, MoreHorizontal } from "lucide-react";

// ── Account card ──────────────────────────────────────────────

function CheckingCard({ acc, txns }: { acc: Account; txns: Transaction[] }) {
  const thisMonth = txns
    .filter((t) => t.date.startsWith("2026-04"))
    .reduce((s, t) => (t.amount < 0 ? s + Math.abs(t.amount) : s), 0);
  const income = txns
    .filter((t) => t.date.startsWith("2026-04") && t.amount > 0)
    .reduce((s, t) => s + t.amount, 0);

  return (
    <div style={{
      background: "linear-gradient(135deg, #001a57 0%, #003087 60%, #0052cc 100%)",
      borderRadius: 26,
      padding: "28px 26px 24px",
      boxShadow: "0 8px 32px rgba(0, 48, 135, 0.25)",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Subtle grid pattern */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }} />

      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginBottom: 5 }}>
          {acc.name}
        </div>
        <div className="tabular" style={{ fontSize: 54, fontWeight: 800, color: "#ffffff", letterSpacing: "-2px", lineHeight: 1 }}>
          {formatAmount(acc.balance)}
        </div>
        <div style={{ fontSize: 16, fontWeight: 500, color: "rgba(255,255,255,0.55)", marginTop: 4, marginBottom: 24 }}>
          norske kroner
        </div>

        <div style={{ display: "flex", gap: 12, borderTop: "1px solid rgba(255,255,255,0.12)", paddingTop: 18 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginBottom: 5 }}>Inn april</div>
            <div className="tabular" style={{ fontSize: 17, fontWeight: 700, color: "#4ade80" }}>+{formatAmount(income)}</div>
          </div>
          <div style={{ width: 1, background: "rgba(255,255,255,0.12)" }} />
          <div style={{ flex: 1, paddingLeft: 12 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginBottom: 5 }}>Ut april</div>
            <div className="tabular" style={{ fontSize: 17, fontWeight: 700, color: "rgba(255,255,255,0.8)" }}>–{formatAmount(thisMonth)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SavingsCard({ acc, txns }: { acc: Account; txns: Transaction[] }) {
  const monthlyInterest = Math.round((acc.balance * (acc.interestRate! / 100)) / 12);
  const totalDeposited = txns
    .filter((t) => t.amount > 0 && t.category === "Innskudd")
    .reduce((s, t) => s + t.amount, 0);

  return (
    <div style={{
      background: "linear-gradient(135deg, #0c4a6e 0%, #0369a1 60%, #0891b2 100%)",
      borderRadius: 26,
      padding: "28px 26px 24px",
      boxShadow: "0 8px 32px rgba(8, 145, 178, 0.25)",
      position: "relative",
      overflow: "hidden",
    }}>
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }} />

      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 5 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)" }}>
            {acc.name}
          </div>
          <div style={{
            display: "flex", alignItems: "center", gap: 5,
            background: "rgba(255,255,255,0.15)", borderRadius: 24, padding: "5px 11px",
          }}>
            <TrendingUp size={12} style={{ color: "#7dd3fc" }} />
            <span style={{ fontSize: 12, fontWeight: 700, color: "#7dd3fc" }}>
              {acc.interestRate?.toFixed(2).replace(".", ",")} %
            </span>
          </div>
        </div>
        <div className="tabular" style={{ fontSize: 54, fontWeight: 800, color: "#ffffff", letterSpacing: "-2px", lineHeight: 1 }}>
          {formatAmount(acc.balance)}
        </div>
        <div style={{ fontSize: 16, fontWeight: 500, color: "rgba(255,255,255,0.55)", marginTop: 4, marginBottom: 24 }}>
          norske kroner
        </div>

        <div style={{ display: "flex", gap: 12, borderTop: "1px solid rgba(255,255,255,0.12)", paddingTop: 18 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginBottom: 5 }}>Renter/mnd</div>
            <div className="tabular" style={{ fontSize: 17, fontWeight: 700, color: "#7dd3fc" }}>+{formatAmount(monthlyInterest)}</div>
          </div>
          <div style={{ width: 1, background: "rgba(255,255,255,0.12)" }} />
          <div style={{ flex: 1, paddingLeft: 12 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginBottom: 5 }}>Innskudd</div>
            <div className="tabular" style={{ fontSize: 17, fontWeight: 700, color: "rgba(255,255,255,0.8)" }}>{formatAmount(totalDeposited)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Quick action button ───────────────────────────────────────

function QuickAction({
  href, icon: Icon, label, iconColor, iconBg,
}: {
  href: string; icon: React.ElementType; label: string; iconColor: string; iconBg: string;
}) {
  return (
    <Link href={href} style={{ textDecoration: "none", flex: 1 }}>
      <div className="glass press" style={{
        borderRadius: 18, padding: "14px 8px",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 8, cursor: "pointer",
      }}>
        <div style={{
          width: 44, height: 44, borderRadius: 14,
          background: iconBg,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Icon size={20} color={iconColor} strokeWidth={2} />
        </div>
        <span style={{ fontSize: 11, fontWeight: 600, color: "var(--text2)", letterSpacing: "0.02em", textAlign: "center" }}>
          {label}
        </span>
      </div>
    </Link>
  );
}

// ── Main dashboard ────────────────────────────────────────────

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
      {/* Swipeable balance card */}
      <div
        style={{
          margin: "4px 18px 0",
          userSelect: "none",
          cursor: isDragging ? "grabbing" : "grab",
          transform: `translateX(${dragOffset * 0.28}px)`,
          transition: isDragging ? "none" : "transform 0.4s cubic-bezier(0.34,1.56,0.64,1)",
        }}
        onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseLeave={onMouseLeave}
      >
        {activeIdx === 0
          ? <CheckingCard acc={acc} txns={txns} />
          : <SavingsCard acc={acc} txns={txns} />
        }
      </div>

      {/* Dots */}
      <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 14 }}>
        {accounts.map((_, i) => (
          <button key={i} onClick={() => setActiveIdx(i)} style={{
            width: i === activeIdx ? 22 : 6, height: 6, borderRadius: 3, border: "none",
            background: i === activeIdx ? (i === 0 ? "var(--primary)" : "var(--teal)") : "rgba(0,48,135,0.18)",
            cursor: "pointer", transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)", padding: 0,
          }} />
        ))}
      </div>

      {/* Quick actions */}
      <div style={{ display: "flex", gap: 10, margin: "20px 18px 0" }}>
        <QuickAction href="/overfor" icon={ArrowUpRight}   label="Overfør"   iconColor="var(--primary)" iconBg="rgba(0,48,135,0.10)" />
        <QuickAction href="/betal"   icon={ArrowDownLeft}  label="Betal"     iconColor="var(--teal)"    iconBg="rgba(8,145,178,0.12)" />
        <QuickAction href="/bolig"   icon={Home}           label="Min bolig" iconColor="var(--teal)"    iconBg="rgba(8,145,178,0.12)" />
        <QuickAction href="/"        icon={MoreHorizontal} label="Mer"       iconColor="var(--muted)"   iconBg="rgba(0,0,0,0.06)" />
      </div>

      {/* Transactions header */}
      <div style={{ padding: "28px 22px 8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 19, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.3px" }}>
          Transaksjoner
        </div>
        <div style={{
          fontSize: 11, fontWeight: 700, color: "var(--primary)",
          background: "rgba(0,48,135,0.08)", border: "1px solid rgba(0,48,135,0.15)",
          borderRadius: 20, padding: "4px 10px",
          letterSpacing: "0.04em", textTransform: "uppercase",
        }}>
          {acc.name}
        </div>
      </div>

      <TransactionList transactions={txns} />
    </>
  );
}
