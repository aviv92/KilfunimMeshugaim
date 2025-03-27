import { DebtTransaction } from "./debt";

export const formatDebtsForShare = (debts: DebtTransaction[]): string => {
  if (debts.length === 0) return "Nobody owes anything! 🐟";

  return (
    `💸 Kilfunim Meshugaim Results:\n\n` +
    debts.map((d) => `• ${d.from} pays ${d.to} ${d.amount} chips`).join("\n")
  );
};
