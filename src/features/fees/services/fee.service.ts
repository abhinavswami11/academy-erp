import type {
    FeePayment,
    FeeRecord,
  } from "../types/fee.types";
  
  export const feeService = {
    recordPayment(
      payment: FeePayment,
      fee: FeeRecord
    ): FeeRecord | null {
      if (payment.amount <= 0) {
        return null;
      }
  
      const newAmountPaid = fee.amountPaid + payment.amount;
  
      if (newAmountPaid > fee.amountDue) {
        return null;
      }
  
      return {
        ...fee,
        amountPaid: newAmountPaid,
        status: this.calculateStatus(
          fee.amountDue,
          newAmountPaid
        ),
      };
    },
  
    calculateStatus(
      amountDue: number,
      amountPaid: number
    ): FeeRecord["status"] {
      if (amountPaid >= amountDue) {
        return "paid";
      }
  
      if (amountPaid > 0) {
        return "partial";
      }
  
      return "pending";
    },
  };