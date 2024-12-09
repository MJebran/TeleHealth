import { useState, useEffect } from "react";
import {
  getCases,
  getCaseById,
  createCase,
  updateCase,
  deleteCase,
  updateCaseStatus,
  doctorAcceptCase,
  completeCase,
} from "../services/caseService";
import { Case, NewCasePayload } from "../types/caseTypes";

// Fetch all cases
export const useFetchCases = () => {
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const data = await getCases();
        setCases(data);
      } catch (err) {
        setError("Failed to fetch cases.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCases();
  }, []);

  return { cases, loading, error, setCases };
};

// Fetch a case by ID
export const useFetchCaseById = (caseId: number | null) => {
  const [caseData, setCaseData] = useState<Case | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCase = async () => {
      if (caseId === null) return;
      try {
        const data = await getCaseById(caseId);
        setCaseData(data);
      } catch (err) {
        setError("Failed to fetch case details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCase();
  }, [caseId]);

  return { caseData, loading, error };
};

// Create a new case
export const useCreateCase = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createNewCase = async (newCasePayload: NewCasePayload): Promise<Case | null> => {
    setLoading(true);
    setError(null);
    try {
      const newCase = await createCase(newCasePayload);
      return newCase;
    } catch (err) {
      setError("Failed to create case.");
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { createNewCase, loading, error };
};

// Update an existing case
export const useUpdateCase = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateExistingCase = async (id: number, updatedCase: NewCasePayload): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await updateCase(id, updatedCase);
      return true;
    } catch (err) {
      setError("Failed to update case.");
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { updateExistingCase, loading, error };
};

// Delete a case
export const useDeleteCase = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteExistingCase = async (id: number): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await deleteCase(id);
      return true;
    } catch (err) {
      setError("Failed to delete case.");
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { deleteExistingCase, loading, error };
};

// Update a case's status
export const useUpdateCaseStatus = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateStatus = async (id: number, statusId: number): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await updateCaseStatus(id, statusId);
      return true;
    } catch (err) {
      setError("Failed to update case status.");
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { updateStatus, loading, error };
};

// Accept a case as a doctor
export const useDoctorAcceptCase = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const acceptCase = async (id: number): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await doctorAcceptCase(id); // Ensure the correct function is used
      return true;
    } catch (err) {
      setError("Failed to accept case.");
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { acceptCase, loading, error };
};


// Mark a case as completed
export const useCompleteCase = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const complete = async (id: number): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await completeCase(id);
      return true;
    } catch (err) {
      setError("Failed to complete case.");
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { complete, loading, error };
};
