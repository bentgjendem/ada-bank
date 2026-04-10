export type Transaction = {
  id: string;
  accountId: string;
  merchant: string;
  category: string;
  amount: number; // negative = expense, positive = income
  date: string;
  time: string;
  icon: string;
  description?: string;
  cardLast4?: string;
  status: "completed" | "pending" | "refunded";
  location?: string;
};

export type VirtualCard = {
  id: string;
  name: string;
  last4: string;
  expiry: string;
  network: "visa";
  theme: "midnight" | "aurora" | "rose" | "ocean";
  frozen: boolean;
  spendLimit?: number;
  spentThisMonth: number;
};

export type Account = {
  id: string;
  name: string;
  iban: string;
  balance: number;
  currency: string;
  interestRate?: number; // annual %, e.g. 4.0
};

export const account: Account = {
  id: "acc_001",
  name: "Brukskonto",
  iban: "NO9386011117947",
  balance: 24680,
  currency: "NOK",
};

export const savingsAccount: Account = {
  id: "acc_002",
  name: "Sparekonto",
  iban: "NO5486011117952",
  balance: 106500,
  currency: "NOK",
  interestRate: 4.0,
};

export const accounts: Account[] = [account, savingsAccount];

export const transactions: Transaction[] = [
  // --- Brukskonto (acc_001) ---
  {
    id: "txn_001",
    accountId: "acc_001",
    merchant: "Rema 1000",
    category: "Dagligvarer",
    amount: -487,
    date: "2026-04-10",
    time: "15:42",
    icon: "🛒",
    description: "Rema 1000 Majorstuen",
    cardLast4: "4291",
    status: "completed",
    location: "Oslo",
  },
  {
    id: "txn_002",
    accountId: "acc_001",
    merchant: "Spotify",
    category: "Underholdning",
    amount: -109,
    date: "2026-04-10",
    time: "10:00",
    icon: "🎵",
    description: "Spotify Premium",
    cardLast4: "4291",
    status: "completed",
  },
  {
    id: "txn_003",
    accountId: "acc_001",
    merchant: "Lønn – april",
    category: "Inntekt",
    amount: 52500,
    date: "2026-04-09",
    time: "07:00",
    icon: "💼",
    description: "Månedlig lønn fra Acme AS",
    status: "completed",
  },
  {
    id: "txn_004",
    accountId: "acc_001",
    merchant: "Esso Skøyen",
    category: "Drivstoff",
    amount: -1023,
    date: "2026-04-08",
    time: "18:15",
    icon: "⛽",
    description: "Drivstoff og bilvask",
    cardLast4: "7832",
    status: "completed",
    location: "Oslo",
  },
  {
    id: "txn_005",
    accountId: "acc_001",
    merchant: "T-bane og buss",
    category: "Transport",
    amount: -390,
    date: "2026-04-08",
    time: "08:02",
    icon: "🚇",
    description: "Ruter månedskort",
    cardLast4: "4291",
    status: "completed",
    location: "Oslo",
  },
  {
    id: "txn_006",
    accountId: "acc_001",
    merchant: "Netflix",
    category: "Underholdning",
    amount: -179,
    date: "2026-04-07",
    time: "12:00",
    icon: "📺",
    description: "Netflix Standard",
    cardLast4: "4291",
    status: "completed",
  },
  {
    id: "txn_007",
    accountId: "acc_001",
    merchant: "Apotek 1",
    category: "Helse",
    amount: -298,
    date: "2026-04-07",
    time: "14:30",
    icon: "💊",
    description: "Apotek 1 Aker Brygge",
    cardLast4: "7832",
    status: "completed",
    location: "Oslo",
  },
  {
    id: "txn_008",
    accountId: "acc_001",
    merchant: "Tim Wendelboe",
    category: "Kafé & Restaurant",
    amount: -68,
    date: "2026-04-06",
    time: "09:15",
    icon: "☕",
    description: "Kaffe",
    cardLast4: "4291",
    status: "completed",
    location: "Oslo",
  },
  {
    id: "txn_009",
    accountId: "acc_001",
    merchant: "Coop Extra",
    category: "Dagligvarer",
    amount: -643,
    date: "2026-04-05",
    time: "16:55",
    icon: "🛒",
    description: "Coop Extra Grønland",
    cardLast4: "4291",
    status: "completed",
    location: "Oslo",
  },
  {
    id: "txn_010",
    accountId: "acc_001",
    merchant: "H&M",
    category: "Klær",
    amount: -899,
    date: "2026-04-04",
    time: "13:20",
    icon: "👗",
    description: "H&M Karl Johans gate",
    cardLast4: "7832",
    status: "completed",
    location: "Oslo",
  },
  {
    id: "txn_011",
    accountId: "acc_001",
    merchant: "Vinmonopolet",
    category: "Alkohol",
    amount: -389,
    date: "2026-04-04",
    time: "17:45",
    icon: "🍷",
    description: "Vinmonopolet Aker Brygge",
    cardLast4: "4291",
    status: "completed",
    location: "Oslo",
  },
  {
    id: "txn_012",
    accountId: "acc_001",
    merchant: "Overføring til sparing",
    category: "Sparing",
    amount: -5000,
    date: "2026-04-01",
    time: "07:00",
    icon: "🏦",
    description: "Fast overføring til sparekonto",
    status: "completed",
  },
  {
    id: "txn_013",
    accountId: "acc_001",
    merchant: "Pizzabakeren",
    category: "Kafé & Restaurant",
    amount: -249,
    date: "2026-04-03",
    time: "19:30",
    icon: "🍕",
    description: "Fredagspizza",
    cardLast4: "4291",
    status: "completed",
    location: "Oslo",
  },
  {
    id: "txn_014",
    accountId: "acc_001",
    merchant: "SATS",
    category: "Helse",
    amount: -449,
    date: "2026-04-01",
    time: "06:00",
    icon: "🏋️",
    description: "SATS månedskort",
    cardLast4: "4291",
    status: "completed",
  },
  {
    id: "txn_015",
    accountId: "acc_001",
    merchant: "Amazon",
    category: "Netthandel",
    amount: -1249,
    date: "2026-04-02",
    time: "22:10",
    icon: "📦",
    description: "Netthandel",
    cardLast4: "7832",
    status: "pending",
  },

  // --- Sparekonto (acc_002) ---
  {
    id: "sav_001",
    accountId: "acc_002",
    merchant: "Rentegodtgjørelse",
    category: "Renter",
    amount: 355,
    date: "2026-04-01",
    time: "07:00",
    icon: "📈",
    description: "Månedlig renteopptjening – 4,00% p.a.",
    status: "completed",
  },
  {
    id: "sav_002",
    accountId: "acc_002",
    merchant: "Overføring fra brukskonto",
    category: "Innskudd",
    amount: 5000,
    date: "2026-04-01",
    time: "07:01",
    icon: "💸",
    description: "Fast månedlig sparing",
    status: "completed",
  },
  {
    id: "sav_003",
    accountId: "acc_002",
    merchant: "Rentegodtgjørelse",
    category: "Renter",
    amount: 338,
    date: "2026-03-01",
    time: "07:00",
    icon: "📈",
    description: "Månedlig renteopptjening – 4,00% p.a.",
    status: "completed",
  },
  {
    id: "sav_004",
    accountId: "acc_002",
    merchant: "Overføring fra brukskonto",
    category: "Innskudd",
    amount: 5000,
    date: "2026-03-01",
    time: "07:01",
    icon: "💸",
    description: "Fast månedlig sparing",
    status: "completed",
  },
  {
    id: "sav_005",
    accountId: "acc_002",
    merchant: "Uttak til brukskonto",
    category: "Uttak",
    amount: -15000,
    date: "2026-03-14",
    time: "11:30",
    icon: "🏧",
    description: "Uttak til brukskonto – feriepenger",
    status: "completed",
  },
  {
    id: "sav_006",
    accountId: "acc_002",
    merchant: "Rentegodtgjørelse",
    category: "Renter",
    amount: 372,
    date: "2026-02-01",
    time: "07:00",
    icon: "📈",
    description: "Månedlig renteopptjening – 4,00% p.a.",
    status: "completed",
  },
  {
    id: "sav_007",
    accountId: "acc_002",
    merchant: "Overføring fra brukskonto",
    category: "Innskudd",
    amount: 5000,
    date: "2026-02-01",
    time: "07:01",
    icon: "💸",
    description: "Fast månedlig sparing",
    status: "completed",
  },
  {
    id: "sav_008",
    accountId: "acc_002",
    merchant: "Overføring fra brukskonto",
    category: "Innskudd",
    amount: 10000,
    date: "2026-01-15",
    time: "14:22",
    icon: "💸",
    description: "Ekstra sparing – bonusutbetaling",
    status: "completed",
  },
];

export const virtualCards: VirtualCard[] = [
  {
    id: "card_001",
    name: "Dagligkort",
    last4: "4291",
    expiry: "12/28",
    network: "visa",
    theme: "midnight",
    frozen: false,
    spendLimit: 10000,
    spentThisMonth: 3841,
  },
  {
    id: "card_002",
    name: "Netthandel",
    last4: "7832",
    expiry: "08/27",
    network: "visa",
    theme: "aurora",
    frozen: false,
    spentThisMonth: 2248,
  },
  {
    id: "card_003",
    name: "Reisekort",
    last4: "2019",
    expiry: "03/29",
    network: "visa",
    theme: "ocean",
    frozen: true,
    spentThisMonth: 0,
  },
];

export function formatAmount(amount: number): string {
  const abs = Math.abs(amount);
  return new Intl.NumberFormat("nb-NO", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(abs);
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) return "I dag";
  if (date.toDateString() === yesterday.toDateString()) return "I går";

  return date.toLocaleDateString("nb-NO", {
    day: "numeric",
    month: "long",
  });
}

export function groupByDate(
  txns: Transaction[]
): Record<string, Transaction[]> {
  return txns.reduce(
    (acc, txn) => {
      const key = txn.date;
      if (!acc[key]) acc[key] = [];
      acc[key].push(txn);
      return acc;
    },
    {} as Record<string, Transaction[]>
  );
}
