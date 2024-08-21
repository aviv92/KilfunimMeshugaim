import { Player } from "../../../stores/usePlayerStore";
import { PlayerBalance, Payment } from "./types";

export const calculatePayments = (
  players: Player[],
  finalResults: number[]
): Payment[] => {
  const balances: PlayerBalance[] = players.map((player, index) => ({
    name: player.name,
    balance: finalResults[index] - player.owed,
  }));

  const debtors = balances
    .filter((balance) => balance.balance < 0)
    .sort((a, b) => a.balance - b.balance);
  const creditors = balances
    .filter((balance) => balance.balance > 0)
    .sort((a, b) => b.balance - a.balance);

  const payments: Payment[] = [];

  let debtorIndex = 0;
  let creditorIndex = 0;

  while (debtorIndex < debtors.length && creditorIndex < creditors.length) {
    const debtor = debtors[debtorIndex];
    const creditor = creditors[creditorIndex];
    const payment = Math.min(-debtor.balance, creditor.balance);

    payments.push({
      from: debtor.name,
      to: creditor.name,
      amount: payment,
    });

    debtor.balance += payment;
    creditor.balance -= payment;

    if (debtor.balance === 0) debtorIndex++;
    if (creditor.balance === 0) creditorIndex++;
  }

  return payments;
};
