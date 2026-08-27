export type TransactionType = "income" | "expense";

export type PaymentMethod =
  | "Cash"
  | "UPI"
  | "Bank Transfer"
  | "Other";

export type TransactionCategory =
  | "Student Fees"
  | "Turf"
  | "Salary"
  | "Hostel"
  | "Equipment"
  | "Maintenance"
  | "Food"
  | "Utilities"
  | "Other";

export interface Transaction {
  id: string;
  type: TransactionType;
  category: TransactionCategory;
  description: string;
  amount: number;
  date: string;
  paymentMethod: PaymentMethod;
  notes: string;
}

export interface CreateTransactionInput {
  type: TransactionType;
  category: TransactionCategory;
  description: string;
  amount: number;
  date: string;
  paymentMethod: PaymentMethod;
  notes: string;
}