import React, { createContext, useState, useContext } from "react";
import { ReceiptData } from "@/constants/types";

type ReceiptContextType = {
  receiptData: ReceiptData;
  setReceiptData: React.Dispatch<React.SetStateAction<ReceiptData>>;
};

// Initialize context with undefined to avoid type conflicts
const ReceiptContext = createContext<ReceiptContextType | undefined>(undefined);

export function ReceiptProvider({ children }: { children: React.ReactNode }) {
  // Initialize receiptData as null
  const [receiptData, setReceiptData] = useState<ReceiptData>(null);

  return (
    <ReceiptContext.Provider value={{ receiptData, setReceiptData }}>
      {children}
    </ReceiptContext.Provider>
  );
}

// Custom hook to access the context
export function useReceipt() {
  const context = useContext(ReceiptContext);
  if (context === undefined) {
    throw new Error("useReceipt must be used within a ReceiptProvider");
  }
  return context;
}
