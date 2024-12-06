import React, { createContext, useContext, useState, useEffect } from "react";
import { getCases, createCase, updateCase, deleteCase } from "../services/caseService";
import { Case, NewCasePayload } from "../types/caseTypes";

interface CaseContextProps {
  cases: Case[];
  addCase: (newCase: NewCasePayload) => Promise<void>;
  updateCaseById: (id: number, updatedCase: NewCasePayload) => Promise<void>;
  removeCase: (id: number) => Promise<void>;
  refreshCases: () => Promise<void>;
}

const CaseContext = createContext<CaseContextProps | undefined>(undefined);

export const CaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cases, setCases] = useState<Case[]>([]);

  const refreshCases = async () => {
  try {
    const fetchedCases = await getCases(); // Fetch cases from the API
    console.log("Fetched cases:", fetchedCases); // Log the fetched data
    setCases(fetchedCases); // Update the state with fetched cases
  } catch (error) {
    console.error("Failed to fetch cases:", error);
  }
};

  const addCase = async (newCase: NewCasePayload) => {
    try {
      const createdCase = await createCase(newCase);
      setCases((prev) => [...prev, createdCase]); // Add the new case to the list
    } catch (error) {
      console.error("Failed to add case:", error);
    }
  };

  const updateCaseById = async (id: number, updatedCase: NewCasePayload) => {
    try {
      const updated = await updateCase(id, updatedCase);
      setCases((prev) => prev.map((c) => (c.id === id ? updated : c))); // Update the specific case
    } catch (error) {
      console.error("Failed to update case:", error);
    }
  };

  const removeCase = async (id: number) => {
    try {
      await deleteCase(id);
      setCases((prev) => prev.filter((c) => c.id !== id)); // Remove the deleted case
    } catch (error) {
      console.error("Failed to delete case:", error);
    }
  };

  useEffect(() => {
    refreshCases(); // Fetch cases when the provider initializes
  }, []);

  return (
    <CaseContext.Provider value={{ cases, addCase, updateCaseById, removeCase, refreshCases }}>
      {children}
    </CaseContext.Provider>
  );
};

export const useCaseContext = () => {
  const context = useContext(CaseContext);
  if (!context) {
    throw new Error("useCaseContext must be used within a CaseProvider");
  }
  return context;
};
