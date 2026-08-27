import { useMemo, useState } from "react";
import { Plus } from "lucide-react";

import Button from "../../components/ui/Button";
import PageHeader from "../../components/ui/PageHeader";

import AccountSummaryCards from "./components/AccountSummaryCards";
import TransactionFilters from "./components/TransactionFilters";
import TransactionForm from "./components/TransactionForm";
import TransactionTable from "./components/TransactionTable";

import {
  createTransaction,
  deleteTransaction,
  getTransactions,
} from "./services/accounts.service";

import type {
  CreateTransactionInput,
  TransactionCategory,
  TransactionType,
} from "./types/accounts.types";

export default function AccountsPage() {
  const [transactions, setTransactions] = useState(
    () => getTransactions(),
  );

  const [search, setSearch] = useState("");

  const [type, setType] =
    useState<TransactionType | "all">("all");

  const [category, setCategory] =
    useState<TransactionCategory | "all">("all");

  const [showForm, setShowForm] = useState(false);

  const filteredTransactions = useMemo(() => {
    const query = search.trim().toLowerCase();

    return transactions.filter((transaction) => {
      const matchesSearch =
        !query ||
        transaction.description
          .toLowerCase()
          .includes(query) ||
        transaction.category
          .toLowerCase()
          .includes(query);

      const matchesType =
        type === "all" || transaction.type === type;

      const matchesCategory =
        category === "all" ||
        transaction.category === category;

      return (
        matchesSearch &&
        matchesType &&
        matchesCategory
      );
    });
  }, [transactions, search, type, category]);

  function handleCreateTransaction(
    input: CreateTransactionInput,
  ) {
    const transaction = createTransaction(input);

    setTransactions((current) => [
      transaction,
      ...current,
    ]);

    setShowForm(false);
  }

  function handleDeleteTransaction(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this transaction?",
    );

    if (!confirmed) {
      return;
    }

    deleteTransaction(id);

    setTransactions((current) =>
      current.filter(
        (transaction) => transaction.id !== id,
      ),
    );
  }

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <PageHeader
          title="Accounts"
          description="Monitor income, expenses, and financial transactions."
        />

        <Button
          onClick={() => setShowForm(true)}
          className="shrink-0 self-start"
        >
          <Plus className="h-4 w-4" />
          Add Transaction
        </Button>
      </div>

      <div className="space-y-6">
        <AccountSummaryCards
          transactions={transactions}
        />

        <div>
          <h2 className="mb-3 text-base font-semibold text-slate-900">
            Transactions
          </h2>

          <TransactionFilters
            search={search}
            type={type}
            category={category}
            onSearchChange={setSearch}
            onTypeChange={setType}
            onCategoryChange={setCategory}
          />
        </div>

        <TransactionTable
          transactions={filteredTransactions}
          onDelete={handleDeleteTransaction}
        />
      </div>

      {showForm && (
        <TransactionForm
          onSubmit={handleCreateTransaction}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}