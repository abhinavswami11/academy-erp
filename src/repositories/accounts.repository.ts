import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    updateDoc,
  } from "firebase/firestore";
  
  import { db } from "../firebase/firestore";
  
  import type {
    CreateTransactionInput,
    Transaction,
  } from "../features/accounts/types/accounts.types";
  
  const transactionsCollection = collection(
    db,
    "transactions",
  );
  
  export async function getTransactions(): Promise<
    Transaction[]
  > {
    const snapshot =
      await getDocs(
        transactionsCollection,
      );
  
    return snapshot.docs
      .map(
        (transactionDoc) =>
          ({
            id: transactionDoc.id,
            ...transactionDoc.data(),
          }) as Transaction,
      )
      .sort((a, b) =>
        b.date.localeCompare(a.date),
      );
  }
  
  export async function getTransactionById(
    transactionId: string,
  ): Promise<Transaction | undefined> {
    const transactionRef = doc(
      db,
      "transactions",
      transactionId,
    );
  
    const snapshot =
      await getDoc(transactionRef);
  
    if (!snapshot.exists()) {
      return undefined;
    }
  
    return {
      id: snapshot.id,
      ...snapshot.data(),
    } as Transaction;
  }
  
  export async function createTransaction(
    input: CreateTransactionInput,
  ): Promise<Transaction> {
    const transactionRef =
      await addDoc(
        transactionsCollection,
        input,
      );
  
    return {
      id: transactionRef.id,
      ...input,
    };
  }
  
  export async function updateTransaction(
    transactionId: string,
    data: Partial<CreateTransactionInput>,
  ): Promise<void> {
    const transactionRef = doc(
      db,
      "transactions",
      transactionId,
    );
  
    await updateDoc(
      transactionRef,
      data,
    );
  }
  
  export async function deleteTransaction(
    transactionId: string,
  ): Promise<void> {
    const transactionRef = doc(
      db,
      "transactions",
      transactionId,
    );
  
    await deleteDoc(transactionRef);
  }