import { Player } from "../types/player";

export interface DebtTransaction {
  from: string;
  to: string;
  amount: number;
}

export const calculateDebts = (players: Player[]): DebtTransaction[] => {
  const balances = players.map((p) => ({
    name: p.name,
    balance: p.chips - p.took, // Positive = others owe them; Negative = they owe
  }));

  const debtors = balances
    .filter((b) => b.balance < 0)
    .sort((a, b) => a.balance - b.balance);
  const creditors = balances
    .filter((b) => b.balance > 0)
    .sort((a, b) => b.balance - a.balance);

  const transactions: DebtTransaction[] = [];

  let i = 0; // debtor index
  let j = 0; // creditor index

  while (i < debtors.length && j < creditors.length) {
    const debtor = debtors[i];
    const creditor = creditors[j];

    const amount = Math.min(-debtor.balance, creditor.balance);

    transactions.push({
      from: debtor.name,
      to: creditor.name,
      amount,
    });

    debtor.balance += amount;
    creditor.balance -= amount;

    if (debtor.balance === 0) i++;
    if (creditor.balance === 0) j++;
  }

  return transactions;
};
