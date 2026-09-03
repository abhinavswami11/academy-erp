import {
  createTransaction as createTransactionRepository,
  deleteTransaction as deleteTransactionRepository,
  getTransactionById as getTransactionByIdRepository,
  getTransactions as getTransactionsRepository,
  updateTransaction as updateTransactionRepository,
} from "../../../repositories/accounts.repository";

import type {
  CreateTransactionInput,
  Transaction,
} from "../types/accounts.types";

export async function getTransactions(): Promise<
  Transaction[]
> {
  return getTransactionsRepository();
}

export async function getTransactionById(
  transactionId: string,
): Promise<Transaction | undefined> {
  return getTransactionByIdRepository(
    transactionId,
  );
}

export async function createTransaction(
  input: CreateTransactionInput,
): Promise<Transaction> {
  return createTransactionRepository(input);
}

export async function updateTransaction(
  transactionId: string,
  data: Partial<CreateTransactionInput>,
): Promise<void> {
  return updateTransactionRepository(
    transactionId,
    data,
  );
}

export async function deleteTransaction(
  transactionId: string,
): Promise<void> {
  return deleteTransactionRepository(
    transactionId,
  );
}

export function calculateTotals(
  transactions: Transaction[],
) {
  const income = transactions
    .filter(
      (transaction) =>
        transaction.type === "income",
    )
    .reduce(
      (total, transaction) =>
        total + transaction.amount,
      0,
    );

  const expenses = transactions
    .filter(
      (transaction) =>
        transaction.type === "expense",
    )
    .reduce(
      (total, transaction) =>
        total + transaction.amount,
      0,
    );

  return {
    income,
    expenses,
    balance: income - expenses,
  };
}

export function calculateTotalIncome(
  transactions: Transaction[],
): number {
  return calculateTotals(transactions).income;
}

export function calculateTotalExpenses(
  transactions: Transaction[],
): number {
  return calculateTotals(transactions).expenses;
}

export function calculateBalance(
  transactions: Transaction[],
): number {
  return calculateTotals(transactions).balance;
}