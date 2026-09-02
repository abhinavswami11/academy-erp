import { useEffect, useMemo, useState } from "react";

import Button from "../../../components/ui/Button";
import PageHeader from "../../../components/ui/PageHeader";

import FeeSummaryCards from "../components/FeeSummaryCards";
import FeeFilters from "../components/FeeFilters";
import FeeTable from "../components/FeeTable";
import CollectPaymentForm from "../components/CollectPaymentForm";

import {
  ensureCurrentMonthFees,
  getFees,
  getPayments,
  recordPayment,
} from "../services/fee.service";

import { getStudents } from "../../students/services/student.service";

import type {
  FeePayment,
  FeeRecord,
  FeeStatus,
} from "../types/fee.types";

export default function FeesPage() {
  const [fees, setFees] = useState<FeeRecord[]>([]);
  const [payments, setPayments] = useState<FeePayment[]>([]);

  const [search, setSearch] = useState("");
  const [status, setStatus] =
    useState<FeeStatus | "all">("all");

  const [isPaymentFormOpen, setIsPaymentFormOpen] =
    useState(false);

  const [paymentFee, setPaymentFee] =
    useState<FeeRecord | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    async function loadFees() {
      try {
        setIsLoading(true);
        setError(null);

        const studentData =
          await getStudents();

        const feeData =
          await ensureCurrentMonthFees(
            studentData,
          );

        const paymentData =
          await getPayments();

        setFees(feeData);
        setPayments(paymentData);
      } catch (err) {
        console.error(
          "Failed to load fees:",
          err,
        );

        setError(
          "Failed to load fees.",
        );
      } finally {
        setIsLoading(false);
      }
    }

    void loadFees();
  }, []);

  const filteredFees = useMemo(() => {
    return fees.filter((fee) => {
      const matchesSearch =
        fee.studentName
          .toLowerCase()
          .includes(
            search.toLowerCase(),
          );

      const matchesStatus =
        status === "all" ||
        fee.status === status;

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [fees, search, status]);

  const unpaidFees = useMemo(() => {
    return fees.filter(
      (fee) =>
        fee.amountPaid <
        fee.amountDue,
    );
  }, [fees]);

  async function handleRecordPayment(
    payment: FeePayment,
  ) {
    if (!paymentFee) {
      return;
    }

    try {
      await recordPayment(
        paymentFee,
        payment.amount,
        payment.paymentDate,
        payment.paymentMethod,
        payment.notes,
      );

      const [
        updatedFees,
        updatedPayments,
      ] = await Promise.all([
        getFees(),
        getPayments(),
      ]);

      setFees(updatedFees);
      setPayments(updatedPayments);

      setPaymentFee(null);
      setIsPaymentFormOpen(false);

      window.alert(
        "Payment recorded successfully.",
      );
    } catch (err) {
      console.error(
        "Failed to record payment:",
        err,
      );

      window.alert(
        "Failed to record payment.",
      );
    }
  }

  function handleViewHistory(
    fee: FeeRecord,
  ) {
    const feePayments =
      payments.filter(
        (payment) =>
          payment.feeId === fee.id,
      );

    if (feePayments.length === 0) {
      window.alert(
        "No payments recorded for this fee.",
      );

      return;
    }

    const history = feePayments
      .map(
        (payment) =>
          `${payment.paymentDate} — ₹${payment.amount.toLocaleString(
            "en-IN",
          )} — ${payment.paymentMethod}`,
      )
      .join("\n");

    window.alert(
      `${fee.studentName}\n\nPayment History:\n${history}`,
    );
  }

  function openPaymentForm() {
    if (unpaidFees.length === 0) {
      window.alert(
        "There are no outstanding fees.",
      );

      return;
    }

    setPaymentFee(null);
    setIsPaymentFormOpen(true);
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Fees"
          description="Track student fees, payments, and outstanding balances."
        />

        <div className="rounded-lg border border-slate-200 bg-white p-6 text-sm text-slate-500">
          Loading fees...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Fees"
          description="Track student fees, payments, and outstanding balances."
        />

        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <PageHeader
          title="Fees"
          description="Track student fees, payments, and outstanding balances."
        />

        <Button
          onClick={openPaymentForm}
          className="shrink-0 self-start"
        >
          Collect Payment
        </Button>
      </div>

      <FeeSummaryCards fees={fees} />

      <FeeFilters
        search={search}
        status={status}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
      />

      <FeeTable
        fees={filteredFees}
        onViewHistory={handleViewHistory}
      />

      {isPaymentFormOpen && (
        <CollectPaymentForm
          fees={unpaidFees}
          selectedFee={paymentFee}
          onFeeChange={setPaymentFee}
          onSubmit={handleRecordPayment}
          onCancel={() => {
            setIsPaymentFormOpen(false);
            setPaymentFee(null);
          }}
        />
      )}
    </div>
  );
}