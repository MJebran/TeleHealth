import { useState, useEffect } from 'react';
import { Agreement } from '../types/agreement';
import { getAgreements, addAgreement, editAgreement, deleteAgreement } from '../services/agreementService';

export const useAgreements = () => {
  const [agreements, setAgreements] = useState<Agreement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAgreements = async () => {
    try {
      setLoading(true);
      const data = await getAgreements();
      setAgreements(data);
    } catch (err) {
      console.error(err); // Optional: Log error to the console
      setError('Failed to fetch agreements.');
    } finally {
      setLoading(false);
    }
  };

  const addNewAgreement = async (agreement: Omit<Agreement, 'id'>) => {
    try {
      const newAgreement = await addAgreement(agreement);
      setAgreements([...agreements, newAgreement]);
    } catch (err) {
      console.error(err); // Optional: Log error to the console
      setError('Failed to add agreement.');
    }
  };

  const updateAgreement = async (id: number, updatedFields: Partial<Agreement>) => {
    try {
      const updatedAgreement = await editAgreement(id, updatedFields);
      setAgreements(
        agreements.map((agreement) =>
          agreement.id === id ? updatedAgreement : agreement
        )
      );
    } catch (err) {
      console.error(err); // Optional: Log error to the console
      setError('Failed to update agreement.');
    }
  };

  const removeAgreement = async (id: number) => {
    try {
      await deleteAgreement(id);
      setAgreements(agreements.filter((agreement) => agreement.id !== id));
    } catch (err) {
      console.error(err); // Optional: Log error to the console
      setError('Failed to delete agreement.');
    }
  };

  useEffect(() => {
    fetchAgreements();
  }, []);

  return {
    agreements,
    loading,
    error,
    addNewAgreement,
    updateAgreement,
    removeAgreement,
  };
};
