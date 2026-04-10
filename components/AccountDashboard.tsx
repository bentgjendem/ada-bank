"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Account, Transaction, accounts, formatAmount, formatDate, groupByDate } from "@/lib/data";
import TransactionList from "@/components/TransactionList";
import { ArrowUpRight, ArrowDownLeft, TrendingUp, ChevronRight, Clock } from "lucide-react";

// ── Balance card for each account ──────────────────────────────────────────

function CheckingCard({ acc, txns }: { acc: Account; txns: Transaction[] }) {
  const thisMonth = txns
    .filter((t) => t.date.startsWith("2026-04"))
    .reduce((sum, t) => (t.amount < 0 ? sum + Math.abs(t.amount) : sum), 0);
  const income = txns
    .filter((t) => t.date.startsWith("2026-04") && t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div style={{
      padding: "28px 24px",
      borderRadius: 24,
      background: "linear-gradient(135deg, #1a1030 0%, #2d1b69 50%, #7b61ff 100%)",
      boxShadow: "0 20px 60px rgba(123,97,255,0.25), 0 4px 20px rgba(0,0,0,0.4)",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: -50, right: -50, width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,0.05)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -80, left: -30, width: 250, height: 250, borderRadius: "50%", background: "rgba(0,210,200,0.06)", pointerEvents: "none" }} />
      <div style={{ position: "relative" }}>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginBottom: 8 }}>{acc.name}</div>
        <div className="tabular" style={{ fontSize: 44, fontWeight: 800, color: "white", letterSpacing: "-1.5px", lineHeight: 1.1 }}>
          {formatAmount(acc.balance)}
          <span style={{ fontSize: 22, fontWeight: 500, marginLeft: 6, opacity: 0.6 }}>kr</span>
        </div>
        <div style={{ display: "flex", gap: 24, marginTop: 20 }}>
          <div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 3, textTransform: "uppercase", letterSpacing: "0.06em" }}>Inn april</div>
            <div className="tabular" style={{ fontSize: 14, fontWeight: 700, color: "#4ade80" }}>+{formatAmount(income)} kr</div>
          </div>
          <div style={{ width: 1, background: "rgba(255,255,255,0.1)" }} />
          <div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 3, textTransform: "uppercase", letterSpacing: "0.06em" }}>Ut april</div>
            <div className="tabular" style={{ fontSize: 14, fontWeight: 700, color: "rgba(255,255,255,0.75)" }}>–{formatAmount(thisMonth)} kr</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SavingsCard({ acc, txns }: { acc: Account; txns: Transaction[] }) {
  // Monthly interest = balance * rate / 12
  const monthlyInterest = Math.round((acc.balance * (acc.interestRate! / 100)) / 12);
  const totalDeposited = txns
    .filter((t) => t.amount > 0 && t.category === "Innskudd")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div style={{
      padding: "28px 24px",
      borderRadius: 24,
      background: "linear-gradient(135deg, #0a2218 0%, #0d4a2a 40%, #16a34a 100%)",
      boxShadow: "0 20px 60px rgba(22,163,74,0.2), 0 4px 20px rgba(0,0,0,0.4)",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Decorative */}
      <div style={{ position: "absolute", top: -40, right: -40, width: 180, height: 180, borderRadius: "50%", background: "rgba(255,255,255,0.04)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -70, left: -20, width: 230, height: 230, borderRadius: "50%", background: "rgba(74,222,128,0.05)", pointerEvents: "none" }} />

      <div style={{ position: "relative" }}>
        {/* Interest rate badge */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{acc.name}</div>
          <div style={{
            display: "flex", alignItems: "center", gap: 5,
            background: "rgba(74,222,128,0.18)",
            border: "1px solid rgba(74,222,128,0.3)",
            borderRadius: 20,
            padding: "4px 10px",
          }}>
            <TrendingUp size={12} style={{ color: "#4ade80" }} />
            <span style={{ fontSize: 12, fontWeight: 700, color: "#4ade80" }}>
              {acc.interestRate?.toFixed(2).replace(".", ",")} % rente
            </span>
          </div>
        </div>

        <div className="tabular" style={{ fontSize: 44, fontWeight: 800, color: "white", letterSpacing: "-1.5px", lineHeight: 1.1 }}>
          {formatAmount(acc.balance)}
          <span style={{ fontSize: 22, fontWeight: 500, marginLeft: 6, opacity: 0.6 }}>kr</span>
        </div>

        <div style={{ display: "flex", gap: 24, marginTop: 20 }}>
          <div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 3, textTransform: "uppercase", letterSpacing: "0.06em" }}>Renter/mnd</div>
            <div className="tabular" style={{ fontSize: 14, fontWeight: 700, color: "#4ade80" }}>+{formatAmount(monthlyInterest)} kr</div>
          </div>
          <div style={{ width: 1, background: "rgba(255,255,255,0.1)" }} />
          <div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 3, textTransform: "uppercase", letterSpacing: "0.06em" }}>Innskudd totalt</div>
            <div className="tabular" style={{ fontSize: 14, fontWeight: 700, color: "rgba(255,255,255,0.75)" }}>{formatAmount(totalDeposited)} kr</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main swipeable dashboard ────────────────────────────────────────────────

interface Props {
  allTransactions: Transaction[];
}

export default function AccountDashboard({ allTransactions }: Props) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const touchStartX = useRef<number | null>(null);
  const mouseStartX = useRef<number | null>(null);

  const acc = accounts[activeIdx];
  const txns = allTransactions.filter((t) => t.accountId === acc.id);
  const total = accounts.length;

  // ── Touch handlers ──
  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }
  function onTouchMove(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const delta = e.touches[0].clientX - touchStartX.current;
    setDragOffset(delta);
    setIsDragging(true);
  }
  function onTouchEnd() {
    commit();
    touchStartX.current = null;
  }

  // ── Mouse handlers (desktop) ──
  function onMouseDown(e: React.MouseEvent) {
    mouseStartX.current = e.clientX;
    setIsDragging(false);
  }
  function onMouseMove(e: React.MouseEvent) {
    if (mouseStartX.current === null) return;
    const delta = e.clientX - mouseStartX.current;
    if (Math.abs(delta) > 5) setIsDragging(true);
    setDragOffset(delta);
  }
  function onMouseUp() {
    commit();
    mouseStartX.current = null;
  }
  function onMouseLeave() {
    if (mouseStartX.current !== null) {
      commit();
      mouseStartX.current = null;
    }
  }

  function commit() {
    const THRESHOLD = 50;
    if (dragOffset < -THRESHOLD && activeIdx < total - 1) {
      setActiveIdx((i) => i + 1);
    } else if (dragOffset > THRESHOLD && activeIdx > 0) {
      setActiveIdx((i) => i - 1);
    }
    setDragOffset(0);
    setIsDragging(false);
  }

  const cardStyle = {
    margin: "0 20px",
    userSelect: "none" as const,
    cursor: isDragging ? "grabbing" : "grab",
    transform: `translateX(${dragOffset * 0.3}px)`,
    transition: isDragging ? "none" : "transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",
  };

  return (
    <>
      {/* Swipeable card area */}
      <div
        style={cardStyle}
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

      {/* Dot indicators */}
      <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 14 }}>
        {accounts.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIdx(i)}
            style={{
              width: i === activeIdx ? 20 : 6,
              height: 6,
              borderRadius: 3,
              border: "none",
              background: i === activeIdx ? "white" : "rgba(255,255,255,0.2)",
              cursor: "pointer",
              transition: "all 0.3s ease",
              padding: 0,
            }}
          />
        ))}
      </div>

      {/* Quick actions */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, margin: "16px 20px 0" }}>
        <Link href="/overfor" style={{ textDecoration: "none" }}>
          <div style={{
            padding: "16px 20px",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 18,
            display: "flex", alignItems: "center", gap: 12,
          }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(123,97,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <ArrowUpRight size={20} style={{ color: "var(--accent)" }} />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text)" }}>Overfør</div>
              <div style={{ fontSize: 11, color: "var(--muted)" }}>Til konto</div>
            </div>
          </div>
        </Link>

        <Link href="/betal" style={{ textDecoration: "none" }}>
          <div style={{
            padding: "16px 20px",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 18,
            display: "flex", alignItems: "center", gap: 12,
          }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(0,210,200,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <ArrowDownLeft size={20} style={{ color: "var(--accent2)" }} />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text)" }}>Betal</div>
              <div style={{ fontSize: 11, color: "var(--muted)" }}>Regning / KID</div>
            </div>
          </div>
        </Link>
      </div>

      {/* Transactions header */}
      <div style={{ padding: "24px 20px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 17, fontWeight: 700, color: "var(--text)" }}>Transaksjoner</div>
        <div style={{ fontSize: 12, color: "var(--muted)" }}>{acc.name}</div>
      </div>

      <div style={{ marginTop: 12 }}>
        <TransactionList transactions={txns} />
      </div>
    </>
  );
}
