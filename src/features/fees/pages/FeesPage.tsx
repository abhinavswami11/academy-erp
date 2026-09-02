import { useMemo, useState } from "react";
import Button from "../../../components/ui/Button";
import PageHeader from "../../../components/ui/PageHeader";
import FeeSummaryCards from "../components/FeeSummaryCards";
import FeeFilters from "../components/FeeFilters";
import FeeTable from "../components/FeeTable";
import CollectPaymentForm from "../components/CollectPaymentForm";
import {
  getFees,
  getPayments,
  recordPayment,
} from "../services/fee.service";
import type {
  FeePayment,
  FeeRecord,
  FeeStatus,
} from "../types/fee.types";

export default function FeesPage() {
  const [fees, setFees] = useState<FeeRecord[]>(() => getFees());
  const [payments, setPayments] = useState<FeePayment[]>(() =>
    getPayments(),
  );

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<FeeStatus | "all">("all");

  const [isPaymentFormOpen, setIsPaymentFormOpen] = useState(false);
  const [paymentFee, setPaymentFee] = useState<FeeRecord | null>(null);

  const filteredFees = useMemo(() => {
    return fees.filter((fee) => {
      const matchesSearch = fee.studentName
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus =
        status === "all" || fee.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [fees, search, status]);

  const unpaidFees = useMemo(
    () => fees.filter((fee) => fee.amountPaid < fee.amountDue),
    [fees],
  );

  function handleRecordPayment(payment: FeePayment) {
    if (!paymentFee) {
      return;
    }

    const updatedFee = recordPayment(payment);

    if (!updatedFee) {
      window.alert("Invalid payment amount.");
      return;
    }

    setPayments(getPayments());
    setFees(getFees());
    setPaymentFee(null);
    setIsPaymentFormOpen(false);
  }

  function handleViewHistory(fee: FeeRecord) {
    const feePayments = payments.filter(
      (payment) => payment.feeId === fee.id,
    );

    if (feePayments.length === 0) {
      window.alert("No payments recorded for this fee.");
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
      window.alert("There are no outstanding fees.");
      return;
    }

    setPaymentFee(null);
    setIsPaymentFormOpen(true);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <PageHeader
          title="Fees"
          description="Track student fees, payments, and outstanding balances."
        />

        <Button onClick={openPaymentForm} className="shrink-0 self-start">
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

      <FeeTable fees={filteredFees} onViewHistory={handleViewHistory} />

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
