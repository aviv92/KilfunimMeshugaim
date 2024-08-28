import { FoodOrder, Payment } from "../../../../../stores/usePlayerStore";

type AllPayments = {
  netPayments: Payment[];
  gamePayments: Payment[];
  foodPayments: Payment[];
};

export const getAllPayments = (
  payments: Payment[],
  foodOrders: FoodOrder[]
): AllPayments => {
  const gamePayments = [...payments];

  const foodPayments: Payment[] = foodOrders.flatMap((order) => {
    const tipPerPerson = order.tip / (order.participants.length + 1); // participants + payer
    return order.participants.map((participant) => ({
      from: participant,
      to: order.payer,
      amount: order.foodCosts[participant] + tipPerPerson,
    }));
  });

  const combinedPayments: Record<string, Record<string, number>> = {};

  // Process game payments
  gamePayments.forEach((payment) => {
    if (!combinedPayments[payment.from]) combinedPayments[payment.from] = {};
    if (!combinedPayments[payment.to]) combinedPayments[payment.to] = {};
    combinedPayments[payment.from][payment.to] =
      (combinedPayments[payment.from][payment.to] || 0) + payment.amount;
  });

  // Process food payments
  foodPayments.forEach((payment) => {
    if (!combinedPayments[payment.from]) combinedPayments[payment.from] = {};
    if (!combinedPayments[payment.to]) combinedPayments[payment.to] = {};
    combinedPayments[payment.from][payment.to] =
      (combinedPayments[payment.from][payment.to] || 0) + payment.amount;
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

  return { netPayments, gamePayments, foodPayments };
};
