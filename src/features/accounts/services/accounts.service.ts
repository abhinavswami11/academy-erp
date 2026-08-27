import { mockTransactions } from "../data/mockTransactions";
import type {
  CreateTransactionInput,
  Transaction,
} from "../types/accounts.types";

let transactions: Transaction[] = [...mockTransactions];

export function getTransactions(): Transaction[] {
  return [...transactions];
}

export function createTransaction(
  input: CreateTransactionInput,
): Transaction {
  const transaction: Transaction = {
    ...input,
    id: `TXN-${Date.now()}`,
  };

  transactions = [transaction, ...transactions];

  return transaction;
}

export function deleteTransaction(id: string): void {
  transactions = transactions.filter(
    (transaction) => transaction.id !== id,
  );
}

export function calculateTotals(transactionsList: Transaction[]) {
  const income = transactionsList
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const expenses = transactionsList
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + transaction.amount, 0);

  return {
    income,
    expenses,
    balance: income - expenses,
  };
}