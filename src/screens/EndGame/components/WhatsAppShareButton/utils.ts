import { Payment, FoodOrder } from "../../../../stores/usePlayerStore";

export const calculateNetPayments = (
  payments: Payment[],
  foodOrders: FoodOrder[]
): Payment[] => {
  const combinedPayments: Record<string, Record<string, number>> = {};

  // Process game payments
  payments.forEach((payment) => {
    if (!combinedPayments[payment.from]) combinedPayments[payment.from] = {};
    if (!combinedPayments[payment.to]) combinedPayments[payment.to] = {};
    combinedPayments[payment.from][payment.to] =
      (combinedPayments[payment.from][payment.to] || 0) + payment.amount;
  });

  // Process food payments
  foodOrders.forEach((order) => {
    const tipPerPerson = order.tip / (order.participants.length + 1); // participants + payer
    order.participants.forEach((participant) => {
      const paymentAmount = order.foodCosts[participant] + tipPerPerson;
      if (!combinedPayments[participant]) combinedPayments[participant] = {};
      if (!combinedPayments[order.payer]) combinedPayments[order.payer] = {};
      combinedPayments[participant][order.payer] =
        (combinedPayments[participant][order.payer] || 0) + paymentAmount;
    });
  });

  // Calculate net payments
  const netPayments: Payment[] = [];
  Object.keys(combinedPayments).forEach((payer) => {
    Object.keys(combinedPayments[payer]).forEach((payee) => {
      const payerOwes = combinedPayments[payer][payee] || 0;
      const payeeOwes = combinedPayments[payee][payer] || 0;
      const netAmount = payerOwes - payeeOwes;
      if (netAmount > 0) {
        netPayments.push({ from: payer, to: payee, amount: netAmount });
      }
    });
  });

  return netPayments;
};
