import React, { createContext, useContext, useState, useEffect } from "react";
import {
  getCases,
  createCase,
  updateCase,
  deleteCase,
  updateCaseStatus,
  doctorAcceptCase,
  completeCase,
} from "../services/caseService";
import { Case, NewCasePayload } from "../types/caseTypes";

interface CaseContextProps {
  cases: Case[];
  addCase: (newCase: NewCasePayload) => Promise<void>;
  updateCaseById: (id: number, updatedCase: NewCasePayload) => Promise<void>;
  deleteCaseById: (id: number) => Promise<void>;
  changeCaseStatus: (id: number, statusId: number) => Promise<void>;
  acceptCaseByDoctor: (id: number) => Promise<void>;
  completeCaseById: (id: number) => Promise<void>;
}

const CaseContext = createContext<CaseContextProps | undefined>(undefined);

export const CaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cases, setCases] = useState<Case[]>([]);

  const fetchCases = async () => {
    const fetchedCases = await getCases();
    setCases(fetchedCases);
  };

  const addCase = async (newCase: NewCasePayload) => {
    const createdCase = await createCase(newCase);
    setCases((prev) => [...prev, createdCase]);
  };

  const updateCaseById = async (id: number, updatedCase: NewCasePayload) => {
    const updated = await updateCase(id, updatedCase);
    setCases((prev) => prev.map((c) => (c.id === id ? updated : c)));
  };

  const deleteCaseById = async (id: number) => {
    await deleteCase(id);
    setCases((prev) => prev.filter((c) => c.id !== id));
  };

  const changeCaseStatus = async (id: number, statusId: number) => {
    await updateCaseStatus(id, statusId);
    await fetchCases();
  };

  const acceptCaseByDoctor = async (id: number) => {
    await doctorAcceptCase(id);
    await fetchCases();
  };

  const completeCaseById = async (id: number) => {
    await completeCase(id);
    await fetchCases();
  };

  useEffect(() => {
    fetchCases();
  }, []);

  return (
    <CaseContext.Provider
      value={{
        cases,
        addCase,
        updateCaseById,
        deleteCaseById,
        changeCaseStatus,
        acceptCaseByDoctor,
        completeCaseById,
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
