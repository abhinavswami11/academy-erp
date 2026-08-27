import { useMemo, useState } from "react";
import FeeSummaryCards from "../components/FeeSummaryCards";
import FeeFilters from "../components/FeeFilters";
import FeeTable from "../components/FeeTable";
import CollectPaymentForm from "../components/CollectPaymentForm";import { mockFees } from "../data/mockFees";
import { mockPayments } from "../data/mockPayments";
import { feeService } from "../services/fee.service";
import type {
  FeePayment,
  FeeRecord,
  FeeStatus,
} from "../types/fee.types";

export default function FeesPage() {
  const [fees, setFees] = useState<FeeRecord[]>(mockFees);
  const [payments, setPayments] =
    useState<FeePayment[]>(mockPayments);

  const [search, setSearch] = useState("");
  const [status, setStatus] =
    useState<FeeStatus | "all">("all");

    const [isPaymentFormOpen, setIsPaymentFormOpen] =
    useState(false);
  
    const [paymentFee, setPaymentFee] =
    useState<FeeRecord | null>(null);

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

  const handleRecordPayment = (payment: FeePayment) => {
    if (!paymentFee) {
      return;
    }
  
    const updatedFee = feeService.recordPayment(
      payment,
      paymentFee
    );
  
    if (!updatedFee) {
      window.alert("Invalid payment amount.");
      return;
    }
  
    setPayments((current) => [...current, payment]);
  
    setFees((current) =>
      current.map((fee) =>
        fee.id === updatedFee.id ? updatedFee : fee
      )
    );
  
    setPaymentFee(null);
    setIsPaymentFormOpen(false);
  };

  const handleViewHistory = (fee: FeeRecord) => {
    const feePayments = payments.filter(
      (payment) => payment.feeId === fee.id
    );

    if (feePayments.length === 0) {
      window.alert("No payments recorded for this fee.");
      return;
    }

    const history = feePayments
      .map(
        (payment) =>
          `${payment.paymentDate} — ₹${payment.amount.toLocaleString(
            "en-IN"
          )} — ${payment.paymentMethod}`
      )
      .join("\n");

    window.alert(
      `${fee.studentName}\n\nPayment History:\n${history}`
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">
          Fees
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Track student fees, payments, and outstanding balances.
        </p>
      </div>

      <FeeSummaryCards fees={fees} />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <FeeFilters
          search={search}
          status={status}
          onSearchChange={setSearch}
          onStatusChange={setStatus}
        />

        <button
          type="button"
          onClick={() => {
            const unpaidFees = fees.filter(
              (fee) => fee.amountPaid < fee.amountDue
            );

            if (unpaidFees.length === 0) {
              window.alert("There are no outstanding fees.");
              return;
            }

            setPaymentFee(unpaidFees[0]);
            setIsPaymentFormOpen(true);
          }}
          className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
        >
          + Collect Payment
        </button>
      </div>

      <FeeTable
        fees={filteredFees}
        onViewHistory={handleViewHistory}
      />

      {isPaymentFormOpen && (
        <CollectPaymentForm
          fees={fees.filter(
            (fee) => fee.amountDue > fee.amountPaid
          )}
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