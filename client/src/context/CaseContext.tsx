import React, { createContext, useContext, useState, useEffect } from "react";
import {
  getCases,
  getCaseById,
  createCase,
  updateCase,
  deleteCase,
  updateCaseStatus,
  doctorAcceptCase,
  completeCase as completeCaseService,
} from "../services/caseService";
import { Case, NewCasePayload } from "../types/caseTypes";

interface CaseContextProps {
  cases: Case[];
  addCase: (newCase: NewCasePayload) => Promise<void>;
  updateCaseById: (id: number, updatedCase: NewCasePayload) => Promise<void>;
  deleteCaseById: (id: number) => Promise<void>;
  getCaseDetails: (id: number) => Promise<Case | null>; // Expose getCaseById
  changeCaseStatus: (id: number, statusId: number) => Promise<void>;
  acceptCase: (id: number) => Promise<void>;
  completeCase: (id: number) => Promise<void>; // Expose completeCase
  refreshCases: () => Promise<void>;
}

const CaseContext = createContext<CaseContextProps | undefined>(undefined);

export const CaseProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cases, setCases] = useState<Case[]>([]);

  const refreshCases = async () => {
    try {
      const fetchedCases = await getCases();
      setCases(fetchedCases);
    } catch (error) {
      console.error("Failed to fetch cases:", error);
    }
  };

  const addCase = async (newCase: NewCasePayload) => {
    try {
      const createdCase = await createCase(newCase);
      setCases((prev) => [...prev, createdCase]);
    } catch (error) {
      console.error("Failed to create case:", error);
    }
  };

  const updateCaseById = async (id: number, updatedCase: NewCasePayload) => {
    try {
      const updated = await updateCase(id, updatedCase);
      setCases((prev) => prev.map((c) => (c.id === id ? updated : c)));
    } catch (error) {
      console.error("Failed to update case:", error);
    }
  };

  const deleteCaseById = async (id: number) => {
    try {
      await deleteCase(id);
      setCases((prev) => prev.filter((c) => c.id !== id));
    } catch (error) {
      console.error("Failed to delete case:", error);
    }
  };

  const getCaseDetails = async (id: number): Promise<Case | null> => {
    try {
      const caseDetails = await getCaseById(id);
      return caseDetails;
    } catch (error) {
      console.error("Failed to fetch case details:", error);
      return null;
    }
  };

  const changeCaseStatus = async (id: number, statusId: number) => {
    try {
      await updateCaseStatus(id, statusId);
      refreshCases();
    } catch (error) {
      console.error("Failed to update case status:", error);
    }
  };

  const acceptCase = async (id: number) => {
    try {
      await doctorAcceptCase(id);
      refreshCases();
    } catch (error) {
      console.error("Failed to accept case:", error);
    }
  };

  const completeCase = async (id: number) => {
    try {
      await completeCaseService(id);
      refreshCases();
    } catch (error) {
      console.error("Failed to complete case:", error);
    }
  };

  useEffect(() => {
    refreshCases();
  }, []);

  return (
    <CaseContext.Provider
      value={{
        cases,
        addCase,
        updateCaseById,
        deleteCaseById,
        getCaseDetails,
        changeCaseStatus,
        acceptCase,
        completeCase,
        refreshCases,
      }}
    >
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
