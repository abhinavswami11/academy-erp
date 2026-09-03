import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { Plus } from "lucide-react";

import Button from "../../components/ui/Button";
import PageHeader from "../../components/ui/PageHeader";

import AccountSummaryCards from "./components/AccountSummaryCards";
import TransactionForm from "./components/TransactionForm";

import {
  createTransaction,
  deleteTransaction,
  getTransactions,
} from "./services/accounts.service";

import type {
  CreateTransactionInput,
  Transaction,
  TransactionType,
} from "./types/accounts.types";

function formatCurrency(
  amount: number,
): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export default function AccountsPage() {
  const [transactions, setTransactions] =
    useState<Transaction[]>([]);

  const [type, setType] =
    useState<TransactionType | "all">(
      "all",
    );

  const [search, setSearch] =
    useState("");

  const [showForm, setShowForm] =
    useState(false);

  const [isLoading, setIsLoading] =
    useState(true);

  const [isSaving, setIsSaving] =
    useState(false);

  async function loadTransactions() {
    try {
      setIsLoading(true);

      const data =
        await getTransactions();

      setTransactions(data);
    } catch (error) {
      console.error(
        "Failed to load transactions:",
        error,
      );

      window.alert(
        "Failed to load transactions.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void loadTransactions();
  }, []);

  const filteredTransactions =
    useMemo(() => {
      const query =
        search.trim().toLowerCase();

      return transactions.filter(
        (transaction) => {
          const matchesType =
            type === "all" ||
            transaction.type === type;

          const matchesSearch =
            !query ||
            transaction.category
              .toLowerCase()
              .includes(query) ||
            transaction.description
              .toLowerCase()
              .includes(query);

          return (
            matchesType &&
            matchesSearch
          );
        },
      );
    }, [
      transactions,
      type,
      search,
    ]);

  async function handleCreateTransaction(
    input: CreateTransactionInput,
  ) {
    try {
      setIsSaving(true);

      const transaction =
        await createTransaction(input);

      setTransactions(
        (current) => [
          transaction,
          ...current,
        ],
      );

      setShowForm(false);

      window.alert(
        "Transaction created successfully.",
      );
    } catch (error) {
      console.error(
        "Failed to create transaction:",
        error,
      );

      window.alert(
        "Failed to create transaction.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDeleteTransaction(
    id: string,
  ) {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this transaction?",
      );

    if (!confirmed) {
      return;
    }

    try {
      setIsSaving(true);

      await deleteTransaction(id);

      setTransactions(
        (current) =>
          current.filter(
            (transaction) =>
              transaction.id !== id,
          ),
      );

      window.alert(
        "Transaction deleted successfully.",
      );
    } catch (error) {
      console.error(
        "Failed to delete transaction:",
        error,
      );

      window.alert(
        "Failed to delete transaction.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <PageHeader
          title="Accounts"
          description="Track income, expenses, and your academy balance."
        />

        <Button
          onClick={() =>
            setShowForm(true)
          }
          disabled={isSaving}
          className="shrink-0"
        >
          <Plus className="h-4 w-4" />
          Add Transaction
        </Button>
      </div>

      {isLoading ? (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
          <p className="text-sm text-slate-500">
            Loading transactions...
          </p>
        </div>
      ) : (
        <>
          <AccountSummaryCards
            transactions={transactions}
          />

          <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:flex-row">
            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value,
                )
              }
              placeholder="Search transactions..."
              className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-slate-400 sm:max-w-sm"
            />

            <select
              value={type}
              onChange={(event) =>
                setType(
                  event.target.value as
                    | TransactionType
                    | "all",
                )
              }
              className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-slate-400"
            >
              <option value="all">
                All Transactions
              </option>
              <option value="income">
                Income
              </option>
              <option value="expense">
                Expense
              </option>
            </select>
          </div>

          {filteredTransactions.length ===
          0 ? (
            <div className="rounded-xl border border-slate-200 bg-white p-10 text-center">
              <p className="font-medium text-slate-900">
                No transactions found
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Try changing your search
                or filter.
              </p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[850px] text-left text-sm">
                  <thead className="border-b border-slate-200 bg-slate-50">
                    <tr>
                      <th className="px-5 py-3 text-xs font-medium uppercase text-slate-500">
                        Date
                      </th>

                      <th className="px-5 py-3 text-xs font-medium uppercase text-slate-500">
                        Type
                      </th>

                      <th className="px-5 py-3 text-xs font-medium uppercase text-slate-500">
                        Category
                      </th>

                      <th className="px-5 py-3 text-xs font-medium uppercase text-slate-500">
                        Description
                      </th>

                      <th className="px-5 py-3 text-xs font-medium uppercase text-slate-500">
                        Payment Method
                      </th>

                      <th className="px-5 py-3 text-xs font-medium uppercase text-slate-500">
                        Amount
                      </th>

                      <th className="px-5 py-3 text-xs font-medium uppercase text-slate-500">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredTransactions.map(
                      (transaction) => (
                        <tr
                          key={
                            transaction.id
                          }
                          className="border-b border-slate-100 last:border-0"
                        >
                          <td className="px-5 py-4 text-slate-600">
                            {
                              transaction.date
                            }
                          </td>

                          <td className="px-5 py-4">
                            <span
                              className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                                transaction.type ===
                                "income"
                                  ? "bg-emerald-100 text-emerald-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              {transaction.type ===
                              "income"
                                ? "Income"
                                : "Expense"}
                            </span>
                          </td>

                          <td className="px-5 py-4 font-medium text-slate-900">
                            {
                              transaction.category
                            }
                          </td>

                          <td className="px-5 py-4 text-slate-600">
                            {
                              transaction.description
                            }
                          </td>

                          <td className="px-5 py-4 text-slate-600">
                            {
                              transaction.paymentMethod
                            }
                          </td>

                          <td
                            className={`px-5 py-4 font-semibold ${
                              transaction.type ===
                              "income"
                                ? "text-emerald-600"
                                : "text-red-600"
                            }`}
                          >
                            {transaction.type ===
                            "income"
                              ? "+"
                              : "-"}
                            {formatCurrency(
                              transaction.amount,
                            )}
                          </td>

                          <td className="px-5 py-4">
                            <button
                              type="button"
                              onClick={() =>
                                void handleDeleteTransaction(
                                  transaction.id,
                                )
                              }
                              disabled={
                                isSaving
                              }
                              className="text-sm font-medium text-red-600 hover:text-red-700 disabled:opacity-50"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ),
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}

      {showForm && (
        <TransactionForm
          onSubmit={handleCreateTransaction}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}