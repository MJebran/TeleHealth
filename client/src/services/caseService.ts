import axiosInstance from "./axiosInstance";
import { Case, NewCasePayload } from "../types/caseTypes";

const API_URL = "/Case";

export const getCases = async (): Promise<Case[]> => {
  const response = await axiosInstance.get<Case[]>(API_URL);
  return response.data;
};

export const getCaseById = async (id: number): Promise<Case> => {
  const response = await axiosInstance.get<Case>(`${API_URL}/${id}`);
  return response.data;
};

export const createCase = async (newCase: NewCasePayload): Promise<Case> => {
  const payload = { ...newCase, statusId: 1 }; // Default status
  const response = await axiosInstance.post<Case>(API_URL, payload);
  return response.data;
};

export const updateCase = async (
  id: number,
  updatedCase: NewCasePayload
): Promise<Case> => {
  const response = await axiosInstance.put<Case>(
    `${API_URL}/${id}`,
    updatedCase
  );
  return response.data;
};

export const deleteCase = async (id: number): Promise<void> => {
  await axiosInstance.delete(`${API_URL}/${id}`);
};

export const updateCaseStatus = async (
  id: number,
  statusId: number
): Promise<void> => {
  const response = await axiosInstance.put(
    `${API_URL}/UpdateStatus/${id}`,
    statusId
  );
  return response.data;
};

export const doctorAcceptCase = async (id: number): Promise<void> => {
  const response = await axiosInstance.put(`${API_URL}/DoctorAccept/${id}`);
  return response.data;
};

export const completeCase = async (id: number): Promise<void> => {
  const response = await axiosInstance.put(`${API_URL}/Complete/${id}`);
  return response.data;
};
