import { DebtTransaction } from "./debt";

export const formatDebtsForShare = (debts: DebtTransaction[]): string => {
  if (debts.length === 0) return "Nobody owes anything! 🐟";

  return (
    `💸💸💸💸\n\n` +
    debts.map((d) => `• ${d.from} ===> ${d.to} | ${d.amount} 💸`).join("\n")
  );
};
